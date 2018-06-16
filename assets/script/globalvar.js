var bgm_volumn = 0.5;
var bag_list = [];
bag_list[0] = [0, 0, 0, 0];
bag_list[1] = [0, 0, 0, 0];
bag_list[2] = [0, 0, 0, 0];
var seed_list = [];
seed_list[0] = [2, 2, 0, 0];
seed_list[1] = [0, 0, 0, 0];
var dish_list = [];
var bag_index = 10;
var seed_index = 8;
var lifetime = 1000;
var player_health = 100;
var pet_life = 40;
var pre_state = "house";

//battle
var mainlife = 40;
var ghost_life = 10;
var ghost_power = 8;
var octopus_life = 25;
var octopus_power = 10;
var pig_power = 13;
var pig_life = 40;
var snake_life = 50;
var snake_power = 16;
var dragon_life = 120;
var dragon_power = 25;
var protect = 3;

//farm
var plant_warehouse = [0, 0];
var plant;
let fields = [];
fields[0] = [0, 0, 0, 0, 0, 0];  //key
fields[1] = [0, 0, 0, 0, 0, 0];  //state
fields[2] = [0, 0, 0, 0, 0, 0];  //time
fields[3] = [0, 1, 2, 3, 4, 5];  //state

//forest
var player_x = 0;
var player_y = 0;

function createplayer(that) {
    //player
    that.player = game.add.sprite(game.width / 2, game.height / 2, 'player');
    that.player.animations.add('down', [0, 4, 8], 8);    //player animations
    that.player.animations.add('up', [2, 6, 10], 8);
    that.player.animations.add('left', [3, 7, 11], 8);
    that.player.animations.add('right', [1, 5, 9], 8);
    game.physics.arcade.enable(that.player);
    that.player.body.collideWorldBounds = true;
    that.player.body.setSize(32, 32, 0, 0);
    that.player.anchor.setTo(0.5, 0.5);
    that.player.movetime = game.time.now;
    that.game.camera.follow(that.player);

    switch (game.state.current) {
        case "house":
            that.player.position.setTo(310, 580);
            break;
        case "farm":
            switch (pre_state) {
                case "house":
                    that.player.position.setTo(820, 280);
                    break;
                case "forest":
                    that.player.position.setTo(250, 250);
                    break;
                case "town":
                    that.player.position.setTo(1100, 570);
                    break;
            }
            break;
        case "forest":
            switch (pre_state) {
                case "fight":
                    that.player.position.setTo(player_x, player_y);
                    break;
                default:
                    that.player.position.setTo(1120, 360);
                    break;
            }
            break;
        case "town":
            that.player.position.setTo(0, 530);
            break;
    }
};

function createclock(that) {
    that.clock = game.add.sprite(1100, 50, 'clock');
    that.clock.scale.setTo(0.1, 0.1);
    that.clock.anchor.setTo(0.5, 0.5);
    that.arror = game.add.sprite(1100, 50, 'arror');
    that.arror.scale.setTo(0.1, 0.1);
    that.arror.anchor.setTo(0.12, 0.12);
    that.short_arror = game.add.sprite(1100, 50, 'short_arror');
    that.short_arror.scale.setTo(0.1, 0.1);
    that.short_arror.anchor.setTo(0.5, 0.85);
    that.time_show = game.add.text(1070, 95, ((lifetime / 60) | 0) + ":" + lifetime % 60, { font: '20px Arial', fill: '#696161' });
    that.time_show.stroke = '#ffffff';
    that.time_show.strokeThickness = 2;
};

