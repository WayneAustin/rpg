window.onload = function() {
    
            var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
            function preload () {            
                    level = new Level(game);
                    level.preload();
                
                    player = new Player(game);
                    player.preload();
                
                    //npc = new NPC(game);
                    //npc.preload();
                
                    hud = new HUD(game);    
            }
    
            function create () {
                    level.create();
                
                    player.create();
    
                    //npc.create();
                
                    hud.create();
                
                    game.camera.follow(player.sprite, Phaser.FOLLOW_TOPDOWN);
                
                    game.physics.gravity.x = 0;
                    game.physics.gravity.y = 0;
            }
            
            function update () {                        
                game.physics.collide(player.sprite, level.layer);     
                
                player.update();
            }
    
        };