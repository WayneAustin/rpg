Player = function (game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;

    this.sprite = this.game.add.sprite(100, 60, 'rapscallion');

    this.sprite.body.immovable = true;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Up', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Down', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Left', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Right', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('attackup', Phaser.Animation.generateFrameNames('AttackUp', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('attackdown', Phaser.Animation.generateFrameNames('AttackDown', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('attackleft', Phaser.Animation.generateFrameNames('AttackLeft', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('attackright', Phaser.Animation.generateFrameNames('AttackRight', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('die', Phaser.Animation.generateFrameNames('Die', 1, 6, '', 2), 15, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Player.prototype.update = function () {
    this.sprite.body.velocity.setTo(0, 0);

    var attacking = false;

    if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -150;
    } else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 150;
    } else if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -150;
    } else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.y = 150;
    } else {
        this.sprite.animations.stop();
    }

    if (this.sprite.body.facing == Phaser.LEFT) {
        this.sprite.animations.play('left');
    } else if (this.sprite.body.facing == Phaser.RIGHT) {
        this.sprite.animations.play('right');
    } else if (this.sprite.body.facing == Phaser.UP) {
        this.sprite.animations.play('up');
    } else if (this.sprite.body.facing == Phaser.DOWN) {
        this.sprite.animations.play('down');
    }
};