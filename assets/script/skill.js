var skillState = {
    preload: function () {

    },
    create: function () {

        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        this.fightimage = game.add.image(0, 0, 'fightimage');

        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_enter.onDown.add(this.nextstorystep, this, null);
    },
    update: function () {

    },

    nextstorystep: function () {
        ToNewPlace('menu');
    },
};