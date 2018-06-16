var authorState = {
    preload: function () {

    },
    create: function () {

        game.stage.backgroundColor = '#000000';
        
        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        this.authorimage = game.add.image(0, 500, 'author');
        this.authorimage.anchor.setTo(0.5,0.5);
        this.authorimage.position.setTo(game.width / 2, game.height / 2);

        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enter.onDown.add(function(){
            this.enter_sound.play();
            ToNewPlace('menu');
        }, this);
        this.enter_sound = game.add.audio('enter_sound');
        this.enter_sound.volume = bgm_volumn;
    },
    update :function(){

    },
}