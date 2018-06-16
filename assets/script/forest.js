var forestState = {
    preload: function () {

    },
    create: function () {

        var background = game.add.image(0, 0, 'forest_background');
        background.height = game.height;
        background.width = game.width;

        //cursor input
        this.cursor = game.input.keyboard.createCursorKeys();
        //map
        //this.createmap();
        //player 
        createplayer(this);
        //ui & button
        createiconbag(this);
        createiconmap(this);
        createclock(this);
        createfire(this);

        this.player_prex = this.player.position.x;
        this.player_prey = this.player.position.y;
        this.temp = 100;

        this.enterbattle = game.add.audio('enterbattle');

    },

    update: function () {

        game.physics.arcade.collide(this.player, this.map_tree);
        updateclock(this);
        updatefire(this);
        updatebag(this);

        if (this.temp != 0) {
            if (!this.BagOpen && !this.MapOpen) moveplayer(this);
        }

        if (this.player_prex != this.player.position.x || this.player_prey != this.player.position.y) {
            this.player_prex = this.player.position.x;
            this.player_prey = this.player.position.y;
            player_x = this.player.position.x;
            player_y = this.player.position.y;
            this.fight_random();
        }
        if (this.player.x >= 1120) {
            if (this.cursor.right.isDown) {
                ToNewPlace('farm');
            }
        }
    },
    fight_random: function () {
        this.temp = Math.floor(Math.random() * 200);
        if (this.temp == 0) {
            this.enterbattle.play();
            game.camera.shake(0.02, 300);
            ConsumeTime(10, 50);
            player_x = this.player.x;
            player_y = this.player.y;
            game.time.events.add(500, function () {
                game.state.start('fight');
            }, this);

        }
    },
    BagOnClick: function () {

        if (this.BagOpen == false) {
            console.log('Open the Bag!');
            this.initOpen();

            this.BagOpen = true;
            this.bagimage.inputEnabled = true;
            this.bagitem.visible = true;
            game.world.bringToTop(this.bagimage);
            game.world.bringToTop(this.bagitem);
            game.add.tween(this.bagimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

            //add button
            //this.bagimage.events.onInputDown.add(BagFunction, this);
        } else {
            console.log('Close the Bag!');
            this.initOpen();
            this.bagimage.events.onInputDown.removeAll();
        }
    },

    MapOnClick: function () {
        if (this.MapOpen == false) {
            console.log('Open the Map!');
            this.initOpen();
            this.MapOpen = true;
            this.icon.visible = true;
            game.world.bringToTop(this.mapimage);
            game.world.bringToTop(this.icon);
            game.add.tween(this.mapimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

            if (game.state.current != "house") this.map_icon_house.visible = true;
            if (game.state.current != "farm") this.map_icon_farm.visible = true;
            if (game.state.current != "forest") this.map_icon_forest.visible = true;
            if (game.state.current != "town") this.map_icon_town.visible = true;

            //this.map_icon_forest.visible = true;

        } else {
            console.log('Close the Map!');
            this.initOpen();
        }
    },

    initOpen: function () {
        this.MapOpen = false;
        this.BagOpen = false;
        this.mapimage.inputEnabled = false;
        this.bagimage.inputEnabled = false;
        this.bagitem.visible = false;
        this.icon.visible = false;
        game.add.tween(this.bagimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.mapimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

    },
};