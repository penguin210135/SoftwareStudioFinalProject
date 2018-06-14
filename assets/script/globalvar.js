var bgm_volumn = 0.5;
var bag_list = [];
var seed_list = [];
var dish_list = [];
var bag_index = 10;
var seed_index = 8;
var lifetime = 100;
var player_health = 100;
var pet_life = 40;
var pre_state = "main";

//battle
var mainlife = 40;
var ghost_life = 10;
var octopus_life = 25;
var snake_life = 50;
var dragon_life = 120;
var protect = 3;

//farm
var plant_warehouse = [0, 0];
var plant;

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
    that.time_show = game.add.text(1080, 95, '18:00', { font: '18px Arial', fill: '#696161' });
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

    that.health_text = game.add.text(1075, 150, player_health, { font: '18px Arial', fill: '#000000' });
};

function updateclock(clock, arror, short) {
    clock.angle -= 0.2;
    arror.angle += 0.1;
    short.angle += 0.01;
};

function updatefire(fire, fire_middle, fire_small,health_text) {

    health_text.text = player_health;

    if (player_health == 100) {
        fire.visible = true;
        fire_middle.visible = false;
        fire_small.visible = false;
    }
    else if (player_health == 50) {
        fire.visible = false;
        fire_middle.visible = true;
        fire_small.visible = false;
    }
    else if (player_health == 10) {
        fire.visible = false;
        fire_middle.visible = false;
        fire_small.visible = true;
    }
};

function moveplayer(cursor, player) {
    if (cursor.left.isDown) {
        player.body.velocity.x = -200;
        player.animations.play('left');
    } else if (cursor.right.isDown) {
        player.body.velocity.x = 200;
        player.animations.play('right');
    } else if (cursor.up.isDown) {
        player.body.velocity.y = -200;
        player.animations.play('up');
    } else if (cursor.down.isDown) {
        player.body.velocity.y = 200;
        player.animations.play('down');
    } else {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.animations.stop();
    }
};

function createbag(that) {
    //bag
    that.bagimage = game.add.image(600, 200, 'bag_0');
    that.bagimage.fixedToCamera = true;
    that.bagimage.inputEnabled = true;
    that.bagimage.alpha = 0;
    that.bagbutton = game.add.button(1160 - 250, 720 - 100, 'Bag', BagOnClick, that);
    that.bagbutton.fixedToCamera = true;
    that.bagbutton.height = 100;
    that.bagbutton.width = 100;
    game.add.bitmapText(1160 - 200, 720 - 50, 'carrier_command', 'B', 32);
    that.keyboard_B = game.input.keyboard.addKey(Phaser.Keyboard.B);
    that.keyboard_B.onDown.add(BagOnClick, that);
    that.BagOpen = false;
};

function createmap(that) {
    that.mapimage = game.add.image(600, 200, 'background');
    that.mapimage.fixedToCamera = true;
    that.mapimage.inputEnabled = true;
    that.mapimage.alpha = 0;
    that.mapbutton = game.add.button(1160 - 100, 720 - 100, 'Map', MapOnClick, this, that);
    that.mapbutton.fixedToCamera = true;
    that.mapbutton.height = 100;
    that.mapbutton.width = 100;
    game.add.bitmapText(1160 - 50, 720 - 50, 'carrier_command', 'M', 32);
    that.keyboard_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
    that.keyboard_M.onDown.add(MapOnClick, this, that);
    that.MapOpen = false;
};

function initOpen(that) {
    that.MapOpen = false;
    that.BagOpen = false;
    that.NpcOpen = false;
    game.add.tween(that.bagimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    game.add.tween(that.mapimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    game.add.tween(that.messageimage).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
};

function BagOnClick(that) {

    if (that.BagOpen == false) {
        console.log('Open the Bag!');
        initOpen(that);
        that.BagOpen = true;
        game.world.bringToTop(that.bagimage);
        game.add.tween(that.bagimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        //add button
        that.bagimage.events.onInputDown.add(that.BagFunction, that);
    } else {
        console.log('Close the Bag!');
        initOpen(that);
        that.bagimage.events.onInputDown.removeAll();
    }
};

function MapOnClick(that) {
    if (that.MapOpen == false) {
        console.log('Open the Map!');
        initOpen(that);
        that.MapOpen = true;
        game.world.bringToTop(that.mapimage);
        game.add.tween(that.mapimage).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        //add button
        that.mapimage.events.onInputDown.add(that.MapFunction, that);
    } else {
        console.log('Close the Map!');
        initOpen(that);
        that.mapimage.events.onInputDown.removeAll();
    }
};

