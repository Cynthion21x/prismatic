var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "Echo"), Vars.content.getByName(ContentType.unit, "Reverberator")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
