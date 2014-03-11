ValueBar = function (game, subject, colour, hoverHeight, value, widthLimit) {

    this.game = game;
    this.subject = subject;

    this.originalValue = value;
    this.value = value;

    this.widthLimit = widthLimit;

    this.hoverHeight = hoverHeight;

    this.bar = game.add.graphics(0, 0);

    this.colour = colour;

};

ValueBar.prototype.update = function (value) {
    this.value = value;

    if (this.value == 0) {
        this.bar.clear();
    } else if (this.value > 0) {
        this.bar.position.x = this.subject.sprite.x - (this.value / 2);
        this.bar.position.y = this.subject.sprite.y - this.hoverHeight;
    }

};

ValueBar.prototype.render = function () {
    if (this.value > 0 && this.value < this.originalValue && this.subject.sprite.alive) {
        this.bar.clear();
        this.bar.beginFill(this.colour);
        this.bar.lineStyle(1, 0xFFFFFF, 1);
        this.bar.drawRect(0, 0, this.value, 10);
        this.bar.endFill();
    }
};