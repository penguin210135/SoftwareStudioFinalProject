Technotip.Preloader = function (game) {
    game.ready = false;
};

Technotip.Preloader.prototype = {
    preload: function () {
        this.preloadBar = game.add.sprite(100, 30, 'preloadbar');
        game.load.setPreloadSprite(this.preloadBar);

        //menu
        game.load.audio('menu_bgm', ['assets/audio/menu_bgm.mp3']);
        game.load.image('background', 'assets/image/menu/background_menu_1.jpg');
        game.load.image('arrow', 'assets/image/menu/arrow.png');
        game.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

        //setting
        game.load.image('setting-bar', 'assets/image/setting/setting-rect.png');
        game.load.image('setting-control', 'assets/image/setting/setting-circle.png');

        //main
        game.load.spritesheet('player', 'assets/image/main/character.png', 32, 34);

        //icon
        game.load.image('Bag', 'assets/image/icon/button_bag.png');
        game.load.image('Map', 'assets/image/icon/button_map.png');
        game.load.image('Cook', 'assets/image/icon/button_cooking.png');
        game.load.image('icon_kitchen', 'assets/image/icon/cook.png');
        game.load.image('icon_bed', 'assets/image/icon/bed.png');
        game.load.image('npc_dan', 'assets/image/icon/npc_dandan.png');
        game.load.image('npc_game', 'assets/image/icon/npc_game.png');
        game.load.image('npc_gugu', 'assets/image/icon/npc_gugu.png');
        game.load.image('npc_seed', 'assets/image/icon/npc_seed.png');
        game.load.image('Map_Town', 'assets/image/icon/icon_town.png');
        game.load.image('Map_House', 'assets/image/icon/icon_house.png');
        game.load.image('Map_Forest', 'assets/image/icon/icon_forest.png');
        game.load.image('Map_Farm', 'assets/image/icon/icon_farm.png');
        game.load.image('Bagitem_0', 'assets/image/item/beef.png');
        game.load.image('Bagitem_1', 'assets/image/item/mashroom.png');
        game.load.image('Bagitem_2', 'assets/image/item/egg.png');
        game.load.image('Bagitem_3', 'assets/image/item/vegetable.png');

        //function background
        game.load.image('map_0', 'assets/image/main/globalmap.png');
        game.load.image('bag_0', 'assets/image/main/packbag0.png');
        game.load.image('bag_1', 'assets/image/main/packbag1.png');
        game.load.image('bag_2', 'assets/image/main/packbag2.png');
        game.load.image('bag_3', 'assets/image/main/packbag3.png');

        //map 
        game.load.tilemap('house_map', 'assets/image/map/map_room.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('forest_map', 'assets/image/map/map_forest.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('town_map', 'assets/image/map/map_city.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles1', 'assets/image/map/spritesheet1.png');
        game.load.image('tiles2', 'assets/image/map/spritesheet2.png');
        game.load.image('tiles3', 'assets/image/map/spritesheet3.png');
        game.load.image('tiles4', 'assets/image/map/spritesheet4.png');

        //message block
        game.load.image('msgblock_1', 'assets/image/main/messageblock_1.png')
        game.load.image('msgblock_2', 'assets/image/main/messageblock_2.png')

        //talk
        game.load.image('talk_front_run', 'assets/image/talk/run_start.png');
        game.load.image('talk_front_1', 'assets/image/talk/talk_start1.png');
        game.load.image('talk_front_2', 'assets/image/talk/talk_start2.png');
        game.load.image('talk_front_3', 'assets/image/talk/talk_start3.png');
        game.load.image('talk_front_4', 'assets/image/talk/talk_start4.png');
        game.load.image('talk_front_5', 'assets/image/talk/talk_start5.png');
        game.load.image('talk_front_6', 'assets/image/talk/talk_start6.png');
        game.load.image('talk_gugu_1', 'assets/image/talk/talk_gugu1.png');
        game.load.image('talk_gugu_2', 'assets/image/talk/talk_gugu2.png');
        game.load.image('talk_gugu_3', 'assets/image/talk/talk_gugu3.png');
        game.load.image('talk_gugu_4', 'assets/image/talk/talk_gugu4.png');
        game.load.image('talk_gugu_5', 'assets/image/talk/talk_gugu5.png');
        game.load.image('talk_gugu_6', 'assets/image/talk/talk_gugu6.png');
        game.load.image('talk_gugu_7', 'assets/image/talk/talk_gugu7.png');
        game.load.image('talk_end_1', 'assets/image/talk/talk_end1.png');
        game.load.image('talk_end_2', 'assets/image/talk/talk_end2.png');
        game.load.image('talk_end_3', 'assets/image/talk/talk_end3.png');
        game.load.image('talk_end_4', 'assets/image/talk/talk_end4.png');
        game.load.image('talk_end_5', 'assets/image/talk/talk_end5.png');
        game.load.image('talk_dan_1', 'assets/image/talk/talk_dandan1.png');
        game.load.image('talk_dan_2', 'assets/image/talk/talk_dandan2.png');
        game.load.image('talk_dan_3', 'assets/image/talk/talk_dandan3.png');
        game.load.image('talk_dan_4', 'assets/image/talk/talk_dandan4.png');
        game.load.image('talk_dan_5', 'assets/image/talk/talk_dandan5.png');
        game.load.image('talk_dan_6', 'assets/image/talk/talk_dandan6.png');
        game.load.image('talk_seed_1', 'assets/image/talk/talk_seed1.png');
        game.load.image('talk_seed_2', 'assets/image/talk/talk_seed2.png');
        game.load.image('talk_seed_3', 'assets/image/talk/talk_seed3.png');
        game.load.image('talk_seed_4', 'assets/image/talk/talk_seed4.png');
        game.load.image('talk_seed_5', 'assets/image/talk/talk_seed5.png');
        game.load.image('talk_die_1', 'assets/image/talk/talk_die1.png');
        game.load.image('talk_die_2', 'assets/image/talk/talk_die2.png');
        game.load.image('talk_die_3', 'assets/image/talk/talk_die3.png');
        game.load.image('talk_die_4', 'assets/image/talk/talk_die4.png');
        game.load.image('talk_die_5', 'assets/image/talk/talk_die5.png');
        game.load.image('talk_die_6', 'assets/image/talk/talk_die6.png');


        //farm
        game.load.image('farm_bg', 'assets/image/farm/back.png');
        game.load.image('pond', 'assets/image/farm/sea1.png');
        game.load.image('pond1', 'assets/image/farm/sea2.png');
        game.load.image('house', 'assets/image/farm/house.png')
        game.load.image('trees', 'assets/image/farm/trees.png')
        game.load.image('tree', 'assets/image/farm/tree.png')
        game.load.image('cut', 'assets/image/farm/cut.png')
        game.load.image('cut1', 'assets/image/farm/cut2.png')
        game.load.image('field', 'assets/image/farm/grow.png')
        game.load.image('grass_0', 'assets/image/farm/grass_0.png')
        game.load.image('grass_1', 'assets/image/farm/grass_1.png')
        game.load.image('grass_2', 'assets/image/farm/grass_2.png')
        game.load.image('grass_3', 'assets/image/farm/grass_3.png')
        game.load.image('grass_4', 'assets/image/farm/grass_4.png')
        game.load.image('moneyseed_0', 'assets/image/farm/moneyseed_0.png')
        game.load.image('moneyseed_1', 'assets/image/farm/moneyseed_1.png')
        game.load.image('moneyseed_2', 'assets/image/farm/moneyseed_2.png')
        game.load.image('moneyseed_3', 'assets/image/farm/moneyseed_3.png')
        game.load.image('btn_plant', 'assets/image/farm/btn_plant.png')
        game.load.image('btn_moneyseed', 'assets/image/farm/btn_moneyseed.png')
        game.load.image('btn_grass', 'assets/image/farm/btn_grass.png')
        game.load.image('btn_killPlant', 'assets/image/farm/btn_killPlant.png')
        game.load.image('box_seed', 'assets/image/farm/square.png')
        game.load.image('fish_0', 'assets/image/farm/fish_0.png')
        game.load.image('fish_1', 'assets/image/farm/fish_1.png')
        game.load.image('fish_2', 'assets/image/farm/fish_2.png')
        game.load.image('fish_3', 'assets/image/farm/fish_3.png')
        game.load.image('fish_4', 'assets/image/farm/fish_4.png')
        game.load.image('fishMenu', 'assets/image/farm/dialogueBox.png')
        game.load.image('treasureBox', 'assets/image/farm/treasureBox.png')
        game.load.image('btn_close', 'assets/image/farm/btn_close.png')
        game.load.spritesheet('fishing_ani', 'assets/image/farm/fishing_ani.png', 150, 143);
        game.load.spritesheet('fish_gone', 'assets/image/farm/fish_gone.png', 127, 234);
        game.load.image('fail', 'assets/image/farm/fail.png');

        //ui
        game.load.image('clock', 'assets/image/UI/clock_white.png');
        game.load.image('arror', 'assets/image/UI/arror_white.png');
        game.load.image('short_arror', 'assets/image/UI/short_arror_white.png');
        game.load.spritesheet('fire', 'assets/image/UI/fire.png', 277, 336);
        game.load.spritesheet('fire_small', 'assets/image/UI/fire_small.png', 234, 208)
        game.load.spritesheet('fire_middle', 'assets/image/UI/fire_middle.png', 550, 400)

        //forest
        game.load.audio('enterbattle', 'assets/audio/enterbattle.mp3');

        //battle
        game.load.spritesheet('main', 'assets/image/leading role/main.png', 64, 96);
        game.load.spritesheet('attack1', 'assets/image/skill/attack1.png', 388, 149);
        game.load.spritesheet('attack2', 'assets/image/skill/attack2.png', 134, 141);
        game.load.spritesheet('heallife', 'assets/image/skill/heallife.png', 200, 500);
        game.load.spritesheet('healmagic', 'assets/image/skill/healmagic.png', 200, 500);
        game.load.spritesheet('shield', 'assets/image/skill/shield.png', 250, 250);
        game.load.image('mouse', 'assets/image/fight ui/mouse.png', 32, 32);
        game.load.image('attack', 'assets/image/fight ui/attack.png', 128, 128);
        game.load.image('escape', 'assets/image/fight ui/escape.png', 128, 128);
        game.load.image('cure', 'assets/image/fight ui/heal.png', 128, 128);
        game.load.image('return', 'assets/image/fight ui/return.png', 80, 80);
        game.load.image('forest1', 'assets/image/map/forest1.jpg', 1024, 615);
        game.load.image('container', 'assets/image/fight ui/container.png', 135, 135);
        game.load.image('uiattack1', 'assets/image/fight ui/uiattack1.png', 128, 128);
        game.load.image('uiattack2', 'assets/image/fight ui/uiattack2.png', 128, 128);
        game.load.image('uiattack3', 'assets/image/fight ui/uiattack3.png', 128, 128);
        game.load.image('uiattack4', 'assets/image/fight ui/uiattack4.png', 128, 128);
        game.load.image('uiattack5', 'assets/image/fight ui/uiattack5.png', 128, 128);
        game.load.image('uiattack6', 'assets/image/fight ui/uiattack6.png', 128, 128);
        game.load.image('rest', 'assets/image/fight ui/skill_rest.png', 128, 128);
        game.load.image('heal', 'assets/image/fight ui/skill_heal.png', 128, 128);
        game.load.image('defence', 'assets/image/fight ui/skill_defence.png', 128, 128);
        game.load.image('rebound', 'assets/image/fight ui/skill_rebound.png', 128, 128);

        game.load.image('life1', 'assets/image/fight ui/life1.png', 68, 14);
        game.load.image('life2', 'assets/image/fight ui/life2.png', 68, 14);
        game.load.image('life3', 'assets/image/fight ui/life3.png', 68, 14);
        game.load.image('life4', 'assets/image/fight ui/life4.png', 68, 14);
        game.load.image('life5', 'assets/image/fight ui/life5.png', 68, 14);
        game.load.image('life6', 'assets/image/fight ui/life6.png', 68, 14);
        game.load.image('life7', 'assets/image/fight ui/life7.png', 68, 14);
        game.load.image('life8', 'assets/image/fight ui/life8.png', 68, 14);
        game.load.image('life9', 'assets/image/fight ui/life9.png', 68, 14);
        game.load.image('life10', 'assets/image/fight ui/life10.png', 68, 19);

        game.load.image('magic1', 'assets/image/fight ui/magic1.png', 67, 14);
        game.load.image('magic2', 'assets/image/fight ui/magic2.png', 67, 14);
        game.load.image('magic3', 'assets/image/fight ui/magic3.png', 67, 14);
        game.load.image('magic4', 'assets/image/fight ui/magic4.png', 67, 14);
        game.load.image('magic5', 'assets/image/fight ui/magic5.png', 67, 14);
        game.load.image('magic6', 'assets/image/fight ui/magic6.png', 67, 14);
        game.load.image('magic7', 'assets/image/fight ui/magic7.png', 67, 14);
        game.load.image('magic8', 'assets/image/fight ui/magic8.png', 67, 15);
        game.load.image('magic9', 'assets/image/fight ui/magic9.png', 67, 14);
        game.load.image('magic10', 'assets/image/fight ui/magic10.png', 67, 18);

        game.load.audio('battle_bgm', 'assets/audio/europe battle bgm.mp3');
        game.load.audio('enemyattack_audio1', 'assets/audio/enemyhit_audio1.mp3');
        game.load.audio('attack_audio1', 'assets/audio/attack_audio1.mp3');
        game.load.audio('win', 'assets/audio/win.mp3');

        game.load.bitmapFont('fightnumber', 'assets/image/word/fightnumber.png', 'assets/image/word/fightnumber.xml');
        game.load.spritesheet('attack3', 'assets/image/skill/attack3.png', 384, 355);
        game.load.spritesheet('attack4', 'assets/image/skill/attack4.png', 201, 153);
        game.load.spritesheet('attack5', 'assets/image/skill/attack5.png', 230, 243);
        game.load.spritesheet('attack6', 'assets/image/skill/attack6.png', 318, 273);
        game.load.spritesheet('partial_rebound', 'assets/image/skill/partial_rebound.png', 240, 225);
        game.load.spritesheet('burn', 'assets/image/skill/burn.png', 300, 300);
        game.load.audio('attack_audio2', 'assets/audio/attack_audio2.mp3');
        game.load.audio('attack_audio3', 'assets/audio/attack_audio3.wav');
        game.load.audio('attack_audio4', 'assets/audio/attack_audio4.mp3');
        game.load.audio('attack_audio5', 'assets/audio/attack_audio5.wav');
        game.load.audio('attack_audio6', 'assets/audio/attack_audio6.wav');
        game.load.audio('heal_audio1', 'assets/audio/heallife_audio.mp3');
        game.load.audio('heal_audio2', 'assets/audio/healmagic_audio.mp3');
        game.load.audio('heal_audio3', 'assets/audio/shield.mp3');
        game.load.audio('heal_audio4', 'assets/audio/rebound.mp3');
        game.load.audio('burn_audio', 'assets/audio/burn.mp3');
        game.load.audio('enter_sound', 'assets/audio/enter_sound.mp3');
        

        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    loadComplete: function () {
        this.ready = true;

        game.stage.backgroundColor = '#000000';
        //game.physics.setBoundsToWorld();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        game.input.mouse.capture = true;
    },
    update: function () {
        if (this.ready === true) {
            game.state.start('menu');
        }
    }
};