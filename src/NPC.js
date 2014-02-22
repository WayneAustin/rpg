NPC = function (game) {

    this.game = game;
    this.sprite = null;
};

NPC.prototype = {
    preload: function () {
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    create: function () {
        this.sprite = this.game.add.sprite(500, 540, 'dude');

        this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    },
    update: function () {
        this.sprite.body.velocity.setTo(0, 0);
   }
};