Technotip.Preloader = function (game) {
    this.ready = false;
};

Technotip.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(100, 30, 'preloadbar');
        this.load.setPreloadSprite(this.preloadBar);

        //menu
        this.load.audio('menu_bgm', ['assets/audio/menu_bgm.mp3']);
        this.load.image('background', 'assets/image/menu/background_menu.jpg');
        this.load.image('arrow', 'assets/image/menu/arrow.png');
        this.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');

        //setting
        this.load.image('setting-bar', 'assets/image/setting/setting-rect.png');
        this.load.image('setting-control', 'assets/image/setting/setting-circle.png');

        //main
        this.load.spritesheet('player', 'assets/image/main/charactor.png', 29, 32);

        //function 
        this.load.image('Bag', 'assets/image/main/button_bag.png');
        this.load.image('Map', 'assets/image/main/button_map.png');
        //function background
        this.load.image('bag_0', 'assets/image/main/packbag0.png');
        this.load.image('bag_1', 'assets/image/main/packbag1.png');
        this.load.image('bag_2', 'assets/image/main/packbag2.png');
        this.load.image('bag_3', 'assets/image/main/packbag3.png');

        //map 
        this.load.tilemap('house_map', 'assets/image/map/map_room.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles1', 'assets/image/map/spritesheet1.png');
        this.load.image('tiles2', 'assets/image/map/spritesheet2.png');
        this.load.image('tiles3', 'assets/image/map/spritesheet3.png');
        this.load.image('tiles4', 'assets/image/map/spritesheet4.png');

        //message block
        this.load.image('msgblock_1', 'assets/image/main/messageblock_1.png')
        this.load.image('msgblock_2', 'assets/image/main/messageblock_2.png')

        //farm
        this.load.image('farm_bg', 'assets/image/farm/back.png');
        this.load.image('pond', 'assets/image/farm/sea1.png');
        this.load.image('pond1', 'assets/image/farm/sea2.png');
        this.load.image('house', 'assets/image/farm/house.png')
        this.load.image('trees', 'assets/image/farm/trees.png')
        this.load.image('tree', 'assets/image/farm/tree.png')
        this.load.image('cut', 'assets/image/farm/cut.png')
        this.load.image('cut1', 'assets/image/farm/cut2.png')
        this.load.image('field', 'assets/image/farm/grow.png')
        this.load.image('grass_0', 'assets/image/farm/grass_0.png')
        this.load.image('grass_1', 'assets/image/farm/grass_1.png')
        this.load.image('grass_2', 'assets/image/farm/grass_2.png')
        this.load.image('grass_3', 'assets/image/farm/grass_3.png')
        this.load.image('grass_4', 'assets/image/farm/grass_4.png')
        this.load.image('moneyseed_0', 'assets/image/farm/moneyseed_0.png')
        this.load.image('moneyseed_1', 'assets/image/farm/moneyseed_1.png')
        this.load.image('moneyseed_2', 'assets/image/farm/moneyseed_2.png')
        this.load.image('moneyseed_3', 'assets/image/farm/moneyseed_3.png')
        this.load.image('btn_plant', 'assets/image/farm/btn_plant.png')
        this.load.image('btn_moneyseed', 'assets/image/farm/btn_moneyseed.png')
        this.load.image('btn_grass', 'assets/image/farm/btn_grass.png')
        this.load.image('btn_killPlant', 'assets/image/farm/btn_killPlant.png')
        this.load.image('box_seed', 'assets/image/farm/square.png')
        this.load.image('fish_0', 'assets/image/farm/fish_0.png')
        this.load.image('fish_1', 'assets/image/farm/fish_1.png')
        this.load.image('fish_2', 'assets/image/farm/fish_2.png')
        this.load.image('fish_3', 'assets/image/farm/fish_3.png')
        this.load.image('fish_4', 'assets/image/farm/fish_4.png')
        this.load.image('fishMenu', 'assets/image/farm/dialogueBox.png')
        this.load.image('treasureBox', 'assets/image/farm/treasureBox.png')
        this.load.image('btn_close', 'assets/image/farm/btn_close.png')
        this.load.spritesheet('fishing_ani', 'assets/image/farm/fishing_ani.png', 150, 143);
        this.load.spritesheet('fish_gone', 'assets/image/farm/fish_gone.png', 127, 234);
        this.load.image('fail', 'assets/image/farm/fail.png');

        //ui
        this.load.image('clock', 'assets/image/UI/clock_white.png');
        this.load.image('arror', 'assets/image/UI/arror_white.png');
        this.load.image('short_arror', 'assets/image/UI/short_arror_white.png');
        this.load.spritesheet('fire', 'assets/image/UI/fire.png', 277, 336);
        this.load.spritesheet('fire_small', 'assets/image/UI/fire_small.png', 234, 208)
        this.load.spritesheet('fire_middle', 'assets/image/UI/fire_middle.png', 550, 400)

        //forest
        this.load.audio('enterbattle', 'assets/audio/enterbattle.mp3');
        this.load.tilemap('forest_map', 'assets/image/map/map_forest.json', null, Phaser.Tilemap.TILED_JSON);
        //battle
        this.load.spritesheet('main', 'assets/image/leading role/main.png', 64, 96);
        this.load.spritesheet('attack1', 'assets/image/skill/attack1.png', 388, 149);
        this.load.spritesheet('attack2', 'assets/image/skill/attack2.png', 134, 141);
        this.load.spritesheet('heallife', 'assets/image/skill/heallife.png', 200, 500);
        this.load.spritesheet('healmagic', 'assets/image/skill/healmagic.png', 200, 500);
        this.load.spritesheet('shield', 'assets/image/skill/shield.png', 250, 250);
        this.load.image('mouse', 'assets/image/fight ui/mouse.png', 32, 32);
        this.load.image('attack', 'assets/image/fight ui/attack.png', 128, 128);
        this.load.image('escape', 'assets/image/fight ui/escape.png', 128, 128);
        this.load.image('cure', 'assets/image/fight ui/heal.png', 128, 128);
        this.load.image('return', 'assets/image/fight ui/return.png', 80, 80);
        this.load.image('forest1', 'assets/image/map/forest1.jpg', 1024, 615);
        this.load.image('container', 'assets/image/fight ui/container.png', 135, 135);
        this.load.image('uiattack1', 'assets/image/fight ui/uiattack1.png', 128, 128);
        this.load.image('uiattack2', 'assets/image/fight ui/uiattack2.png', 128, 128);
        this.load.image('uiattack3', 'assets/image/fight ui/uiattack3.png', 128, 128);
        this.load.image('uiattack4', 'assets/image/fight ui/uiattack4.png', 128, 128);
        this.load.image('uiattack5', 'assets/image/fight ui/uiattack5.png', 128, 128);
        this.load.image('uiattack6', 'assets/image/fight ui/uiattack6.png', 128, 128);
        this.load.image('rest', 'assets/image/fight ui/skill_rest.png', 128, 128);
        this.load.image('heal', 'assets/image/fight ui/skill_heal.png', 128, 128);
        this.load.image('defence', 'assets/image/fight ui/skill_defence.png', 128, 128);
        this.load.image('rebound', 'assets/image/fight ui/skill_rebound.png', 128, 128);

        this.load.image('life1', 'assets/image/fight ui/life1.png', 68, 14);
        this.load.image('life2', 'assets/image/fight ui/life2.png', 68, 14);
        this.load.image('life3', 'assets/image/fight ui/life3.png', 68, 14);
        this.load.image('life4', 'assets/image/fight ui/life4.png', 68, 14);
        this.load.image('life5', 'assets/image/fight ui/life5.png', 68, 14);
        this.load.image('life6', 'assets/image/fight ui/life6.png', 68, 14);
        this.load.image('life7', 'assets/image/fight ui/life7.png', 68, 14);
        this.load.image('life8', 'assets/image/fight ui/life8.png', 68, 14);
        this.load.image('life9', 'assets/image/fight ui/life9.png', 68, 14);
        this.load.image('life10', 'assets/image/fight ui/life10.png', 68, 19);

        this.load.image('magic1', 'assets/image/fight ui/magic1.png', 67, 14);
        this.load.image('magic2', 'assets/image/fight ui/magic2.png', 67, 14);
        this.load.image('magic3', 'assets/image/fight ui/magic3.png', 67, 14);
        this.load.image('magic4', 'assets/image/fight ui/magic4.png', 67, 14);
        this.load.image('magic5', 'assets/image/fight ui/magic5.png', 67, 14);
        this.load.image('magic6', 'assets/image/fight ui/magic6.png', 67, 14);
        this.load.image('magic7', 'assets/image/fight ui/magic7.png', 67, 14);
        this.load.image('magic8', 'assets/image/fight ui/magic8.png', 67, 15);
        this.load.image('magic9', 'assets/image/fight ui/magic9.png', 67, 14);
        this.load.image('magic10', 'assets/image/fight ui/magic10.png', 67, 18);

        this.load.audio('battle_bgm', 'assets/audio/europe battle bgm.mp3');
        this.load.audio('enemyattack_audio1', 'assets/audio/enemyhit_audio1.mp3');
        this.load.audio('attack_audio1', 'assets/audio/attack_audio1.mp3');
        this.load.audio('win', 'assets/audio/win.mp3');

        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    loadComplete: function () {
        this.ready = true;
    },
    update: function () {
        if (this.ready === true) {
            this.state.start('menu');
        }
    }
};