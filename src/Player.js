Player = function (game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;
};

Player.prototype = {
    preload: function () {
        this.game.load.spritesheet('rapscallion', 'assets/rapscallion.png', 64, 64);
    },
    create: function () {
        this.sprite = this.game.add.sprite(100, 60, 'rapscallion');
        
        this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.sprite.animations.add('down', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
        this.sprite.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        this.sprite.animations.add('right', [27, 28, 29, 30, 31, 32, 33, 34, 35], 10, true);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function (enemy) {
        this.sprite.body.velocity.setTo(0, 0);

        if (this.cursors.left.isDown) {
            this.sprite.body.velocity.x = -150;
            this.sprite.animations.play('left');
        } else if (this.cursors.right.isDown) {
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play('right');}
        else if (this.cursors.up.isDown) {
            this.sprite.body.velocity.y = -150;
            this.sprite.animations.play('up');
        } else if (this.cursors.down.isDown) {
            this.sprite.body.velocity.y = 150;
            this.sprite.animations.play('down');
        } else {
            this.sprite.animations.stop();
        }
        
        this.nearEnemy(enemy);
        
    },
    nearEnemy: function(enemy) {
        var xDistance = this.sprite.x - enemy.sprite.x;
        var yDistance = this.sprite.y - enemy.sprite.y;
        
        if (Math.abs(xDistance) + Math.abs(yDistance) < 64)
        {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                enemy.sprite.kill();
            }
        }
    },
    touchEnemy: function(enemy) {
         this.sprite.body.velocity.setTo(0, 0);
         enemy.sprite.body.velocity.setTo(0, 0);
        
        this.sprite.kill();
    },
};