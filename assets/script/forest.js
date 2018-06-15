var forestState = {
    preload: function () {

    },
    create: function () {

        this.forest_map = game.add.tilemap('forest_map');

        // 新增圖塊 addTilesetImage( '圖塊名稱' , 'load 時png的命名' )
        this.forest_map.addTilesetImage('tileset1', 'tiles1');
        this.forest_map.addTilesetImage('tileset2', 'tiles2');
        this.forest_map.addTilesetImage('tileset3', 'tiles3');

        // 建立圖層 (圖層名稱為 tile 中所設定)
        this.map_floor = this.forest_map.createLayer('floor');
        this.map_ground = this.forest_map.createLayer('groud');
        this.map_tree = this.forest_map.createLayer('tree');
        this.map_npc = this.forest_map.createLayer('npc');
    
        this.map_floor.anchor.set(-0.035,-0.02);
        this.map_ground.anchor.set(-0.035,-0.02);
        this.map_tree.anchor.set(-0.035,-0.02);
        this.map_npc.anchor.set(-0.035,-0.02);
        //this.layer1.x = 200;

        this.forest_map.setCollisionBetween(286, 315, true, this.map_tree);

        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;

        createplayer(this);
        if(pre_state == "farm"){
            this.player.position.setTo(580,20);
        }
        this.player_prex = this.player.position.x;
        this.player_prey = this.player.position.y;


        this.enterbattle = game.add.audio('enterbattle');

        this.keyboard = game.input.keyboard.addKeys({
            'enter': Phaser.Keyboard.ENTER,
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT,
            'w': Phaser.Keyboard.W,
            'a': Phaser.Keyboard.A,
            's': Phaser.Keyboard.S,
            'd': Phaser.Keyboard.D
        });
    },
    update: function () {

        game.physics.arcade.collide(this.player, this.map_tree);

        moveplayer(this.cursor, this.player);
        if (this.player_prex != this.player.position.x || this.player_prey != this.player.position.y) {
            this.fight_random();
        }
        if(this.player.y <= 20){
            if(this.cursor.up.isDown){
                pre_state = "forest"
                game.state.start('farm'); 
            }
        }
    },
    fight_random: function () {
        var temp = Math.floor(Math.random() * 200);
        if (temp == 0) {
            this.enterbattle.play();
            game.camera.shake(0.02, 300);
            ConsumeTime(10,50);
            game.time.events.add(500, function () { game.state.start('fight'); }, this);
            
        }
    }
};