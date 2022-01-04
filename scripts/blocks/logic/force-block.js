const force-block = extendContent(Wall,"force-block",{});

Events.on(BlockDestroyEvent, event => {
  // display toast on top of screen when the unit was a player
  Vars.ui.hudfrag.showToast("Pathetic.");

})