function createfire(that) {
    that.fire = game.add.sprite(1070, 110, 'fire');
    that.fire.scale.setTo(0.2, 0.2);
    that.fire.animations.add('fire_ani', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, true).play();
    that.fire_middle = game.add.sprite(1040, 95, 'fire_middle');
    that.fire_middle.scale.setTo(0.23, 0.23);
    that.fire_middle.animations.add('fire_middle_ani', [0, 1, 2, 3, 4, 5, 6, 7], 10, true).play();
    that.fire_small = game.add.sprite(1085, 130, 'fire_small');
    that.fire_small.scale.setTo(0.13, 0.13);
    that.fire_small.animations.add('fire_small_ani', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true).play();

    //that.fire.visible = false;
    that.fire_middle.visible = false;
    that.fire_small.visible = false;

    that.health_text = game.add.text(1080, 150, player_health, { font: '20px Arial', fill: '#000000' });
    that.health_text.stroke = '#ffffff';
    that.health_text.strokeThickness = 2;
};


function createiconbag(that) {
    //bag
    that.bagimage = game.add.image(600, 200, 'bag_0');
    that.bagimage.fixedToCamera = true;
    that.bagimage.inputEnabled = true;
    that.bagimage.alpha = 0;
    that.bagbutton = game.add.button(1160 - 250, 720 - 100, 'Bag', that.BagOnClick, that);
    that.bagbutton.fixedToCamera = true;
    that.bagbutton.height = 100;
    that.bagbutton.width = 100;
    game.add.bitmapText(1160 - 200, 720 - 50, 'carrier_command', 'B', 32);
    that.keyboard_B = game.input.keyboard.addKey(Phaser.Keyboard.B);
    that.keyboard_B.onDown.add(that.BagOnClick, that);
    that.BagOpen = false;

    that.Bag_item_0 = game.add.image(660, 268, 'Bagitem_0');
    that.Bag_item_0_number = game.add.bitmapText(700, 305, 'carrier_command', bag_list[0][0].toString(), 16);

    that.Bag_item_1 = game.add.image(755, 268, 'Bagitem_1');
    that.Bag_item_1_number = game.add.bitmapText(795, 305, 'carrier_command', bag_list[0][1].toString(), 16);
    that.Bag_item_2 = game.add.image(855, 268, 'Bagitem_2');
    that.Bag_item_2_number = game.add.bitmapText(895, 305, 'carrier_command', bag_list[0][2].toString(), 16);
    that.Bag_item_3 = game.add.image(960, 268, 'Bagitem_3');
    that.Bag_item_3_number = game.add.bitmapText(1000, 305, 'carrier_command', bag_list[0][3].toString(), 16);

    that.bagitem = game.add.group();
    that.bagitem.add(that.Bag_item_0);
    that.bagitem.add(that.Bag_item_1);
    that.bagitem.add(that.Bag_item_2);
    that.bagitem.add(that.Bag_item_3);
    that.bagitem.add(that.Bag_item_0_number);
    that.bagitem.add(that.Bag_item_1_number);
    that.bagitem.add(that.Bag_item_2_number);
    that.bagitem.add(that.Bag_item_3_number);

    that.bagitem.visible = false;
};

function createiconmap(that) {
    that.mapimage = game.add.image(600, 200, 'map_0');
    that.mapimage.fixedToCamera = true;
    that.mapimage.inputEnabled = true;
    that.mapimage.alpha = 0;
    that.mapbutton = game.add.button(1160 - 100, 720 - 100, 'Map', that.MapOnClick, that, that);
    that.mapbutton.fixedToCamera = true;
    that.mapbutton.height = 100;
    that.mapbutton.width = 100;
    game.add.bitmapText(1160 - 50, 720 - 50, 'carrier_command', 'M', 32);
    that.keyboard_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
    that.keyboard_M.onDown.add(that.MapOnClick, that, that);
    that.MapOpen = false;

    that.map_icon_forest = game.add.button(700, 300, 'Map_Forest', function () { ToNewPlace('forest') }, this);
    that.map_icon_forest.scale.setTo(0.5, 0.5);
    that.map_icon_house = game.add.button(800, 350, 'Map_House', function () { ToNewPlace('house') }, this);
    that.map_icon_house.scale.setTo(0.5, 0.5);
    that.map_icon_farm = game.add.button(950, 300, 'Map_Farm', function () { ToNewPlace('farm') }, this);
    that.map_icon_farm.scale.setTo(0.5, 0.5);
    that.map_icon_town = game.add.button(800, 460, 'Map_Town', function () { ToNewPlace('town') }, this);
    that.map_icon_town.scale.setTo(0.5, 0.5);

    that.map_icon_farm.visible = false;
    that.map_icon_house.visible = false;
    that.map_icon_forest.visible = false;
    that.map_icon_town.visible = false;

    that.icon = game.add.group();
    that.icon.add(that.map_icon_forest);
    that.icon.add(that.map_icon_farm);
    that.icon.add(that.map_icon_town);
    that.icon.add(that.map_icon_house);
    that.icon.visible = false;
};

