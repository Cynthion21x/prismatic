const siege = extendContent(UnitType, "chaos", {});
siege.constructor = () => extend(UnitEntity, {});
siege.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, -18, -8.5));
siege.abilities.add(new UnitSpawnAbility(UnitTypes.crawler, 60 * 30, 18, -8.5));
siege.ammoType = AmmoTypes.power;
