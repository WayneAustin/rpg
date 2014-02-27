window.onload = function () {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        level = new Level(game);
        level.preload();

        player = new Player(game);
        player.preload();

        npcs = new NPCs(game);
        npcs.preload();
    }

    function create() {
        level.create();

        player.create();

        npcs.create();

        game.camera.follow(player.sprite, Phaser.FOLLOW_TOPDOWN);

        game.physics.gravity.setTo(0, 0);
        game.physics.bounce.setTo(0,0);
    }

    function update() {

        player.update(npcs);
        npcs.update(player);

        game.physics.collide(player.sprite, npcs.npcs, this.collide, null, this);
        game.physics.collide(npcs.npcs, npcs.npcs, this.collide, null, this);

        game.physics.collide(player.sprite, level.layer, this.collide, null, this);
        game.physics.collide(npcs.npcs, level.layer, this.collide, null, this);
    }

};