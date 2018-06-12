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
        this.load.image('Bag', 'assets/image/item/mashroom.png');
        this.load.image('Map', 'assets/image/main/map.png');
        //function background
        this.load.image('bag', 'assets/image/bag.jpg');

        //map 
        this.load.tilemap('map', 'assets/image/map/map_room.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles1', 'assets/image/map/spritesheet1.png');
        this.load.image('tiles2', 'assets/image/map/spritesheet2.png');
        this.load.image('tiles3', 'assets/image/map/spritesheet3.png');
        this.load.image('tiles4', 'assets/image/map/spritesheet4.png');

        //message block
        this.load.image('msgblock_1', 'assets/image/main/messageblock_1.png')
        this.load.image('msgblock_2', 'assets/image/main/messageblock_2.png')

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