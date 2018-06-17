var rankState = {
    preload: function () {

    },
    create: function () {

        game.stage.backgroundColor = '#000000';
        
        var background = game.add.image(0, 0, 'background');
        background.height = game.height;
        background.width = game.width;

        this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enter.onDown.add(function(){
            this.enter_sound.play();
            ToNewPlace('menu');
        }, this);
        this.enter_sound = game.add.audio('enter_sound');
        this.enter_sound.volume = bgm_volumn;


        this.name_list = game.add.bitmapText(100, 100, 'carrier_command', 'Name', 32);
        this.score_list = game.add.bitmapText(450, 100, 'carrier_command', 'Score', 32);
        this.time_list = game.add.bitmapText(650, 100, 'carrier_command', 'Time', 32);

        //list top 5
        var top_list = [];
        var list_cur = 0;
        var max_number = 5;
        database.once('value')
            .then(function (snapshot) {
                snapshot.forEach(function (childshot) {
                    var data = childshot.val();
                    top_list.push({ name: data.name, score: data.score, time: data.time });
                });
            }).then(function () {
                top_list.sort(function (a, b) {
                    return b.score - a.score;
                });

                top_list.forEach(function (item, index, array) {
                    //console.log(item);

                    if (list_cur < max_number) {
                        game.add.bitmapText(100, 140 + list_cur * 45, 'carrier_command', item.name, 32);
                        game.add.bitmapText(450, 140 + list_cur * 45, 'carrier_command', item.score, 32);
                        game.add.bitmapText(650, 140 + list_cur * 45, 'carrier_command', item.time, 32);
                        list_cur += 1;
                    }

                });
            });
    },
    update :function(){

    },
}