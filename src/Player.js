Player = function (game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;

    this.health = 100;

    this.sprite = this.game.add.sprite(100, 60, 'rapscallion');

    this.sprite.body.immovable = true;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.allowGravity = false;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.angle = 0;

    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Up', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Down', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Left', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Right', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('attackup', Phaser.Animation.generateFrameNames('AttackUp', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('attackdown', Phaser.Animation.generateFrameNames('AttackDown', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('attackleft', Phaser.Animation.generateFrameNames('AttackLeft', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('attackright', Phaser.Animation.generateFrameNames('AttackRight', 1, 6, '', 2), 15, true);
    this.sprite.animations.add('die', Phaser.Animation.generateFrameNames('Die', 1, 6, '', 2), 15, true);

    this.healthbar = new ValueBar(game, this, 0xFF3300, 50, this.health, 1);

    this.attacking = false;

    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Player.prototype.update = function () {
    this.sprite.body.velocity.setTo(0, 0);

    this.attacking = false;

    if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -150;
    } else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 150;
    } else if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -150;
    } else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.y = 150;
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.attacking = true;
    } else {
        this.sprite.animations.stop();
    }

    if (this.attacking) {
        if (this.sprite.body.facing == Phaser.LEFT) {
            this.angle = 180;
            this.sprite.animations.play('attackleft');
        } else if (this.sprite.body.facing == Phaser.RIGHT) {
            this.angle = 0;
            this.sprite.animations.play('attackright');
        } else if (this.sprite.body.facing == Phaser.UP) {
            this.angle = 270;
            this.sprite.animations.play('attackup');
        } else if (this.sprite.body.facing == Phaser.DOWN) {
            this.angle = 90;
            this.sprite.animations.play('attackdown');
        }
    } else {
        if (this.sprite.body.facing == Phaser.LEFT) {
            this.angle = 180;
            this.sprite.animations.play('left');
        } else if (this.sprite.body.facing == Phaser.RIGHT) {
            this.angle = 0;
            this.sprite.animations.play('right');
        } else if (this.sprite.body.facing == Phaser.UP) {
            this.angle = 270;
            this.sprite.animations.play('up');
        } else if (this.sprite.body.facing == Phaser.DOWN) {
            this.angle = 90;
            this.sprite.animations.play('down');
        }
    }

    this.healthbar.update(this.health);
};

Player.prototype.render = function () {
    this.healthbar.render();
};

Player.prototype.damage = function () {
    this.health--;
    if (this.health <= 0) {
        this.sprite.kill();

        return true;
    }

    return false;
};