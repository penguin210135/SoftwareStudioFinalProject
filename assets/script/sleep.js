var sleepState = {
    preload: function () {

    },
    create: function () {

        game.stage.backgroundColor = '#000000';

        //msg
        createmessageblock(this);
        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_enter.onDown.add(this.nextstorystep, this, null);

        this.messageimage.visible = true;
        this.talkimage = game.add.image(0, 500, 'talk_sleep');
    },
    update: function () {

    },

    nextstorystep: function () {
        ToNewPlace('house');
    },
};