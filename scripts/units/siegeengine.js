const Siegeengine = extendContent(UnitType, "siegeengine", {});
Siegeengine.constructor = () => extend(UnitEntity, {});
Siegeengine.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, 0, -7.5));
Siegeengine.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
Siegeengine.ammoType = AmmoTypes.power;

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(Siegeengine, 60 * 25, ItemStack.with(Items.silicon, 2500, Items.surge, 400, Items.prismatic-d-iron, 400, Items.plastanium, 800, Liquids.prismatic-d-wave, 30)));
