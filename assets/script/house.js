var houseState = {
    preload: function () {

    },
    create: function () {
        /*Default Init*/
        //game.world.resize(6000, 600);
        game.stage.backgroundColor = '#000000';
        //game.physics.setBoundsToWorld();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        //input
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;

        //map
        this.createmap();
        //player 
        createplayer(this);
        if (pre_state == "farm") {
            this.player.position.setTo(300, 580);
        } else if (pre_state == "forest") {

        }
       
        //ui & button
        createiconbag(this);
        createiconmap(this);
        createiconkitchen(this);
        createclock(this);
        createfire(this);

        //NPC
        this.messageimage = game.add.image(0, 500, 'msgblock_1');
        this.messageimage.height = 200;
        this.messageimage.width = game.width;
        this.messageimage.fixedToCamera = true;
        this.messageimage.alpha = 0;
        this.keyboard_T = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_T.onDown.add(this.communication, this, null);
        this.NpcOpen = false;
    },
    createmap: function () {
        //set the default background
        this.map = game.add.tilemap('house_map');

        // 新增圖塊 addTilesetImage( '圖塊名稱' , 'load 時png的命名' )
        this.map.addTilesetImage('tileset1', 'tiles1');
        this.map.addTilesetImage('tileset2', 'tiles2');
        this.map.addTilesetImage('tileset3', 'tiles3');
        this.map.addTilesetImage('tileset4', 'tiles4');

        // 建立圖層 (圖層名稱為 tile 中所設定)
        this.map_floor = this.map.createLayer('floor');
        this.map_wall = this.map.createLayer('wall');
        this.map_obj = this.map.createLayer('object');
        this.map_smallobj = this.map.createLayer('small object');

        this.map.setCollisionBetween(344, 350, true, this.map_wall);
        this.map.setCollisionBetween(371, 377, true, this.map_wall);
        this.map.setCollisionBetween(425, 431, true, this.map_wall);
        this.map.setCollisionBetween(452, 458, true, this.map_wall);
        this.map.setCollisionBetween(0, 441, true, this.map_obj);

    },

    update: function () {

        //game.physics.arcade.collide(this.player, this.wall);
        game.physics.arcade.collide(this.player, this.map_wall);
        game.physics.arcade.collide(this.player, this.map_obj);
        game.physics.arcade.collide(this.player, this.bound);

        updateclock(this.clock, this.arror, this.short_arror,this.time_show);
        updatefire(this.fire, this.fire_middle, this.fire_small, this.health_text);

        //player moving
        if (game.time.now - this.player.movetime > 1000) {
            if (!this.BagOpen && !this.MapOpen && !this.KitchenOpen && !this.NpcOpen) moveplayer(this.cursor, this.player);
        }

        if (this.player.x <= 400 && this.player.x >= 300 && this.player.y > 600) {
            if (this.cursor.down.isDown) {
                pre_state = game.state.current;
                game.state.start('farm');
            }
        }
    },

    BagOnClick: function () {

        if (this.BagOpen == false) {
            console.log('Open the Bag!');
            this.initOpen();
            this.BagOpen = true;
            game.world.bringToTop(this.bagimage);
            game.add.tween(this.bagimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

            //add button
            this.bagitem.visible = true;
            game.world.bringToTop(this.bagitem); 
            this.bagimage.events.onInputDown.add(BagFunction, this);
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
            game.world.bringToTop(this.mapimage);
            game.add.tween(this.mapimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            
            console.log(game.state.current);
            this.icon.visible = true;
            if (game.state.current != "house") this.map_icon_house.visible = true;
            if (game.state.current != "farm") this.map_icon_farm.visible = true;
            if (game.state.current != "forest") this.map_icon_forest.visible = true;
            if (game.state.current != "town") this.map_icon_town.visible = true;
            
            //this.map_icon_forest.visible = true;
            game.world.bringToTop(this.icon);
        } else {
            console.log('Close the Map!');
            this.initOpen();
        }
    },

    KitchenOpen:function(){
        if (this.BagOpen == false) {
            console.log('Open the Bag!');
            this.initOpen();
            this.BagOpen = true;
            game.world.bringToTop(this.bagimage);
            game.add.tween(this.bagimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

            //add button
            this.bagitem.visible = true;
            game.world.bringToTop(this.bagitem); 
            this.bagimage.events.onInputDown.add(BagFunction, this);
        } else {
            console.log('Close the Bag!');
            this.initOpen();
            this.bagimage.events.onInputDown.removeAll();
        }
    },

    initOpen: function () {
        this.MapOpen = false;
        this.BagOpen = false;
        this.NpcOpen = false;
       
        this.bagitem.visible = false;
        this.icon.visible = false;
        game.add.tween(this.bagimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.mapimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.messageimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    },

    communication: function (npc) {
        if (this.NpcOpen == false) {
            console.log("Talk with NPC!!");
            this.initOpen();
            this.NpcOpen = true;
            game.world.bringToTop(this.messageimage);
            game.add.tween(this.messageimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

            //add button

        } else {
            console.log('Close the Map!');
            this.initOpen();
        }
    },
};
