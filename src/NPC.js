NPC = function (game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;
};

NPC.prototype = {
    preload: function () {
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    create: function (xPosition, yPosition) {
        this.sprite = this.game.add.sprite(100, this.game.world.height - 200, 'dude');

        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function () {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -150;
            this.sprite.animations.play('left');
        } else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play('right');}
        
        if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;
            this.sprite.animations.play('left');
        } else if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;
            this.sprite.animations.play('right');
        }
    }
};