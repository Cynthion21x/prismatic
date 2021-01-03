var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "prismatic-echo"), Vars.content.getByName(ContentType.unit, "prismatic-reverberator")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
