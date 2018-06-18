var storyfrontState = {
    preload: function () {

    },
    create: function () {

        game.stage.backgroundColor = '#000000';
        this.storystep = 0
        this.Rollisend = false;

        //roll
        this.textroll = game.add.image(85, 720, 'talk_front_run');

        //msg
        createmessageblock(this);
        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_enter.onDown.add(this.nextstorystep, this, null);

        game.add.tween(this.textroll).to({ y: -1000 }, 8000, Phaser.Easing.Linear.None, true);

        this.talkimage = game.add.image(0, 500, 'talk_front_1');
        this.talkimage.visible = false;

        this.enter_sound = game.add.audio('enter_sound');

        //input text
        game.add.plugin(PhaserInput.Plugin);
        this.name = game.add.bitmapText(200, 300, 'carrier_command', 'Enter Your Name: ', 32);
        this.name.anchor.setTo(0.5, 0.5);
        this.name.position.setTo(game.width / 2 + 40, 300);
        this.name.visible = false;

        if(!this.account){
            this.account = game.add.inputField(420, 400, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 300,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Name',
                type: PhaserInput.InputType.text
            });
            this.account.visible = false;
            this.account.setText(user_name);
        }else{
            this.account.visible = false;
            this.account.setText(user_name);
        }

        

        this.submit = game.add.button(350, 0, 'submit', this.SubmitOnClick, this);
        this.submit.anchor.setTo(0.5, 0.5);
        this.submit.position.setTo(game.width / 2, 500);
        this.submit.visible = false;
    },
    update: function () {
        if (this.storystep >= 5) {
            //ToNewPlace('house');
            this.messageimage.visible = false;
            this.talkimage.visible = false;
            this.account.visible = true;
            this.name.visible = true;
            this.submit.visible = true;
        }

        if (this.textroll.y <= -1000 && this.textroll.visible) {
            this.textroll.visible = false;
            this.Rollisend = true;
            this.messageimage.visible = true;
            this.talkimage.visible = true;
        }

        switch (this.storystep) {
            case 0:
                this.talkimage.loadTexture('talk_front_2');
                break;
            case 1:
                this.talkimage.loadTexture('talk_front_3');
                break;
            case 2:
                this.talkimage.loadTexture('talk_front_4');
                break;
            case 3:
                this.talkimage.loadTexture('talk_front_5');
                break;
            case 4:
                this.talkimage.loadTexture('talk_front_6');
                break;
        }

    },

    nextstorystep: function () {
        console.log('step: ' + this.storystep);
        if (this.Rollisend == true && this.messageimage.visible == true) {
            this.enter_sound.play();
            this.storystep += 1;
        } else if (this.storystep < 5) {

            this.textroll.visible = false;
            this.Rollisend = true;
            this.messageimage.visible = true;
            this.talkimage.visible = true;
        }
    },

    SubmitOnClick: function () {
        var input_id = this.account.domElement.id;
        //set user name
        if (input_id != "") user_name = document.getElementById(input_id).value;

        this.account.visible = false;
        ToNewPlace('house');
        //console.log(user_name);
    },
};