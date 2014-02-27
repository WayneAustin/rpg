NPC = function (game, player) {

    this.game = game;
    this.player = player;
    this.sprite = null;
    this.stepsLeft = 0;
    this.directionToFollow = 0;

    var xPosition = this.game.rnd.integerInRange(0, 800);
    var yPosition = this.game.rnd.integerInRange(0, 600);

    this.sprite = this.game.add.sprite(xPosition, yPosition, 'knight');

    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.body.immovable = true;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Up', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Down', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Left', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Right', 1, 9, '', 2), 30, true);
};

NPC.prototype.update = function () {
    this.sprite.body.velocity.setTo(0, 0);

    var xDistance = this.sprite.x - this.player.sprite.x;
    var yDistance = this.sprite.y - this.player.sprite.y;

    if (Math.abs(xDistance) + Math.abs(yDistance) < 200) {
        this.game.physics.moveToObject(this.sprite, this.player.sprite, 90);
    } else {

        if (this.stepsLeft == 0) {
            this.directionToFollow = this.game.rnd.integerInRange(0, 5);

            this.stepsLeft = 60;
        }

        switch (this.directionToFollow) {
        case 1:
            this.sprite.body.velocity.x = -75;
            break;
        case 2:
            this.sprite.body.velocity.x = 75;
            break;
        case 3:
            this.sprite.body.velocity.y = -75;
            break;
        case 4:
            this.sprite.body.velocity.y = 75;
            break;
        }


        this.stepsLeft--;
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