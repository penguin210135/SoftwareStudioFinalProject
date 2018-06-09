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

        //main
        this.load.spritesheet('player', 'assets/image/charactor.png', 32, 32);

        //function background
        this.load.image('bag', 'assets/image/bag.jpg');
        
        //building
        this.load.spritesheet('wall_1', 'assets/image/building/wall1.png', 32, 32);
        this.load.spritesheet('wall_2', 'assets/image/building/wall2.png', 32, 32);
        this.load.spritesheet('wall_3', 'assets/image/building/wall3.png', 32, 32);
        this.load.spritesheet('wall_4', 'assets/image/building/wall4.png', 32, 32);
        this.load.spritesheet('wall_5', 'assets/image/building/wall5.png', 32, 32);
        this.load.spritesheet('wall_6', 'assets/image/building/wall6.png', 32, 32);
        this.load.spritesheet('wall_7', 'assets/image/building/wall7.png', 32, 32);
        this.load.spritesheet('wall_8', 'assets/image/building/wall8.png', 32, 32);
        this.load.spritesheet('wall_9', 'assets/image/building/wall9.png', 32, 32);
        this.load.spritesheet('wall_10', 'assets/image/building/wall10.png', 32, 32);
        this.load.spritesheet('floor', 'assets/image/building/floor.png', 32, 32);

        this.load.image('Bag', 'assets/image/item/mashroom.png');
        this.load.image('Map', 'assets/image/item/vegetable.png');

        
        //farm
        this.load.image('farm_bg', 'assets/image/farm/farm_bg.jpeg');
        this.load.image('pond', 'assets/image/farm/farm_pond.png');
        this.load.image('cushion', 'assets/image/farm/cushion.png')
        this.load.image('btn_fish', 'assets/image/farm/btn_fish.png')
        this.load.image('house', 'assets/image/farm/house.png')
        this.load.image('field', 'assets/image/farm/field.png')
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