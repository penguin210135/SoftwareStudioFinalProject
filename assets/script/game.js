var mainState = {
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
        if(pre_state == "farm"){
            this.player.position.setTo(300,580);
        }else if(pre_state == "forest"){

        }
        //
        this.createbutton();
        
        //ui & button
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

    createbutton: function () {
        //Add button and set hot key
        //bag
        this.bagimage = game.add.image(600, 200, 'bag_0');
        this.bagimage.fixedToCamera = true;
        this.bagimage.inputEnabled = true;
        this.bagimage.alpha = 0;
        this.bagbutton = game.add.button(1160 - 250, 720 - 100, 'Bag', this.BagOnClick, this);
        this.bagbutton.fixedToCamera = true;
        this.bagbutton.height = 100;
        this.bagbutton.width = 100;
        game.add.bitmapText(1160 - 200, 720 - 50, 'carrier_command', 'B', 32);
        this.keyboard_B = game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.keyboard_B.onDown.add(this.BagOnClick, this);
        this.BagOpen = false;
        //map
        this.mapimage = game.add.image(600, 200, 'background');
        this.mapimage.fixedToCamera = true;
        this.mapimage.inputEnabled = true;
        this.mapimage.alpha = 0;
        this.mapbutton = game.add.button(1160 - 100, 720 - 100, 'Map', this.MapOnClick, this);
        this.mapbutton.fixedToCamera = true;
        this.mapbutton.height = 100;
        this.mapbutton.width = 100;
        game.add.bitmapText(1160 - 50, 720 - 50, 'carrier_command', 'M', 32);
        this.keyboard_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.keyboard_M.onDown.add(this.MapOnClick, this);
        this.MapOpen = false;
        //kitchen
        this.kitchenbutton = game.add.button(1160 - 400, 720 - 100, 'Map', this.MapOnClick, this);
        this.kitchenbutton.fixedToCamera = true;
        this.kitchenbutton.height = 100;
        this.kitchenbutton.width = 100;
        game.add.bitmapText(1160 - 350, 720 - 50, 'carrier_command', 'K', 32);
        this.keyboard_K = game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.keyboard_K.onDown.add(this.MapOnClick, this);
        this.KitchenOpen = false;
    },

    update: function () {

        //game.physics.arcade.collide(this.player, this.wall);
        game.physics.arcade.collide(this.player, this.map_wall);
        game.physics.arcade.collide(this.player, this.map_obj);
        game.physics.arcade.collide(this.player, this.bound);

        updateclock(this.clock,this.arror,this.short_arror);
        updatefire(this.fire,this.fire_middle,this.fire_small,this.health_text);

        //player moving
        if (game.time.now - this.player.movetime > 1000) {
            if (!this.BagOpen && !this.MapOpen && !this.KitchenOpen && !this.NpcOpen) moveplayer(this.cursor,this.player);
        }

        if (this.player.x <= 400 && this.player.x >= 300 && this.player.y > 600) {
            if(this.cursor.down.isDown){
                pre_state = "main";
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
            this.bagimage.events.onInputDown.add(this.BagFunction, this);
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

            //add button
            this.mapimage.events.onInputDown.add(this.MapFunction, this);
        } else {
            console.log('Close the Map!');
            this.initOpen();
            this.mapimage.events.onInputDown.removeAll();
        }
    },

    initOpen: function () {
        this.MapOpen = false;
        this.BagOpen = false;
        this.NpcOpen = false;
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
    BagFunction: function () {
        console.log("Use the Bag!!");
    },
    MapFunction: function () {
        console.log("Use the Map!!");
        pre_state = "main";
        game.state.start('forest');
    },
};
