(() => {

const directions = require("prismatic/lib/dirs");

const arcMultipliers = {
	// Conductors increase arcs
	lead: () => 2,
	copper: () => 2,
	titanium: () => 3,
	silicon: () => 3,
	// Plastanium reduces arcs
	plastanium: () => Mathf.round(Mathf.random(0, 1))
};

const adjacent = (tile, valid) => {
	var adj = 0;
	var near, dir;
	for (var i in directions) {
		dir = directions[i];
		near = Vars.world.tile(tile.x + dir.x, tile.y + dir.y);
		if (!near) continue;
		if (near.block() instanceof BlockPart) {
			near = near.link();
		}
		if (valid(near.block())) adj++;
	}
	return adj;
};

var mod, arc;
const rates = {
	base: {
		// entity uses it once
		apply: () => 0,
		bonuses: {
			// 45 power per second
			gen: 0.75,
			// 3% chance to arc for an item
			arc: 0.03,
			// 15% chance to consume item
			burnup: 0.15
		}
	},
	// bonuses applied for adjacent Arc Routers
	chain: {
		apply: tile => adjacent(tile, block => block.id == arc.id),
		bonuses: {
			// Extra 30/s per tile adjacent for a given router
			gen: 0.50,
			arc: 0.01
		},
		modifiers: {
			burnup: 1.2
		}
	},

// decrease arcing
	plast: {
		apply: tile => adjacent(tile, block => block.insulated),
		bonuses: {
			arc: -0.02
		}
	},

	setStats() {
		this.super$setStats();

		// base
		this.stats.add(BlockStat.basePowerGeneration, rates.base.bonuses.gen * 60, StatUnit.powerSecond);
		this.stats.add(BlockStat.powerDamage, Core.bundle.get("stat.arc-chance"), rates.base.bonuses.arc * 100);
		this.stats.add(BlockStat.input, Core.bundle.get("stat.fuel-burnup"), rates.base.bonuses.burnup * 100);
	},

	handleItem(item, tile, source) {
		// Only accept core-storable items
		if (item.type == ItemType.material) {
			if (!this.consume(tile, item)) {
				this.super$handleItem(item, tile, source);
			}
		}
	},

	getPowerProduction: tile => tile.entity.rates.gen * tile.entity.progress,

	update(tile) {
		this.super$update(tile);
		const ent = tile.entity;
		ent.progress = Math.max(ent.progress - 0.005, 0);
	},

	draw(tile) {
		Draw.color(this.minColor, this.maxColor, tile.entity.progress);
		this.super$draw(tile);
		Draw.color();
	},

	consume(tile, item) {
		const ent = tile.entity;
		const rates = ent.rates;
		var consumed = false;

		if (Mathf.chance(rates.arc)) {
			this.arc(tile, item);
		}
		if (Mathf.chance(rates.burnup)) {
			if (Vars.ui) {
				Effects.effect(Fx.lancerLaserCharge, item.color, tile.drawx(), tile.drawy(), Mathf.random(0, 360));
			}
			ent.items.take();
			consumed = true;
		}
		ent.progress = Math.min(ent.progress + 0.2, 1);
		return consumed;
	},

	arc(tile, item) {
		const rates = tile.entity.rates;
		var mul = arcMultipliers[item.name];
		if (mul === undefined) {
			mul = 1;
		} else {
			mul = mul();
		}
		for (var i = 0; i < mul; i++) {
			Lightning.create(Team.derelict, item.color, 7.5, tile.drawx(), tile.drawy(), Mathf.random(0, 360), Mathf.random(5, 20 * mul));
		}
	},

	calculateRates(tile) {
		const ent = tile.entity;
		Object.assign(ent.rates, rates.base.bonuses);

		var rate, mul;
		for (var r in rates) {
			rate = rates[r];
			mul = rate.apply(tile);
			if (mul == 0) continue;

			// Do modifiers first to prevent absurd rates
			if (rate.modifiers) {
				for (var m in rate.modifiers) {
					ent.rates[m] *= Math.pow(rate.modifiers[m], mul);
				}
			}

			if (rate.bonuses) {
				for (var b in rate.bonuses) {
					ent.rates[b] += rate.bonuses[b] * mul;
				}
			}
		}
	},

	onProximityUpdate(tile) {
		this.super$onProximityUpdate(tile);
		this.calculateRates(tile);
	},

	onDestroyed(tile) {
		this.super$onDestroyed(tile);
		// Spawn lots of arcs
		for (var i = 0; i < 10; i++) {
			this.arc(tile, Items.surgealloy);
		}
	}
});
arc.flags = EnumSet.of(BlockFlag.producer);
arc.minColor = Color.white;
arc.maxColor = new Color(1.35, 1.35, 1.5);
arc.entityType = prov(() => {
	const ent = extendContent(Router.RouterEntity, arc, {
		getRates() {return this._rates},
		setRates(set) {this._rates = set},
		getProgress() {return this._progress},
		setProgress(set) {this._progress = set}
	});
	ent._rates = Object.create(rates.base.bonuses);
	ent._progress = 0;
	return ent;
});

module.exports = {
	rates: rates,
	moderouter: mod,
	arcRouter: arc,
	arcMultipliers: arcMultipliers
};

})();
