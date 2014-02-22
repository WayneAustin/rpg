Enemy = function (game) {

    this.game = game;
    this.sprite = null;
    this.directionToFollow = 0;
    this.stepsLeft = 0;
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
        this.sprite.animations.add('spin', [2, 3, 4, 5, 6], 10, true);
    },
    update: function (target) {
        this.sprite.body.velocity.setTo(0, 0);    
        
        var xDistance = this.sprite.x - target.sprite.x;
        var yDistance = this.sprite.y - target.sprite.y;
        
        if (Math.abs(xDistance) + Math.abs(yDistance) < 200)
        {
            this.game.physics.moveToObject(this.sprite, target.sprite, 75);
        }
        else
        {

            if (this.stepsLeft == 0)
            {
               this.directionToFollow = this.game.rnd.integerInRange(0, 6);

                this.stepsLeft = 30;
            }

            switch(this.directionToFollow)
            {
                case 1:
                    this.sprite.body.velocity.x = -75;
                    this.sprite.animations.play('left');
                    break;
                case 2:
                    this.sprite.body.velocity.x = 75;
                    this.sprite.animations.play('right');
                break;
                case 3:
                    this.sprite.body.velocity.y = -75;
                    this.sprite.animations.play('left');
                break;
                case 4:
                    this.sprite.body.velocity.y = 75;
                    this.sprite.animations.play('right');
                break;
                case 5: 
                    this.sprite.animations.play('spin');
                    break;
            }            

            this.stepsLeft--;        
    }}
};