var menuState = {

    preload: function () {
        game.load.audio('menu_bgm', ['assets/audio/menu_bgm.mp3']);
        game.load.image('background', 'assets/image/background_menu.jpg');
        game.load.image('arrow', 'assets/image/arrow.png');
        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
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
        this.menu_bgm = game.add.audio('menu_bgm');
        this.menu_bgm.loop = true;
        this.menu_bgm.volume = 0.5;
        this.menu_bgm.play();

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
            game.state.start('main');
        } else if (this.arrow.position.y == 415) { //set

        } else if (this.arrow.position.y == 515) { //rank

        } else if (this.arrow.position.y == 615) { //story

        }

    }
};

var mainState = {
    preload: function () {
        game.load.image('background', 'assets/image/background_menu.jpg');
        game.load.image('arrow', 'assets/image/arrow.png');
        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
    },
    create: function () {
        /*Default Init*/
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;

        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        //player
        this.player = game.add.image(300, 315, 'arrow');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.02, 0.02);
        this.player.move_x = 10;
        this.player.move_y = 10;
        this.player.destin_x = 300;
        this.player.destin_y = 315;

        //Add item and set hot key

        //clock

        //bag
        this.bag = game.add.button(0, 0, 'Bag', this.BagOnClick, this);
        this.keyboard_B = game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.keyboard_B.onDown.add(this.BagOnClick, this);
        //map


    },

    update: function () {
        if (game.input.activePointer.leftButton.isDown) {
            
            //set destination point
            this.player.destin_x = game.input.mousePointer.x;
            this.player.destin_y = game.input.mousePointer.y;
            //player moving
        }
        if (game.input.mousePointer.x <= 1190 && game.input.mousePointer.x >= 90 && game.input.mousePointer.y >= 40 && game.input.mousePointer.y <= 800) {
            this.moveplayer();
        }
    },

    moveplayer: function () {
       
        //player move - x axis
        if (this.player.x < this.player.destin_x) {
            if (this.player.x + this.player.move_x >= this.player.destin_x) {
                this.player.x = this.player.destin_x;
            } else {
                this.player.x += this.player.move_x;
            }
        } else if (this.player.x > this.player.destin_x) {
            if (this.player.x - this.player.move_x <= this.player.destin_x) {
                this.player.x = this.player.destin_x;
            } else {
                this.player.x -= this.player.move_x;
            }
        } else {
            this.player.x = this.player.destin_x;
        }
        //player move - y axis
        if (this.player.y < this.player.destin_y) {
            if (this.player.y + this.player.move_y >= this.player.destin_y) {
                this.player.y = this.player.destin_y;
            } else {
                this.player.y += this.player.move_y;
            }
        } else if (this.player.y > this.player.destin_y) {
            if (this.player.y - this.player.move_y <= this.player.destin_y) {
                this.player.y = this.player.destin_y;
            } else {
                this.player.y -= this.player.move_y;
            }
        } else {
            this.player.y = this.player.destin_y;
        }
    },

    BagOnClick: function () {
        console.log('Open the Bag!');
    },
};

var game = new Phaser.Game(1160, 720, Phaser.AUTO, 'canvas');
game.state.add('menu', menuState);
game.state.add('main', mainState);
//game.state.add('leader', LeaderboardState);
//game.state.add('end', EndState);
game.state.start('menu');