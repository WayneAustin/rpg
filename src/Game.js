window.onload = function() {
    
            var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
            function preload () {            
                    level = new Level(game);
                    level.preload();
                
                    player = new Player(game);
                    player.preload();
                
                    //npc = new NPC(game);
                    //npc.preload();
                
                    enemy = new Enemy(game);
                    enemy.preload();
                
                    hud = new HUD(game);    
            }
    
            function create () {
                    level.create();
                
                    player.create();    
                    //npc.create();               
                    enemy.create();
                
                    hud.create();
                
                    game.camera.follow(player.sprite, Phaser.FOLLOW_TOPDOWN);

                    game.physics.gravity.setTo(0, 0);
            }
            
            function update () {                        

                
                player.update(enemy);
                enemy.update(player);
                
                game.physics.collide(player.sprite, enemy.sprite);   
                
                game.physics.collide(player.sprite, level.layer);  
                game.physics.collide(enemy.sprite, level.layer);
            }
    
        };