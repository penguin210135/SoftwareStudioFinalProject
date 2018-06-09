var farmState = {
    preload: function () {


    },
    create: function () {
        this.cursor = game.input.keyboard.createCursorKeys();

        this.farm_bg = game.add.image(0, 0, 'farm_bg');
        this.farm_bg.scale.setTo(1.9, 1.8);

        this.house = game.add.image(700, 0, 'house');
        this.house.scale.setTo(0.87, 0.74);

        this.btn_fish = game.add.image(5, 663, 'btn_fish');
        this.btn_fish.scale.setTo(0.53, 0.53);

        this.pond = game.add.sprite(520, 400, 'pond');
        this.pond.scale.setTo(0.9, 0.8);
        game.physics.arcade.enable(this.pond);
        this.pond.body.immovable = true;

        this.fields_xy = [{ x: 395, y: 345 }, { x: 490, y: 395 }, { x: 585, y: 445 }];
        this.plant_warehouse = [0, 0];
        this.btn_plant = [0, 0, 0, 0];
        this.btn_killPlant = [0, 0, 0, 0];
        this.btn_seed = [0, 0, 0, 0, 0, 0, 0, 0];
        this.btn_harvest = [0, 0, 0, 0, 0, 0, 0, 0];

        this.fields = [0, 0, 0, 0];  //田地植物狀態
        

        this.plant = game.add.group();
        

        this.fields_time_show = game.add.text(30, 30, 'life: ', { font: '30px Arial', fill: '#ffffff' });
        //this.fields_time_show.visible = false;

        this.createCushion();
        this.createField();
        //this.createbtnPlant();
        this.createGroupSeed();
        this.createPlayer();
    },
    update: function () {
        this.movePlayer();
        game.physics.arcade.collide(this.player, this.cushions);
        this.updatetmp();
    },
    createCushion() {
        this.cushions = game.add.group();
        this.cushions.enableBody = true;

        this.cushion1 = game.add.sprite(1050, 390, 'cushion', 0, this.cushions);
        this.cushion2 = game.add.sprite(900, 400, 'cushion', 0, this.cushions);
        this.cushion3 = game.add.sprite(750, 405, 'cushion', 0, this.cushions);
        this.cushion1.scale.setTo(0.2, 0.2);
        this.cushion2.scale.setTo(0.2, 0.2);
        this.cushion3.scale.setTo(0.2, 0.2);
        this.cushion2.angle = 5;
        this.cushion3.angle = -10;
        //game.physics.arcade.enable(this.cushion);
        this.cushions.setAll('body.immovable', true);

    },
    createField() {
        this.field[0] = game.add.button(395, 345, 'field', function () { this.showMenu(0) }, this, 2, 1, 0);
        this.field[1] = game.add.button(490, 395, 'field', function () { this.showMenu(1) }, this, 2, 1, 0);
        this.field[2] = game.add.button(585, 445, 'field', function () { this.showMenu(2) }, this, 2, 1, 0);
        this.field[0].angle = 25;
        this.field[1].angle = 25;
        this.field[2].angle = 25;
        this.field[0].scale.setTo(1.7, 1.5);
        this.field[1].scale.setTo(1.7, 1.5);
        this.field[2].scale.setTo(1.7, 1.5);

    },
    createGroupSeed: function () {
        this.group_seed = game.add.group();
        this.group_seed.inputEnableChildren = true;
        this.box_seed = game.add.sprite(0, 0, 'box_seed');
        this.box_seed.scale.setTo(0.5, 0.5);

        this.seed_grass = game.add.sprite(0, 0, 'grass_0');
        this.seed_money = game.add.sprite(50, 0, 'moneyseed_0');
        this.seed_grass.scale.setTo(0.6, 0.6);
        this.seed_money.scale.setTo(0.6, 0.6);

        this.group_seed.add(this.box_seed);
        this.group_seed.add(this.seed_grass);
        this.group_seed.add(this.seed_money);
        this.group_seed.visible = false;
        //this.group_seed.inputEnableChildren = true;    
    },
    createPlayer: function () {
        this.player = game.add.sprite(500, 0, 'player');
        this.player.scale.setTo(1.5, 1.5);
        game.physics.arcade.enable(this.player);

        this.player.checkWorldBounds = true;
    },
    movePlayer: function () {

        if (this.cursor.left.isDown) {
            console.log(this.plant[0].state);
            this.plant[0].state = 1;
        }
    },
    showMenu: function (index) {
        //console.log('index_s =' + this.fields[index]);

        //還沒種的
        if (this.fields[index] == 0) {
            if (this.btn_plant[index].alive) this.btn_plant[index].visible = true;
            else this.btn_plant[index] = game.add.button(this.fields_xy[index].x, this.fields_xy[index].y - 30, 'btn_plant', function () { this.showSeed(index) }, this, 2, 1, 0);
            if (this.btn_killPlant[index].alive) this.btn_killPlant[index].visible = true;
            else this.btn_killPlant[index] = game.add.button(this.fields_xy[index].x + 40, this.fields_xy[index].y - 30, 'btn_killPlant', function () { this.killPlant(index) }, this, 2, 1, 0);

            this.btn_plant[index].scale.setTo(0.15, 0.15);
            this.btn_killPlant[index].scale.setTo(0.15, 0.15);
        } else {
            this.plant.forEachAlive(function (items) {
                if (items.index == index) {
                    if (this.btn_harvest[index].alive) this.btn_harvest[index].visible = true;
                    else this.btn_harvest[index] = game.add.button(this.fields_xy[index].x + 80, this.fields_xy[index].y - 30, 'btn_plant', function () { this.harvest(index) }, this, 2, 1, 0);

                    this.btn_harvest[index].scale.setTo(0.15, 0.15);
                }
            }, this);
        }

        for (var i = 0; i < 3; i++) {
            if (i != index) {
                this.btn_plant[i].visible = false;
                this.btn_killPlant[i].visible = false;
                this.btn_seed[i].visible = false;
            }
        }
        if (this.group_seed.visible) this.group_seed.visible = false;
    },
    showSeed: function (index) {
        if (!this.group_seed.visible) {
            this.group_seed.visible = true;
            this.box_seed.position.x = this.fields_xy[index].x - 60;
            this.box_seed.position.y = this.fields_xy[index].y - 150;

            this.seed_grass.position.x = this.fields_xy[index].x - 45;
            this.seed_grass.position.y = this.fields_xy[index].y - 166;
            this.seed_money.position.x = this.fields_xy[index].x + 10;
            this.seed_money.position.y = this.fields_xy[index].y - 183;

            this.btn_seed[index] = game.add.button(this.seed_grass.position.x, this.seed_grass.position.y, 'grass_0', function () { this.createPlant(index, this.seed_grass.key) }, this, 2, 1, 0);
        }
        else {
            this.group_seed.visible = false;
        }
    },
    createPlant: function (index, key) {
        console.log(index + " " + key);

        this.fields[index] = 1;

        if (key == 'grass_0')
            var tmp_plant = game.add.sprite(this.fields_xy[index].x + 25, this.fields_xy[index].y - 30, 'grass_0');
        else if (key == 'moneyseed_0') {
            var tmp_plant = game.add.sprite(this.fields_xy[index].x + 25, this.fields_xy[index].y - 63, 'moneyseed_0');
        }
        tmp_plant.time = game.time.now;
        tmp_plant.state = 0;
        tmp_plant.index = index;
        tmp_plant.key = key;
        this.plant.add(tmp_plant);

        this.btn_plant[index].visible = false;
        this.btn_killPlant[index].visible = false;
        this.btn_seed[index].visible = false;
        this.group_seed.visible = false;
    },
    killPlant: function (index) {
        this.plant[index].state = 0;
        this.field[index].events.onInputDown.removeAll();
        this.fields_time[index] = -1;
        this.grass[index].destroy();
        this.btn_plant[index].destroy();
        this.btn_killPlant[index].destroy();
    },
    harvest: function (index) {
        console.log('harvest = ' + index);

        this.plant.forEachAlive(function (items) {
            console.log("check!");
            if (items.index == index) {
                this.fields[items.index] = 0;
                this.field[index].events.onInputDown.removeAll();
                this.btn_harvest[items.index].destroy();
                items.destroy();
                console.log("harvest!");
                if (items.key == 'grass_3') {
                    this.plant_warehouse[0] += 5;
                }
                else if (items.key == 'moneyseed_3') {
                    this.plant_warehouse[1] += 5;
                }
            }
        }, this);
    },

    updatetmp: function () {
        this.plant.forEachAlive(function (items) {
            if (items.time + 1000 < game.time.now) {
                if (items.state < 4) {
                    items.time = game.time.now;
                    items.state += 1;
                }
            }

            switch (items.state) {
                case -1:
                    items.destroy();
                    break;
                case 0:
                    break;
                case 1:
                    items.loadTexture('grass_1', 0);
                    break;
                case 2:
                    items.loadTexture('grass_2', 0);
                    break;
                case 3:
                    items.loadTexture('grass_3', 0);
                    break;
                case 4:
                    items.loadTexture('grass_3', 0);
                    items.key = 'grass_3';

                    break;
            }


        }, this);
        game.world.bringToTop(this.plant);
    }
};