function createiconkitchen(that) {
    that.kitchenimage = game.add.image(600, 200, 'map_0');
    that.kitchenimage.fixedToCamera = true;
    that.kitchenimage.inputEnabled = true;
    that.kitchenimage.alpha = 0;

    that.kitchenbutton = game.add.button(1160 - 400, 720 - 100, 'Cook', that.MapOnClick, that);
    that.kitchenbutton.fixedToCamera = true;
    that.kitchenbutton.height = 100;
    that.kitchenbutton.width = 100;

    that.kitchen = game.add.button(233, 173, 'icon_kitchen', that.MapOnClick, that);

    game.add.bitmapText(1160 - 350, 720 - 50, 'carrier_command', 'K', 32);
    that.keyboard_K = game.input.keyboard.addKey(Phaser.Keyboard.K);
    that.keyboard_K.onDown.add(that.MapOnClick, that);
    that.KitchenOpen = false;
};

function createmessageblock(that) {
    //msg
    that.messageimage = game.add.image(0, 500, 'msgblock_1');
    that.messageimage.height = 200;
    that.messageimage.width = game.width;
    that.messageimage.fixedToCamera = true;
    that.messageimage.visible = false;
    that.MsgOpen = false;
};

function updateclock(that) {

    that.clock.angle -= 0.2;
    that.arror.angle += 0.1;
    that.short_arror.angle += 0.01;
    if (lifetime % 60 < 10) {
        that.time_show.text = ((lifetime / 60) | 0) + ":0" + lifetime % 60;
    } else {
        that.time_show.text = ((lifetime / 60) | 0) + ":" + lifetime % 60;
    }

};

function updatefire(that) {

    that.health_text.text = player_health;

    if (player_health == 100) {
        that.fire.visible = true;
        that.fire_middle.visible = false;
        that.fire_small.visible = false;
    }
    else if (player_health == 50) {
        that.fire.visible = false;
        that.fire_middle.visible = true;
        that.fire_small.visible = false;
    }
    else if (player_health == 10) {
        that.fire.visible = false;
        that.fire_middle.visible = false;
        that.fire_small.visible = true;
    }
};

function updatebag(that) {

    that.Bag_item_0_number.text = bag_list[0][0].toString();
    that.Bag_item_1_number.text = bag_list[0][1].toString();
    that.Bag_item_2_number.text = bag_list[0][2].toString();
    that.Bag_item_3_number.text = bag_list[0][3].toString();
};

function moveplayer(that) {
    if (that.cursor.left.isDown) {
        that.player.body.velocity.x = -200;
        that.player.animations.play('left');
    } else if (that.cursor.right.isDown) {
        that.player.body.velocity.x = 200;
        that.player.animations.play('right');
    } else if (that.cursor.up.isDown) {
        that.player.body.velocity.y = -200;
        that.player.animations.play('up');
    } else if (that.cursor.down.isDown) {
        that.player.body.velocity.y = 200;
        that.player.animations.play('down');
    } else {
        that.player.body.velocity.x = 0;
        that.player.body.velocity.y = 0;
        that.player.animations.stop();
    }
};

function ToNewPlace(place) {
    //console.log("Move to " + place._onOverFrame);
    pre_state = game.state.current;
    game.state.start(place);
};

function ConsumeTime(health, time) {
    player_health -= health;
    lifetime -= time;
};

function moveplayerto(x,y){
    var tmp_time = game.time.now;

};
