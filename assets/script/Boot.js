var Technotip = {};

Technotip.Boot = function (game) {
};

Technotip.Boot.prototype = {
    preload: function () {
        this.load.image('preloadbar', 'assets/image/loadbar.png');
    },
    create: function () {
        this.game.stage.backgroundColor = '#fff';
    },
    update: function () {
        this.state.start('Preloader');
    }
};