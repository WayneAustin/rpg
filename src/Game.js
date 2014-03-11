window.onload = function () {

    var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var npcs;
    var player;
    var level;
    var hud;

    function preload() {
        this.game.load.tilemap('demolevel', '/levels/demo2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('leveltiles', '/assets/leveltiles2.png', 32, 32);

        this.game.load.atlasXML('knight', 'assets/player/knight.png', 'assets/player/knight.xml');
        this.game.load.atlasXML('rapscallion', 'assets/player/rapscallion.png', 'assets/player/rapscallion.xml');
    }

    function create() {
        level = new Level(game);

        player = new Player(game);

        npcs = [];

        for (var index = 0; index < 6; index++) {
            npcs.push(new NPC(game, player, index));
        }
        
        hud = new HUD(game, player);

        game.camera.follow(player.sprite, Phaser.FOLLOW_TOPDOWN);

        game.physics.gravity.setTo(0, 0);
    }

    function update() {

        for (var index = 0; index < npcs.length; index++) {
            if (npcs[index].sprite.alive) {
                game.physics.collide(player.sprite, npcs[index].sprite, playerTouchNPC, null, this);
                game.physics.collide(npcs[index].sprite, level.layer);

                npcs[index].update();
            }
        }

        game.physics.collide(player.sprite, level.layer);

        player.update();
        
        hud.update();
    }


    function render() {
        for (var index = 0; index < npcs.length; index++) {
            if (npcs[index].sprite.alive) {
                npcs[index].render();
            }
        }

        player.render();
    }

    function playerTouchNPC(playerSprite, npcSprite) {
        if (player.attacking)
            npcs[npcSprite.name].damage();
    }

};