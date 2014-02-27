NPCs = function (game) {

    this.game = game;
    this.npcs = null;
    this.healthbars = null;
};

NPCs.prototype = {
    preload: function () {
                this.game.load.atlasXML('knight', 'assets/player/knight.png', 'assets/player/knight.xml');
    },
    create: function () {
        this.npcs = this.game.add.group();

        for (var i = 0; i < 12; i++) {
            this.createNpc();
        }
    },
    createNpc: function () {

        var xPosition = this.game.rnd.integerInRange(0, 800);
        var yPosition = this.game.rnd.integerInRange(0, 600);

        var npc = this.npcs.create(xPosition, yPosition, 'knight');
        
        npc.anchor.setTo(0.5, 0.5);

        npc.body.immovable = true;
        npc.body.collideWorldBounds = true;

        npc.animations.add('up', Phaser.Animation.generateFrameNames('Up', 1, 9, '', 2), 30, true);
       npc.animations.add('down', Phaser.Animation.generateFrameNames('Down', 1, 9, '', 2), 30, true);
        npc.animations.add('left', Phaser.Animation.generateFrameNames('Left', 1, 9, '', 2), 30, true);
        npc.animations.add('right', Phaser.Animation.generateFrameNames('Right', 1, 9, '', 2), 30, true);

        npc.stepsLeft = 0;
        npc.directionToFollow = 0;
    },
    update: function (target) {

        this.npcs.forEach(function (npc) {

            npc.body.velocity.setTo(0, 0);

            var xDistance = npc.x - target.sprite.x;
            var yDistance = npc.y - target.sprite.y;

            if (Math.abs(xDistance) + Math.abs(yDistance) < 200) {
                this.game.physics.moveToObject(npc, target.sprite, 90);
            } else {

                if (npc.stepsLeft == 0) {
                    npc.directionToFollow = this.game.rnd.integerInRange(0, 5);

                    npc.stepsLeft = 60;
                }

                switch (npc.directionToFollow) {
                case 1:
                    npc.body.velocity.x = -75;
                    break;
                case 2:
                    npc.body.velocity.x = 75;
                    break;
                case 3:
                    npc.body.velocity.y = -75;
                    break;
                case 4:
                    npc.body.velocity.y = 75;
                    break;
                }


                npc.stepsLeft--;
            }

            if (npc.body.facing == Phaser.LEFT) {
                npc.animations.play('left');
            } else if (npc.body.facing == Phaser.RIGHT) {
                npc.animations.play('right');
            } else if (npc.body.facing == Phaser.UP) {
                npc.animations.play('up');
            } else if (npc.body.facing == Phaser.DOWN) {
                npc.animations.play('down');
            }
        }, this);


    }
};