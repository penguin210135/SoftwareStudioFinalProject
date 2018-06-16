var setState = {
    preload: function () {

    },

    create: function () {
       
        this.cursor = game.input.keyboard.createCursorKeys();

        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        //set text
        game.add.bitmapText(800, 600, 'carrier_command', 'Back', 32);
        game.add.bitmapText(360, 600, 'carrier_command', 'Set', 32);
        game.add.bitmapText(360, 150, 'carrier_command', 'Volume', 32);

        this.arrow = game.add.image(750, 615, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.scale.setTo(0.02, 0.02);
        this.arrow.angle = -90;

        //set renew time
        this.buttontime = game.time.now;

        //set bar
        this.volume_bar = game.add.image(360, 300, 'setting-bar');
        this.volume_bar.anchor.setTo(0.5, 0.5);
        this.volume_bar.scale.setTo(1, 0.1);
        this.volume_bar.position.setTo(600, 250);
        this.volume_bar.inputEnabled = true;

        this.volume_control = game.add.image(360, 300, 'setting-control');
        this.volume_control.anchor.setTo(0.5, 0.5);
        this.volume_control.scale.setTo(0.05, 0.05);
        this.volume_control.position.setTo(550, 250);

        this.set_volumn = bgm_volumn;

        //Enter
        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enter.onDown.add(this.changepage, this);

        this.enter_sound = game.add.audio('enter_sound');
        this.enter_sound.volume = bgm_volumn;
    },

    update: function () {
        if (game.time.now > this.buttontime + 50) {
            this.buttontime = game.time.now;
            this.moveArrow();
            this.SetParameter();
        }
    },
    moveArrow: function () {
        if (this.cursor.left.isDown) {
            this.arrow.position.x = 315;
        } else if (this.cursor.right.isDown) {
            this.arrow.position.x = 750;
        }
    },
    SetParameter: function () {

        if (game.input.mousePointer.x <= 800 && game.input.mousePointer.x >= 360 && game.input.mousePointer.y >= 230 && game.input.mousePointer.y <= 250) {
            if (game.input.activePointer.leftButton.isDown) {
                
                this.volume_control.position.setTo(game.input.mousePointer.x, 250);
                this.set_volumn = (game.input.mousePointer.x - 360)/400;
                console.log("new_volumn = "+ this.set_volumn);
                bgm_volumn = this.set_volumn;
            }
        }
    },
    changepage:function(){
        if(this.arrow.position.x == 315){    //submit
            this.enter_sound.play();
            console.log("set volumn: "+ this.set_volumn);
            menuState.menu_bgm.volume = bgm_volumn;
        }else if (this.arrow.position.x == 750){
            this.enter_sound.play();
            game.state.start('menu');
        }
    }
};