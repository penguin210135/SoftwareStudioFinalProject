var setState = {
    preload: function () {
        
    },

    create: function () {
        game.stage.backgroundColor = '#3498db';
        game.renderer.renderSession.roundPixels = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;
    },

    update: function () {

    },
};