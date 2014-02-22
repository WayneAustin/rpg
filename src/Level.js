Level = function (game) {

    this.game = game;
    this.map = null;
    this.layer = null;
};

Level.prototype = {
    preload: function () {
        this.game.load.tilemap('demolevel', '/levels/demo2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('leveltiles', '/assets/leveltiles2.png', 32, 32);
    },
    create: function () {

        this.game.stage.backgroundColor = "#00ffff";

        this.map = this.game.add.tilemap('demolevel');
        this.map.addTilesetImage('leveltiles2', 'leveltiles');
        this.map.setCollisionByExclusion([0]);

        this.layer = this.map.createLayer('Terrain');
        this.layer.fixedToCamera = true;
        this.layer.resizeWorld();

    },
    update: function () {}
};