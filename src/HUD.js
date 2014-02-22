HUD = function (game) {

    this.game = game;
    this.score = 0;
    this.scoreText = null;
};

HUD.prototype = {
    preload: function () {

    },
    create: function () {
        this.scoreText = this.game.add.text(16, 16, 'Score: 0', {
            font: '32px ubuntu',
            fill: '#000'
        });

        this.scoreText.fixedToCamera = true;
    },
    update: function () {

    }
};