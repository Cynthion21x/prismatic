const siegeengine = extendContent(UnitType, "siege-engine", {});
siegeengine.constructor = () => extend(UnitWaterMove, {});
siegeengine.defaultController = ais.groundRepairAI;
siegeengine.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, 0, -7.5));
siegeengine.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
siegeengine.ammoType = AmmoTypes.power;
