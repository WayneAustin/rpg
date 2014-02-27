Level = function (game) {

    this.game = game;
    this.map = null;
    this.layer = null;

    this.game.stage.backgroundColor = "#00ffff";

    this.map = this.game.add.tilemap('demolevel');
    this.map.addTilesetImage('leveltiles2', 'leveltiles');
    this.map.setCollision([20], true, 'Terrain');

    this.layer2 = this.map.createLayer('Ground');
    this.layer2.fixedToCamera = true;
    this.layer2.resizeWorld();

    this.layer = this.map.createLayer('Terrain');
    this.layer.fixedToCamera = true;
    this.layer.resizeWorld();
};