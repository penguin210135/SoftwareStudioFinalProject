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

        //set the default background
        this.map = this.game.add.tilemap('map');

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

        //player
        this.player = game.add.sprite(game.width / 2, game.height / 2, 'player');
        this.player.animations.add('down', [0, 4, 8], 8);    //player animations
        this.player.animations.add('up', [2, 6, 10], 8);
        this.player.animations.add('left', [3, 7, 11], 8);
        this.player.animations.add('right', [1, 5, 9], 8);
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(32, 32, 0, 0);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.movetime = game.time.now;
        this.game.camera.follow(this.player);

        //Timer

        //Add button and set hot key
        //bag
        this.bagimage = game.add.image(200, 100, 'bag');
        this.bagimage.height = game.height - 100;
        this.bagimage.width = game.width - 200;
        this.bagimage.fixedToCamera = true;
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
        this.mapimage = game.add.image(200, 100, 'background');
        this.mapimage.height = game.height - 100;
        this.mapimage.width = game.width - 200;
        this.mapimage.fixedToCamera = true;
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

        //NPC
        this.messageimage = game.add.image(0, 500, 'msgblock_1');
        this.messageimage.height = 200;
        this.messageimage.width = game.width;
        this.messageimage.fixedToCamera = true;
        this.messageimage.alpha = 0;
        this.keyboard_T = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.keyboard_T.onDown.add(this.communication, this, null);
        this.NpcOpen = false;
    },

    update: function () {

        //game.physics.arcade.collide(this.player, this.wall);
        game.physics.arcade.collide(this.player, this.map_wall);
        game.physics.arcade.collide(this.player, this.map_obj);
        game.physics.arcade.collide(this.player, this.bound);

        //Bag open
        if (this.BagOpen) {
            if (game.input.mousePointer.x <= 1160 && game.input.mousePointer.x >= 200 && game.input.mousePointer.y >= 100 && game.input.mousePointer.y <= 720) {
                if (game.input.activePointer.leftButton.isDown) {
                    console.log("Use the bag!!");
                }
            } else {
                if (game.input.activePointer.leftButton.isDown) {
                    //click outside the bag,then close the bag
                    this.BagOnClick();
                }
            }

        } else if (this.MapOpen) {
            if (game.input.mousePointer.x <= 1160 && game.input.mousePointer.x >= 200 && game.input.mousePointer.y >= 100 && game.input.mousePointer.y <= 720) {
                if (game.input.activePointer.leftButton.isDown) {
                    console.log("Use the Map!!");
                }
            } else {
                if (game.input.activePointer.leftButton.isDown) {
                    //click outside the map,then close the map
                    this.MapOnClick();
                }
            }
        } else if (this.KitchenOpen) {
            if (game.input.mousePointer.x <= 1160 && game.input.mousePointer.x >= 200 && game.input.mousePointer.y >= 100 && game.input.mousePointer.y <= 720) {
                if (game.input.activePointer.leftButton.isDown) {
                    console.log("Use the Kitchen!!");
                }
            } else {
                if (game.input.activePointer.leftButton.isDown) {
                    //click outside the map,then close the map
                    //this.MapOnClick();
                }
            }
        }
        //player moving
        if (game.time.now - this.player.movetime > 1000) {
            if (!this.BagOpen && !this.MapOpen && !this.KitchenOpen && !this.NpcOpen) this.moveplayer();
        }
    },

    moveplayer: function () {

        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        } else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        } else if (this.cursor.up.isDown) {
            this.player.body.velocity.y = -200;
            this.player.animations.play('up');
        } else if (this.cursor.down.isDown) {
            this.player.body.velocity.y = 200;
            this.player.animations.play('down');
        } else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.animations.stop();
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

        } else {
            console.log('Close the Bag!');
            this.initOpen();

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

        } else {
            console.log('Close the Map!');
            this.initOpen();
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

};
