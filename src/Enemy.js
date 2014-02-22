Enemy = function (game) {

    this.game = game;
    this.sprite = null;
};

Enemy.prototype = {
    preload: function () {
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    create: function () {
        this.sprite = this.game.add.sprite(300, 300, 'dude');

        this.sprite.body.immovable = true;
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    },
    update: function (player, npc) {
        this.sprite.body.velocity.setTo(0, 0);
    
        
        this.nearTarget(player);
        this.nearTarget(npc);
    },
    nearTarget: function(target){
        var xDistance = this.sprite.x - target.sprite.x;
        var yDistance = this.sprite.y - target.sprite.y;
        
        if (Math.abs(xDistance) + Math.abs(yDistance) < 128)
        {
            this.game.physics.moveToObject(this.sprite, target.sprite, 150);
        }
    },
    touchNPC: function(npc) {
         this.sprite.body.velocity.setTo(0, 0);
         npc.sprite.body.velocity.setTo(0, 0);
        
         npc.sprite.kill();
    }
};