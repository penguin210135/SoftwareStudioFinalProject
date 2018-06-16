var townState = {
    preload: function () {

    },
    create: function () {
        
        game.stage.backgroundColor = '#000000';
        //game.physics.setBoundsToWorld();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        //input
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;

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

        createplayer(this);

        this.keyboard = game.input.keyboard.addKeys({
            'enter': Phaser.Keyboard.ENTER,
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT,
            'w': Phaser.Keyboard.W,
            'a': Phaser.Keyboard.A,
            's': Phaser.Keyboard.S,
            'd': Phaser.Keyboard.D
        });

         //ui & button
         createiconbag(this);
         createiconmap(this);
         createclock(this);
         createfire(this);
    },
    update: function () {

        game.physics.arcade.collide(this.player, this.map_collision);

        if (game.time.now - this.player.movetime > 1000) {
            moveplayer(this.cursor, this.player);
        }

        updateclock(this.clock, this.arror, this.short_arror, this.time_show);
        updatefire(this.fire, this.fire_middle, this.fire_small, this.health_text);

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

    initOpen: function () {
        this.MapOpen = false;
        this.BagOpen = false;
        //this.NpcOpen = false;
       
        this.bagitem.visible = false;
        this.icon.visible = false;
        game.add.tween(this.bagimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.mapimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        //game.add.tween(this.messageimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    },
};