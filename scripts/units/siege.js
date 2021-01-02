const siege = extendContent(UnitType, "chaos", {});
siege.constructor = () => extend(UnitEntity, {});
siege.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, -18, -8.5));
siege.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, 18, -8.5));
siege.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 9, 60 * 13, 120));
siege.ammoType = AmmoTypes.power;
