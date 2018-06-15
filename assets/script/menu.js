var menuState = {
    preload: function () {

    },
    create: function () {
        /*Default Init*/
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        var Title = game.add.bitmapText(300, 100, 'carrier_command', 'The Advanture of Fome', 32);

        //set list
        game.add.bitmapText(360, 300, 'carrier_command', 'Start', 32);
        game.add.bitmapText(360, 400, 'carrier_command', 'Set', 32);
        game.add.bitmapText(360, 500, 'carrier_command', 'Rank', 32);
        game.add.bitmapText(360, 600, 'carrier_command', 'Story', 32);
        this.arrow = game.add.image(300, 315, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.02, 0.02);
        this.arrow.angle = -90;
        this.buttontime = game.time.now;

        //bgm
        if (!this.menu_bgm) {
            this.menu_bgm = game.add.audio('menu_bgm');
            this.menu_bgm.loop = true;
            this.menu_bgm.volume = bgm_volumn;
            this.menu_bgm.play();
        }

        //Enter
        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enter.onDown.add(this.changepage, this);
    },

    update: function () {
        if (game.time.now > this.buttontime + 50) {
            this.buttontime = game.time.now;
            this.movelist();
        }
    },

    movelist: function () {
        if (this.cursor.up.isDown) {
            if (this.arrow.position.y != 315) {
                this.arrow.position.y -= 100;
            }
        } else if (this.cursor.down.isDown) {
            if (this.arrow.position.y != 615) {
                this.arrow.position.y += 100;
            }
        }
    },

    changepage: function () {

        if (this.arrow.position.y == 315) {   //start
            this.menu_bgm.stop();
            game.state.start('story_front');
        } else if (this.arrow.position.y == 415) { //set
            game.state.start('set');
        } else if (this.arrow.position.y == 515) { //rank

        } else if (this.arrow.position.y == 615) { //story

        }

    }
};