Player = function (game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;
};

Player.prototype = {
    preload: function () {
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    create: function () {
        this.sprite = this.game.add.sprite(50, 50, 'dude');
        
        this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true)
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    update: function (npc) {
        this.sprite.body.velocity.setTo(0, 0);

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
        
        this.nearNPC(npc);
        
    },
    touchNPC: function(npc) {
         this.sprite.body.velocity.setTo(0, 0);
         npc.sprite.body.velocity.setTo(0, 0);
    },
    nearNPC: function(npc) {
        var xDistance = this.sprite.x - npc.sprite.x;
        var yDistance = this.sprite.y - npc.sprite.y;
        
        if (Math.abs(xDistance) + Math.abs(yDistance) < 64)
        {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                npc.sprite.kill();
            }
        }
    }
};