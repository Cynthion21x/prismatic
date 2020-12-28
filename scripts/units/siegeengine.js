const Siegeengine = extendContent(UnitType, "siegeengine", {});
Siegeengine.constructor = () => extend(UnitEntity, {});
Siegeengine.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, 0, -7.5));
Siegeengine.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
Siegeengine.ammoType = AmmoTypes.power;

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(Siegeengine, 60 * 25, ItemStack.with(Items.silicon, 1000, Items.metaglass, 600, Items.copper, 600, Items.lead, 200)));
