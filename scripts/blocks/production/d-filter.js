const dfilter = extendContent(GenericCrafter, "d-filter", {
	load() {
		this.super$load();
		this.regions = [];
		this.regions[0] = Core.atlas.find(this.name);
		this.regions[1] = Core.atlas.find(this.name + "-liquid");
	}
});

dfilter.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild,dfilter, {
	draw() {
	    Draw.rect(dfilter.regions[0], this.x, this.y);
	    Drawf.liquid(dfilter.regions[1], this.x, this.y, this.liquids.get(dfilter.outputLiquid.liquid) / dfilter.liquidCapacity, Liquids.d-wave.color);
	    Draw.rect(dfilter.regions[2], this.x, this.y);
	}
});
