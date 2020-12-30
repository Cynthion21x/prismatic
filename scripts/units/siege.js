const siege = extendContent(UnitType, "siege", {});
siege.constructor = () => extend(UnitEntity, {});
siege.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, -18, -8.5));
siege.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, 18, -8.5));
siege.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 9, 60 * 13, 120));
siege.ammoType = AmmoTypes.power;

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(siege, 60 * 25, ItemStack.with(Items.silicon, 3000, Items.plastanium, 950, Items.lead, 3500, Items.copper, 3000, Items.titanium, 900)));
