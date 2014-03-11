HUD = function (game, player) {

    this.game = game;
    this.player = player;
    this.score = 0;
    
     this.healthText = this.game.add.text(16, this.game.height - 48, 'Health: ', {
            font: '32px arial',
            fill: '#ffffff',
         stroke: '#FF3300',
         strokeThickness: 5
        });

    this.healthText.fixedToCamera = true;
};

HUD.prototype = {
    update: function () {
        this.healthText.setText('Health: ' + this.player.health);
    }
};