var townState = {
    preload: function () {

    },
    create: function () {

        //cursor input
        this.cursor = game.input.keyboard.createCursorKeys();
        //map
        this.createmap();
        //player 
        createplayer(this);
        //ui & button
        createiconbag(this);
        createiconmap(this);
        createclock(this);
        createfire(this);

        //NPC
        this.createNPC();
    },
    createmap: function () {
        this.town_map = game.add.tilemap('town_map');

        // 新增圖塊 addTilesetImage( '圖塊名稱' , 'load 時png的命名' )
        this.town_map.addTilesetImage('spritesheet1', 'tiles1');
        this.town_map.addTilesetImage('spritesheet2', 'tiles2');

        // 建立圖層 (圖層名稱為 tile 中所設定)
        this.map_collision = this.town_map.createLayer('collision');
        this.map_ground = this.town_map.createLayer('ground');
        this.map_road = this.town_map.createLayer('road');
        this.map_wall = this.town_map.createLayer('wall');
        this.map_house_top = this.town_map.createLayer('house_top');
        this.map_object = this.town_map.createLayer('object');

        this.town_map.setCollisionBetween(710, 720, true, this.map_collision);

    },

    createNPC: function () {
        this.dan = game.add.button(100, 100, 'icon_dandan', this.NPC_dan, this);
    },

    update: function () {

        game.physics.arcade.collide(this.player, this.map_collision);
        updateclock(this);
        updatefire(this);
        updatebag(this);

        if (game.time.now - this.player.movetime > 1000) {
            if (!this.BagOpen && !this.MapOpen ) moveplayer(this);
        }

        if (this.player.x <= 20 && this.player.y > 600 && this.player.y > 600) {
            if (this.cursor.down.isDown) {
                ToNewPlace('farm');
            }
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

    NPC_dan: function () {
        console.log("talk to dan");
    },
};