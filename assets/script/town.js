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
        createmessageblock(this);
        this.createNPC();

        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_enter.onDown.add(this.nextstorystep, this, null);

        this.storystep = -1;
        this.enter_sound = game.add.audio('enter_sound');
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
        this.dan = game.add.button(100, 320, 'npc_dan', this.NPC_dan, this);
        this.gugu = game.add.button(300, 140, 'npc_gugu', this.NPC_gugu, this);
        this.seed = game.add.button(500, 140, 'npc_seed', this.NPC_seed, this);

        this.talkimage = game.add.image(0, 500, 'talk_dan_1');

        this.talkimage.visible = false;

        this.Talktodan = false;
        this.Talktogugu = false;
        this.Talktoseed = false;
    },

    update: function () {

        game.physics.arcade.collide(this.player, this.map_collision);
        updateclock(this);
        updatefire(this);
        updatebag(this);
        forcetosleep();
        gameover()

        this.updatemsg();

        if (game.time.now - this.player.movetime > 1000) {
            if (!this.BagOpen && !this.MapOpen && !this.Talktodan && !this.Talktogugu && !this.Talktoseed) moveplayer(this);
        }

        if (this.player.x <= 20 && this.player.y > 520 && this.player.y <= 560) {
            if (this.cursor.left.isDown) {
                ToNewPlace('farm');
            }
        }

    },

    updatemsg: function () {

        if (this.Talktodan) {
            switch (this.storystep) {
                case 0:
                    this.talkimage.loadTexture('talk_dan_1');
                    break;
                case 1:
                    this.talkimage.loadTexture('talk_dan_2');
                    break;
                case 2:
                    this.talkimage.loadTexture('talk_dan_3');
                    break;
                case 3:
                    this.talkimage.loadTexture('talk_dan_4');
                    break;
                case 4:
                    this.talkimage.loadTexture('talk_dan_5');
                    break;
            }
        }
        if (this.Talktogugu) {
            switch (this.storystep) {
                case 0:
                    this.talkimage.loadTexture('talk_gugu_1');
                    break;
                case 1:
                    this.talkimage.loadTexture('talk_gugu_2');
                    break;
                case 2:
                    this.talkimage.loadTexture('talk_gugu_3');
                    break;
                case 3:
                    this.talkimage.loadTexture('talk_gugu_4');
                    break;
                case 4:
                    this.talkimage.loadTexture('talk_gugu_5');
                    break;
                case 5:
                    this.talkimage.loadTexture('talk_gugu_6');
                    break;
            }
        }
        if (this.Talktoseed) {
            switch (this.storystep) {
                case 0:
                    this.talkimage.loadTexture('talk_seed_1');
                    break;
                case 1:
                    this.talkimage.loadTexture('talk_seed_2');
                    break;
                case 2:
                    this.talkimage.loadTexture('talk_seed_3');
                    break;
                case 3:
                    this.talkimage.loadTexture('talk_seed_4');
                    break;
                case 4:
                    this.talkimage.loadTexture('talk_seed_5');
                    break;
            }
        }
    },

    BagOnClick: function () {

        if (this.BagOpen == false && !(this.Talktodan || this.Talktogugu || this.Talktoseed)) {
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
        if (this.MapOpen == false && !(this.Talktodan || this.Talktogugu || this.Talktoseed)) {
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
        if (this.player.x >= this.dan.x - 50 && this.player.x <= this.dan.x + 50 && this.player.y >= this.dan.y - 50 && this.player.y <= this.dan.y + 50) {
            console.log("talk to dan");
            this.Talktodan = true;
            this.messageimage.visible = true;
            this.talkimage.visible = true;
            this.storystep = 0;
        }
    },

    NPC_gugu: function () {
        if (this.player.x >= this.gugu.x - 50 && this.player.x <= this.gugu.x + 50 && this.player.y >= this.gugu.y - 50 && this.player.y <= this.gugu.y + 50) {
            console.log("talk to gugu");
            this.Talktogugu = true;
            this.messageimage.visible = true;
            this.talkimage.visible = true;
            this.storystep = 0;
        }
    },
    NPC_seed: function () {
        if (this.player.x >= this.seed.x - 50 && this.player.x <= this.seed.x + 50 && this.player.y >= this.seed.y - 50 && this.player.y <= this.seed.y + 50) {
            console.log("talk to seed");
            this.Talktoseed = true;
            this.messageimage.visible = true;
            this.talkimage.visible = true;
            this.storystep = 0;
        }
    },

    nextstorystep: function () {
        console.log('step: ' + this.storystep);
        if (this.Talktodan) {
            if (this.storystep > 4) {
                this.messageimage.visible = false;
                this.talkimage.visible = false;
                this.Talktodan = false;
                this.storystep = -1;
                ConsumeTime(5, 0);
            }
            else{
                this.enter_sound.play();
                this.storystep += 1;
            } 
        } else if (this.Talktogugu) {
            if (this.storystep > 5) {
                this.messageimage.visible = false;
                this.talkimage.visible = false;
                this.Talktogugu = false;
                this.storystep = -1;
                ConsumeTime(5, 0);
            }
            else{
                this.enter_sound.play();
                this.storystep += 1;
            } 
        } else if (this.Talktoseed) {
            if (this.storystep > 4) {
                this.messageimage.visible = false;
                this.talkimage.visible = false;
                this.Talktoseed = false;
                this.storystep = -1;
                ConsumeTime(5, 0);
            } else if (this.storystep == 3) {
                var flag = 0;
                if (seed_list[0][0] == 0) {
                    seed_list[0][0] += 5;
                    flag = 1;
                } else if (seed_list[0][1] == 0) {
                    seed_list[0][1] += 5;
                    flag = 1;
                }

                if (flag == 0) {
                    this.enter_sound.play();
                    this.storystep += 1;
                } else {
                    this.messageimage.visible = false;
                    this.talkimage.visible = false;
                    this.Talktoseed = false;
                    this.storystep = -1;
                    ConsumeTime(5, 0);
                }
            }
            else{
                this.enter_sound.play();
                this.storystep += 1;
            } 
        }
    },
};