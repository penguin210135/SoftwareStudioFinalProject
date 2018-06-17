var houseState = {
    preload: function () {

    },
    create: function () {

        //game.world.resize(6000, 600);
        //cursor input
        this.cursor = game.input.keyboard.createCursorKeys();
        //map
        this.createmap();
        //player 
        createplayer(this);
        //ui & button
        createiconbag(this);
        createiconmap(this);
        createiconkitchen(this);
        createclock(this);
        createfire(this);

        //msg
        createmessageblock(this);

        this.keyboard_T = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.keyboard_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keyboard_T.onDown.add(this.communication, this, null);

        this.createbed();

        if (!this.game_bgm) {
            this.game_bgm = game.add.audio('game_bgm');
            this.game_bgm.volumn = bgm_volumn;
            this.game_bgm.loop = true;
            this.game_bgm.play();
        }
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

    createbed: function () {
        this.bed = game.add.button(901, 177, 'icon_bed', this.sleep, this);
    },

    update: function () {

        //game.physics.arcade.collide(this.player, this.wall);
        game.physics.arcade.collide(this.player, this.map_wall);
        game.physics.arcade.collide(this.player, this.map_obj);
        game.physics.arcade.collide(this.player, this.bound);
        updateclock(this);
        updatefire(this);
        updatebag(this);
        forcetosleep();
        gameover();

        //player moving
        if (game.time.now - this.player.movetime > 1000) {
            if (!this.BagOpen && !this.MapOpen && !this.KitchenOpen && !this.NpcOpen) moveplayer(this);
        }

        if (this.player.x <= 400 && this.player.x >= 300 && this.player.y > 600) {
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

    KitchenOnClick: function () {
        if (this.KitchenOpen == false) {
            console.log(this.kitchen_icon);
            this.initOpen();

            this.KitchenOpen = true;
            this.kitchen_icon.visible = true;
            this.kitchenimage.inputEnabled = true;
            game.world.bringToTop(this.kitchenimage);
            game.world.bringToTop(this.kitchen_icon);
            game.add.tween(this.kitchenimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        } else {
            console.log('Close the Bag!');
            this.initOpen();

        }
    },
    KitchenButton: function () {
        if (this.KitchenOpen == false && this.player.x >= this.kitchen.x - 50 && this.player.x <= this.kitchen.x + 50 && this.player.y >= this.kitchen.y - 50 && this.player.y <= this.kitchen.y + 50) {
            console.log(this.kitchen_icon);
            this.initOpen();

            this.KitchenOpen = true;
            this.kitchen_icon.visible = true;
            this.kitchenimage.inputEnabled = true;
            game.world.bringToTop(this.kitchenimage);
            game.world.bringToTop(this.kitchen_icon);
            game.add.tween(this.kitchenimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        } else {
            console.log('Close the Bag!');
            this.initOpen();

        }
    },
    putStufftoCom: function (key, type, index, scale) {
        if (this.click_btn_cook == false) {
            if (bag_list[type][index] != 0) {
                console.log(key);
                this.count += 1;
                switch (type) {
                    case 0:
                        this.composeIngredient[0] = key;
                        this.composeindex[0] = index;
                        if (compose_index[0] == 0) {
                            this.compose0 = game.add.image(845, 240, key);
                            this.compose0.scale.setTo(scale, scale);
                            compose_index[0] = 1;
                        }
                        else {
                            this.compose0.loadTexture(key, 0);
                            this.compose0.scale.setTo(scale, scale);
                        }
                        break;
                    case 1:
                        this.composeIngredient[1] = key;
                        this.composeindex[1] = index;
                        if (compose_index[1] == 0) {
                            if (key == 'fish_4') this.compose1 = game.add.image(845, 353, key);
                            else this.compose1 = game.add.image(840, 347, key);
                            this.compose1.scale.setTo(scale, scale);
                            compose_index[1] = 1;
                        }
                        else {
                            if (key == 'fish_4') this.compose1.position.setTo(845, 353);
                            else this.compose1.position.setTo(840, 347);
                            this.compose1.loadTexture(key, 0);
                            this.compose1.scale.setTo(scale, scale);
                        }
                        break;
                    case 2:
                        this.composeIngredient[2] = key;
                        this.composeindex[2] = index;
                        if (compose_index[2] == 0) {
                            if (key == 'grass_3') {
                                this.compose2 = game.add.image(850, 433, key);
                            }
                            else if (key == 'moneyseed_1') {
                                this.compose2 = game.add.image(850, 433, key);
                            }
                            else this.compose2 = game.add.image(840, 453, key);
                            this.compose2.scale.setTo(scale, scale);
                            compose_index[2] = 1;
                        }
                        else {
                            if (key == 'grass_3') {
                                this.compose2.position.setTo(850, 433);
                            }
                            else if (key == 'moneyseed_1') {
                                this.compose2.position.setTo(850, 433);
                            }
                            else this.compose2.position.setTo(840, 453);
                            this.compose2.loadTexture(key, 0);
                            this.compose2.scale.setTo(scale, scale);
                        }
                        break;
                }
            }
        }

    },
    cookResult: function () {
        if (this.click_btn_cook == false && this.count == 3) {
            console.log(this.composeIngredient);
            if (this.composeIngredient[0] == 'fish_3' && this.composeIngredient[1] == 'meat_dragon' && this.composeIngredient[2] == 'egg') {
                this.dish = game.add.button(1015, 345, 'dish3', function () { this.eat('dish3') }, this);
                this.dish.scale.setTo(1.2, 1.2);
            }
            else {
                num = game.rnd.integerInRange(0, 1);
                if (num == 0) {
                    this.dish = game.add.button(1010, 335, 'dish1', function () { this.eat('dish1') }, this);
                    this.dish.scale.setTo(1.4, 1.4);
                }
                else {
                    this.dish = game.add.button(1010, 335, 'dish2', function () { this.eat('dish2') }, this);
                    this.dish.scale.setTo(1.4, 1.4);
                }
            }
            game.world.bringToTop(this.dish);
            this.click_btn_cook = true;
            bag_list[0][this.composeindex[0]] -= 1;
            bag_list[1][this.composeindex[1]] -= 1;
            bag_list[2][this.composeindex[2]] -= 1;
        }
        console.log(bag_list);
    },
    eat: function (key) {
        this.initOpen();
        game.add.tween(this.kitchenimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.dish).to({ x: 1070, y: 50 }, 700).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None).start();
        //life++
        switch (key) {
            case "dish1":
                lifetime += 50;
                if (player_health + 30 <= 100) {
                    player_health += 30;
                }

                break;
            case "dish2":
                lifetime += 100;
                if (player_health + 10 <= 100) {
                    player_health += 10;
                }
                break;
            case "dish3":
                ToNewPlace('gamewin');
                break;
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

        this.KitchenOpen = false;
        this.kitchenimage.inputEnabled = false;
        game.add.tween(this.kitchenimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        game.add.tween(this.messageimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        this.NpcOpen = false;
        this.kitchen_icon.visible = false;

        if (this.dish != undefined && this.count != 3) this.dish.destroy();
        if (this.compose0 != undefined) this.compose0.destroy();
        if (this.compose1 != undefined) this.compose1.destroy();
        if (this.compose2 != undefined) this.compose2.destroy();
        compose_index = [0, 0, 0];
        this.click_btn_cook = false;
        this.composeindex = [{ type: 0, index: 0 }, { type: 0, index: 0 }, { type: 0, index: 0 }];
        this.count = 0;
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

    sleep: function () {
        if (this.player.x >= this.bed.x - 50 && this.player.x <= this.bed.x + 50 && this.player.y >= this.bed.y - 50 && this.player.y <= this.bed.y + 50) {
            ToNewPlace('sleep');
            ConsumeTime(0, 60);
            player_health = 100;
        } 
    },
};
