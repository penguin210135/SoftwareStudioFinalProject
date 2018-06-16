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
    },
    update: function () {
        if (this.storystep >= 5) {
            ToNewPlace('house');
        }

        if (this.textroll.y <= -1000) {
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
        if (this.Rollisend == true) {
            this.enter_sound.play();
            this.storystep += 1;
        }else {
            this.textroll.visible = false;
            this.Rollisend = true;
            this.messageimage.visible = true;
            this.talkimage.visible = true;
        }
    }
};