NPC = function (game, player, index) {

    this.game = game;
    this.player = player;
    this.sprite = null;

    this.stepsLeft = 0;
    this.directionToFollow = 0;
    this.health = this.game.rnd.integerInRange(50, 100);
    this.speed = this.game.rnd.integerInRange(30, 100);

    this.angle = 0;

    this.stunned = false;

    var xPosition = this.game.rnd.integerInRange(0, 800);
    var yPosition = this.game.rnd.integerInRange(0, 600);

    this.sprite = this.game.add.sprite(xPosition, yPosition, 'knight');
    this.sprite.name = index.toString();

    var scale = this.game.rnd.realInRange(0.8, 1.5);

    this.sprite.scale.setTo(scale, scale);

    this.sprite.body.immovable = true;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.allowGravity = false;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.animations.add('up', Phaser.Animation.generateFrameNames('Up', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('down', Phaser.Animation.generateFrameNames('Down', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('left', Phaser.Animation.generateFrameNames('Left', 1, 9, '', 2), 30, true);
    this.sprite.animations.add('right', Phaser.Animation.generateFrameNames('Right', 1, 9, '', 2), 30, true);

    this.healthbar = new ValueBar(game, this, 0x000000, 50, this.health, 1);
};

NPC.prototype.update = function () {

    if (!this.stunned) {
        this.sprite.body.velocity.setTo(0, 0);

        var xDistance = this.sprite.x - this.player.sprite.x;
        var yDistance = this.sprite.y - this.player.sprite.y;

        if (Math.abs(xDistance) + Math.abs(yDistance) < 200) {
            this.game.physics.moveToObject(this.sprite, this.player.sprite, this.speed);
        } else {

            if (this.stepsLeft == 0) {
                this.directionToFollow = this.game.rnd.integerInRange(0, 5);

                this.stepsLeft = 60;
            }

            switch (this.directionToFollow) {
            case 1:
                this.sprite.body.velocity.x = -this.speed;
                break;
            case 2:
                this.sprite.body.velocity.x = this.speed;
                break;
            case 3:
                this.sprite.body.velocity.y = -this.speed;
                break;
            case 4:
                this.sprite.body.velocity.y = this.speed;
                break;
            }


            this.stepsLeft--;
        }

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

NPC.prototype.render = function () {
    this.healthbar.render();
};

NPC.prototype.damage = function () {

    this.health -= this.game.rnd.integerInRange(0, 10);

    this.stunned = true;

    this.game.physics.velocityFromAngle(this.player.angle, 200, this.sprite.body.velocity);

    if (this.health <= 0) {
        this.health = 0;
        this.sprite.kill();

        return true;
    }

    this.game.time.events.add(Phaser.Timer.SECOND * 0.3, this.recover, this);

    return false;
};

NPC.prototype.recover = function () {
    this.stunned = false;
    this.sprite.body.velocity.setTo(0, 0);
    this.stepsLeft = 0;
};