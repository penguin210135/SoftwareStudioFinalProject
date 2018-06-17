var gameoverState = {
    preload: function () {

    },
    create: function () {

        game.stage.backgroundColor = '#000000';
        this.storystep = 0

        //msg
        createmessageblock(this);
        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_enter.onDown.add(this.nextstorystep, this, null);

        this.talkimage = game.add.image(0, 500, 'talk_die_1');
        this.messageimage.visible = true;

        this.enter_sound = game.add.audio('enter_sound');
        this.enter_sound.volume = bgm_volumn;

        senddata();
    },
    update: function () {
        if (this.storystep > 5) {
            ToNewPlace('menu');
        }

        switch (this.storystep) {
            case 0:
                this.talkimage.loadTexture('talk_die_1');
                break;
            case 1:
                this.talkimage.loadTexture('talk_die_2');
                break;
            case 2:
                this.talkimage.loadTexture('talk_die_3');
                break;
            case 3:
                this.talkimage.loadTexture('talk_die_4');
                break;
            case 4:
                this.talkimage.loadTexture('talk_die_5');
                break;
            case 5:
                this.talkimage.loadTexture('talk_die_6');
                break;
        }

    },

    nextstorystep: function () {
        console.log('step: ' + this.storystep);
        this.enter_sound.play();
        this.storystep += 1;
    }
};