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

        this.Title = game.add.bitmapText(game.width / 2, game.height / 2, 'carrier_command', 'MeiShi', 64);
        this.start = game.add.bitmapText(360, 300, 'carrier_command', 'Start', 40);
        this.set = game.add.bitmapText(360, 400, 'carrier_command', 'Set', 40);
        this.rank = game.add.bitmapText(360, 500, 'carrier_command', 'Rank', 40);
        this.story = game.add.bitmapText(360, 600, 'carrier_command', 'Author', 40);
        this.skill = game.add.bitmapText(360, 600, 'carrier_command', 'Skill', 40);

        this.Title.anchor.setTo(0.5, 0.5);
        this.Title.position.setTo(game.width / 2, 100);
        this.start.anchor.setTo(0.5, 0.5);
        this.start.position.setTo(game.width / 2, 200);
        this.set.anchor.setTo(0.5, 0.5);
        this.set.position.setTo(game.width / 2, 300);
        this.rank.anchor.setTo(0.5, 0.5);
        this.rank.position.setTo(game.width / 2, 400);
        this.skill.anchor.setTo(0.5, 0.5);
        this.skill.position.setTo(game.width / 2, 500);
        this.story.anchor.setTo(0.5, 0.5);
        this.story.position.setTo(game.width / 2, 600);


        this.arrow = game.add.image(300, 215, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.02, 0.02);
        this.arrow.angle = -90;
        this.arrow.pos = 0;

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
        this.enter_sound = game.add.audio('enter_sound');
        this.enter_sound.volume = bgm_volumn;
    },

    update: function () {
        if (game.time.now > this.buttontime + 50) {
            this.buttontime = game.time.now;
            this.movelist();
        }
    },

    movelist: function () {
        if (this.cursor.up.isDown) {
            if (this.arrow.pos != 0) {
                this.arrow.pos -= 1;
            }
        } else if (this.cursor.down.isDown) {
            if (this.arrow.pos != 4) {
                this.arrow.pos += 1;
            }
        }

        switch (this.arrow.pos) {
            case 0:
                this.arrow.position.setTo(this.start.position.x - 150, 200);
                break;
            case 1:
                this.arrow.position.setTo(this.set.position.x - 100, 300);
                break;
            case 2:
                this.arrow.position.setTo(this.rank.position.x - 120, 400);
                break;
            case 3:
                this.arrow.position.setTo(this.skill.position.x - 150, 500);
                break;
            case 4:
                this.arrow.position.setTo(this.story.position.x - 170, 600);
                break;
        }
    },

    changepage: function () {
        this.enter_sound.play();
        switch (this.arrow.pos) {
            case 0:
                this.menu_bgm.stop();
                ToNewPlace('story_front');
                break;
            case 1:
                ToNewPlace('set');
                break;
            case 2:
                ToNewPlace('rank');
                break;
            case 3:

                break;
            case 4:
                ToNewPlace('author');
                break;
        }
    }
};