var farmState = {
    preload: function () {

    },
    create: function () {
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;

        this.farm_bg = game.add.image(0, 0, 'farm_bg');
        this.house = game.add.image(800, 125, 'house');

        this.pond = game.add.button(0, 306, 'pond', this.showFishMenu, this, 2, 1, 0);
        this.pond1 = game.add.button(0, 585, 'pond1', this.showFishMenu, this, 2, 1, 0);
        this.trees = game.add.sprite(10, 20, 'trees');
        this.tree = game.add.sprite(50, 230, 'tree');
        this.tree1 = game.add.sprite(130, 180, 'tree');
        this.tree2 = game.add.sprite(230, 70, 'tree');
        this.cut = game.add.sprite(200, 130, 'cut');
        this.cut1 = game.add.sprite(250, 200, 'cut1');

        //ui & button
        createiconbag(this);
        createiconmap(this);
        createclock(this);
        createfire(this);

        this.fields_xy = [{ x: 450, y: 330 }, { x: 550, y: 330 }, { x: 650, y: 330 }, { x: 450, y: 430 }, { x: 550, y: 430 }, { x: 650, y: 430 }];
        this.btn_seed = [0, 0, 0, 0, 0, 0, 0, 0];
        this.field = [0, 0, 0, 0, 0, 0];
        this.createField();
        plant = game.add.group();

        this.fields_time_show = game.add.text(30, 30, 'life: ', { font: '15px Arial', fill: '#ffffff' });
        this.fields_time_show.visible = false;
        //this.fields_time_show.visible = false;

        //this.fishing = game.add.button(260, 500, 'fishing_ani', this.goFish, this, 2, 1, 0);
        this.fishing = game.add.sprite(260, 500, 'fishing_ani');
        this.fishing.scale.setTo(1.2, 1.2);
        this.fishing.animations.add('fishing_ani', [0, 1, 2, 3], 5, true);
        this.fishing.visible = false;
        this.fish_gone = game.add.sprite(100, 400, 'fish_gone');
        this.fish_gone.animations.add('fish_gone_ani', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 8, true).play();
        this.fish_gone.scale.setTo(0.6, 0.6);
        this.fish_gone.visible = false;

        this.btn_seed_index = -1;
        this.fish_step = 0;

        this.createGroupSeed();
        this.createFishMenu();

        createplayer(this);


        this.fishopen = false;
        this.seedopen = false;

        this.replantPlant();
    },
    update: function () {
        if (game.time.now - this.player.movetime > 1000) {
            moveplayer(this.cursor, this.player);
        }

        //game.physics.arcade.collide(this.player, this.cushions);
        this.updatetmp();
        updateclock(this.clock, this.arror, this.short_arror, this.time_show);
        updatefire(this.fire, this.fire_middle, this.fire_small, this.health_text);

        //move to house
        if (this.player.position.x >= 820 && this.player.position.x <= 840 && this.player.position.y <= 290 && this.player.position.y >= 270) {
            if (this.cursor.up.isDown) {
                ToNewPlace('house');
            }
        }
        //move to town
        if (this.player.position.x >= 1120 && this.player.position.y <= 600 && this.player.position.y >= 550) {
            if (this.cursor.right.isDown) {
                ToNewPlace('town');
            }
        }
        //move to forest
        if (this.player.position.x <= 200 && this.player.position.y <= 350) {
            ToNewPlace('forest');
        }
    },

    createField: function () {
        this.field[0] = game.add.button(450, 330, 'field', function () { this.showSeed(0) }, this, 2, 1, 0);
        this.field[1] = game.add.button(550, 330, 'field', function () { this.showSeed(1) }, this, 2, 1, 0);
        this.field[2] = game.add.button(650, 330, 'field', function () { this.showSeed(2) }, this, 2, 1, 0);
        this.field[3] = game.add.button(450, 430, 'field', function () { this.showSeed(3) }, this, 2, 1, 0);
        this.field[4] = game.add.button(550, 430, 'field', function () { this.showSeed(4) }, this, 2, 1, 0);
        this.field[5] = game.add.button(650, 430, 'field', function () { this.showSeed(5) }, this, 2, 1, 0);
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
    },

    createGroupSeed: function () {
        this.group_seed = game.add.group();
        this.group_seed.inputEnableChildren = true;
        this.box_seed = game.add.sprite(0, 0, 'box_seed');
        this.box_seed.scale.setTo(0.5, 0.5);
        this.group_seed.add(this.box_seed);
        this.group_seed.visible = false;
    },

    createFishMenu: function () {
        this.fishMenu = game.add.group();
        this.fishMenuBox = game.add.image(0, 520, 'fishMenu');
        this.fishMenuBox.scale.setTo(0.4, 0.4);
        this.askingText = game.add.text(55, 560, 'Would you like to go fishing?', { font: '30px Arial', fill: '#000000' });
        this.yesText = game.add.text(55, 630, 'Yes', { font: '30px Arial', fill: '#000000' });
        this.noText = game.add.text(255, 630, 'No', { font: '30px Arial', fill: '#000000' });
        this.yesText.inputEnabled = true;
        this.noText.inputEnabled = true;
        this.yesText.events.onInputDown.add(this.playFish_ani, this);
        this.noText.events.onInputDown.add(this.closeFishMenu, this);
        this.fishMenu.add(this.fishMenuBox);
        this.fishMenu.add(this.askingText);
        this.fishMenu.add(this.yesText);
        this.fishMenu.add(this.noText);
        this.fishMenu.visible = false;

        this.fishResult = game.add.group();
        this.fishResultBox = game.add.button(570, 330, 'treasureBox', this.closeFishResult, this, 2, 1, 0);
        this.fish = game.add.image(510, 280, 'fish_0');
        this.fishResultBox.scale.setTo(0.1, 0.1);
        this.fishResultBox.anchor.setTo(0.5, 0.5);
        this.fish.anchor.setTo(0.5, 0.5);
        //this.btn_closeFishResult = game.add.button(700, 300, 'btn_close', this.closeFishResult, this, 2, 1, 0);
        //this.btn_closeFishResult.scale.setTo(0.05, 0.05);
        this.fail = game.add.sprite(600, 350, 'fail');
        this.fail.scale.setTo(0.1, 0.1);
        this.fail.anchor.setTo(0.5, 0.5);
        this.fail.visible = false;
        this.fishResult.add(this.fishResultBox);
        this.fishResult.add(this.fish);
        //this.fishResult.add(this.btn_closeFishResult);
        this.fishResult.visible = false;

    },

    showSeed: function (index) {

        if (this.fish_step == 0)  {
            if (this.seedopen && this.fields_xy[index].x - 80 == this.box_seed.position.x && this.fields_xy[index].y - 110 == this.box_seed.position.y) {   //按第二下同個位子
                this.initOpen();
            }
            else {
                if (this.fishopen == true) {
                    this.initOpen();
                }
                if (fields[1][index] == 0) {
                    if (this.btn_seed_index == -1) {
                        this.box_seed = game.add.sprite(0, 0, 'box_seed');
                        this.btn_seed[0] = game.add.button(this.fields_xy[index].x - 65, this.fields_xy[index].y - 126, 'grass_0', function () { this.createPlant(index, 'grass_0') }, this, 2, 1, 0);
                        this.btn_seed[1] = game.add.button(this.fields_xy[index].x - 10, this.fields_xy[index].y - 143, 'moneyseed_0', function () { this.createPlant(index, 'moneyseed_0') }, this, 2, 1, 0);
                    }else{
                        this.btn_seed[0].destroy();
                        this.btn_seed[1].destroy();
                        this.btn_seed[0] = game.add.button(this.fields_xy[index].x - 65, this.fields_xy[index].y - 126, 'grass_0', function () { this.createPlant(index, 'grass_0') }, this, 2, 1, 0);
                        this.btn_seed[1] = game.add.button(this.fields_xy[index].x - 10, this.fields_xy[index].y - 143, 'moneyseed_0', function () { this.createPlant(index, 'moneyseed_0') }, this, 2, 1, 0);
                    }

                    this.box_seed.scale.setTo(0.5, 0.5);
                    this.btn_seed[0].scale.setTo(0.6, 0.6);
                    this.btn_seed[1].scale.setTo(0.6, 0.6);

                    this.btn_seed_index = index;

                    //change position
                    this.box_seed.position.setTo(this.fields_xy[index].x - 80, this.fields_xy[index].y - 110);
                } else {

                    plant.forEachAlive(function (items) {
                        if (items.index == index && items.state == 4) {
                            this.harvest(items);
                        }
                    }, this);


                }
                this.seedopen = true;
            }
        }
    },
    createPlant: function (index, key) {
        console.log(index + " " + key);

        fields[1][index] = 1;
        fields[0][index] = key;
        fields[2][index] = game.time.now;

        if (key == 'grass_0') {
            console.log(index + " " + key);
            var tmp_plant = game.add.sprite(this.fields_xy[index].x + 20, this.fields_xy[index].y - 10, 'grass_0');
        }
        else if (key == 'moneyseed_0') {
            var tmp_plant = game.add.sprite(this.fields_xy[index].x + 20, this.fields_xy[index].y - 25, 'moneyseed_0');
        }
        tmp_plant.inputEnabled = true;
        tmp_plant.events.onInputOver.add(function () { this.plantInputOver(index) }, this);
        tmp_plant.events.onInputOut.add(function () { this.plantInputOut(index) }, this);
        tmp_plant.scale.setTo(0.5, 0.5);
        tmp_plant.time = game.time.now;
        tmp_plant.state = 1;
        tmp_plant.index = index;
        tmp_plant.key = key;
        plant.add(tmp_plant);

        this.btn_seed[0].destroy();
        this.btn_seed[1].destroy();
        this.box_seed.destroy();
        this.btn_seed_index = -1;

        ConsumeTime(10, 50);
    },
    /*killPlant: function (index) {
        this.plant[index].state = 0;
        this.field[index].events.onInputDown.removeAll();
        this.fields_time[index] = -1;
        this.grass[index].destroy();
        this.btn_plant[index].destroy();
        this.btn_killPlant[index].destroy();
    },*/
    harvest: function (item) {

        var index = item.index;
        fields[1][index] = 0;

        if (item.key == 'grass_3') {
            bag_list[0][0] += 5;
            grassHarvest = game.add.sprite(this.fields_xy[index].x - 10, this.fields_xy[index].y - 40, 'grass_3');
            grassHarvest.scale.setTo(0.3, 0.3);
            harvestText = game.add.text(this.fields_xy[index].x + 10, this.fields_xy[index].y - 20, '+5', { font: '15px Arial', fill: '#ffffff' });
            game.add.tween(grassHarvest).to({ y: this.fields_xy[index].y - 50 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
            game.add.tween(harvestText).to({ y: this.fields_xy[index].y - 30 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
        }
        else if (item.key == 'moneyseed_3') {
            bag_list[0][1] += 5;
            grassHarvest = game.add.sprite(this.fields_xy[index].x - 10, this.fields_xy[index].y - 40, 'moneyseed_3');
            grassHarvest.scale.setTo(0.3, 0.3);
            harvestText = game.add.text(this.fields_xy[index].x + 10, this.fields_xy[index].y - 30, '+5', { font: '15px Arial', fill: '#ffffff' });
            game.add.tween(grassHarvest).to({ y: this.fields_xy[index].y - 50 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
            game.add.tween(harvestText).to({ y: this.fields_xy[index].y - 40 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
        }

        item.destroy();
    },

    updatetmp: function () {
        plant.forEachAlive(function (items) {
            if (items.time + 3000 < game.time.now) {
                if (items.state < 4) {
                    items.time = game.time.now;
                    items.state += 1;
                    fields[2][items.index] = game.time.now;
                    fields[1][items.index] = items.state;
                }
            }

            switch (items.state) {
                case 0:
                    items.destroy();
                    break;
                case 1:
                    break;
                case 2:
                    if (items.key == 'grass_0') {
                        items.loadTexture('grass_1', 0);
                        console.log(items.index);
                        items.position.x = this.fields_xy[items.index].x + 15;
                        items.position.y = this.fields_xy[items.index].y - 25;
                    }
                    else if (items.key == 'moneyseed_0') items.loadTexture('moneyseed_1', 0);
                    break;
                case 3:
                    if (items.key == 'grass_1') items.loadTexture('grass_2', 0);
                    else if (items.key == 'moneyseed_1') items.loadTexture('moneyseed_2', 0);
                    break;
                case 4:
                    if (items.key == 'grass_2') items.loadTexture('grass_3', 0);
                    else if (items.key == 'moneyseed_2') items.loadTexture('moneyseed_3', 0);
                    break;
                /*case 4:
                    items.loadTexture('grass_3', 0);
                    items.key = 'grass_3';

                    break;*/
            }


        }, this);
        //game.world.bringToTop(this.plant);
        //game.world.moveUp(this.plant);
    },

    showFishMenu: function () {
        if (this.fish_step != 0) { }
        else {
            if (this.seedopen = true) {
                this.initOpen();
            }
            this.fishopen = true;
            this.fishMenu.visible = true;
            //this.fishResult.visible = false;
            //this.fish_gone.visible = false;
            //this.fail.visible = false;
            this.fishResultBox.scale.setTo(0.1, 0.1);
            game.world.bringToTop(this.fishMenu);
            this.fish.scale.setTo(0.3, 0.3);
            this.fail.scale.setTo(0.1, 0.1);
        }

        //this.fishTime = game.time.now;
    },
    closeFishMenu: function () {
        this.fishMenu.visible = false;
        this.fishResult.visible = false;
        this.fish_gone.visible = false;
        this.fail.visible = false;
        this.fish_step = 0;
    },
    playFish_ani: function () {
        this.fish_step = 1;

        ConsumeTime(10, 50);

        this.fishing.visible = true;
        this.fishing.animations.play('fishing_ani');
        this.fishMenu.visible = false;
        game.time.events.add(game.time.now % 3000 + 500, this.goFish, this);
    },
    goFish: function () {
        //510, 280
        this.fishing.animations.stop();
        this.fishing.visible = false;
        this.fish.alpha = 1;
        this.fishResultBox.alpha = 1;
        this.fail.alpha = 1;
        this.num = game.rnd.integerInRange(0, 5);
        this.fishResult.visible = true;
        switch (this.num) {
            case 0:
                this.fish.loadTexture('fish_0', 0);
                this.fish.position.y = 340;
                this.fish.position.x = 580;
                game.add.tween(this.fishResultBox.scale).to({ x: 0.3, y: 0.3 }, 300).start();
                game.add.tween(this.fish.scale).to({ x: 1, y: 1 }, 300).start();
                //this.fish.scale.setTo(1, 1);
                this.fishResult.visible = true;
                break;
            case 1:
                this.fish.loadTexture('fish_1', 0);
                this.fish.position.y = 340;
                this.fish.position.x = 580;
                game.add.tween(this.fishResultBox.scale).to({ x: 0.3, y: 0.3 }, 300).start();
                game.add.tween(this.fish.scale).to({ x: 1, y: 1 }, 300).start();
                //this.fish.scale.setTo(1, 1);
                this.fishResult.visible = true;
                break;
            case 2:
                this.fish.loadTexture('fish_2', 0);
                //this.fish.scale.setTo(1, 1);
                this.fish.position.y = 350;
                this.fish.position.x = 565;
                game.add.tween(this.fishResultBox.scale).to({ x: 0.3, y: 0.3 }, 300).start();
                game.add.tween(this.fish.scale).to({ x: 1, y: 1 }, 300).start();
                this.fishResult.visible = true;
                break;
            case 3:
                this.fish.loadTexture('fish_3', 0);
                //this.fish.scale.setTo(0.4, 0.4);
                this.fish.position.y = 350;
                this.fish.position.x = 560;
                game.add.tween(this.fishResultBox.scale).to({ x: 0.3, y: 0.3 }, 300).start();
                game.add.tween(this.fish.scale).to({ x: 0.4, y: 0.4 }, 300).start();
                this.fishResult.visible = true;
                break
            case 4:
                this.fish.loadTexture('fish_4', 0);
                this.fish.position.y = 350;
                this.fish.position.x = 580;
                //this.fish.scale.setTo(1, 1);
                game.add.tween(this.fishResultBox.scale).to({ x: 0.3, y: 0.3 }, 300).start();
                game.add.tween(this.fish.scale).to({ x: 1, y: 1 }, 300).start();
                this.fishResult.visible = true;
                break;
            case 5:
                this.fail.visible = true;
                game.add.tween(this.fail.scale).to({ x: 0.5, y: 0.5 }, 300).start();
                //tween.delay(1000);
                game.add.tween(this.fail).to({ alpha: 0 }, 1000, "Linear", true, 1000).start();
                this.fish_gone.visible = true;
                this.fish_gone.animations.play();
                break;
        }
        game.add.tween(this.fishResultBox).to({ alpha: 0 }, 1000, "Linear", true, 1000).start();
        game.add.tween(this.fish).to({ alpha: 0 }, 1000, "Linear", true, 1000).start();
        game.world.bringToTop(this.fishResult);
        game.time.events.add(2000, this.closeFishResult, this);
        console.log(this.num);
    },
    closeFishResult: function () {
        //console.log('hii');
        this.fishResultBox.scale.setTo(0.1, 0.1);
        this.fish.scale.setTo(0.3, 0.3);
        this.fail.scale.setTo(0.1, 0.1);
        if (this.fishResult.visible)
            this.fishResult.visible = false;
        if (this.fail.visible)
            this.fail.visible = false;
        this.fish_step = 0;
    },
    plantInputOver: function (index) {
        var state;
        this.fields_time_show.visible = true;
        plant.forEachAlive(function (items) {
            if (items.index == index) {
                state = items.state;
            }
        }, this);
        if (state == 4) {
            this.fields_time_show.text = 'Finish!';
        }
        else {
            this.fields_time_show.text = 'Stage: ' + state;
        }
        this.fields_time_show.position.x = this.fields_xy[index].x;
        this.fields_time_show.position.y = this.fields_xy[index].y - 30;
    },
    plantInputOut: function (index) {
        this.fields_time_show.text = "";
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
        
        
        this.fishopen = false;
        this.seedopen = false;

        //fish
        this.fishMenu.visible = false;
        this.fishResult.visible = false;
        this.fish_gone.visible = false;
        this.fail.visible = false;
        this.fish_step = 0;

        //seed
        this.box_seed.visible = false;
        this.btn_seed_index = -1;
        if (this.btn_seed[0] != 0) this.btn_seed[0].destroy();
        if (this.btn_seed[1] != 0) this.btn_seed[1].destroy();
    },
    replantPlant: function () {
        console.log('new');
        var tmp_plant;
        var tmp_index = [0, 0, 0, 0, 0, 0]
        for (var i = 0; i < 6; i++) {
            if (fields[1][i] != 0) {
                tmp_index[i] = 1;
                if (fields[0][i] == 'grass_0') {
                    switch (fields[1][i]) {
                        case 1:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 20, this.fields_xy[i].y - 10, 'grass_0');
                            tmp_plant.state = 0;
                            break;
                        case 2:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 15, this.fields_xy[i].y - 25, 'grass_1');
                            tmp_plant.state = 1;
                            break;
                        case 3:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 15, this.fields_xy[i].y - 25, 'grass_2');
                            tmp_plant.state = 2;
                            break;
                        case 4:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 15, this.fields_xy[i].y - 25, 'grass_3');
                            tmp_plant.state = 3;
                            break;
                    }
                    tmp_plant.index = fields[3][i];
                }
                else if (fields[0][i] == 'moneyseed_0') {
                    switch (fields[1][i]) {
                        case 1:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 20, this.fields_xy[i].y - 10, 'moneyseed_0');
                            tmp_plant.state = 0;
                            break;
                        case 2:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 15, this.fields_xy[i].y - 25, 'moneyseed_1');
                            tmp_plant.state = 1;
                            break;
                        case 3:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 15, this.fields_xy[i].y - 25, 'moneyseed_2');
                            tmp_plant.state = 2;
                            break;
                        case 4:
                            tmp_plant = game.add.sprite(this.fields_xy[i].x + 15, this.fields_xy[i].y - 25, 'moneyseed_3');
                            tmp_plant.state = 3;
                            break;
                    }
                    tmp_plant.index = fields[3][i];

                }
                tmp_plant.inputEnabled = true;
                //tmp_plant.events.onInputOver.add(function () { this.plantInputOver(tmp_plant.index ) }, this);
                //tmp_plant.events.onInputOut.add(function () { this.plantInputOut(tmp_plant.index ) }, this);
                tmp_plant.scale.setTo(0.5, 0.5);
                tmp_plant.time = game.time.now;
                console.log(tmp_plant);
                plant.add(tmp_plant);
            }
        }

        plant.forEachAlive(function (item) {
            item.events.onInputOver.add(function () { farmState.plantInputOver(item.index) }, this);
            item.events.onInputOut.add(function () { farmState.plantInputOut(item.index) }, this);
        });

        console.log(plant);
    }
};