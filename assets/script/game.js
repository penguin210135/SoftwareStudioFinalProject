var mainState = {
    preload: function () {

    },
    create: function () {
        /*Default Init*/
        //game.world.resize(6000, 600);
        game.world.setBounds(0, 0, 2000, 2000);
        game.stage.backgroundColor = '#000000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        //input
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;

        //set the default background
        this.wall = game.add.group();
        this.wall.enableBody = true;
        this.House();


        //player
        this.player = game.add.sprite(game.width / 2, game.height / 2, 'player');
        this.player.animations.add('down', [0, 3, 6], 6);    //player animations
        this.player.animations.add('up', [2, 5, 8], 6);

        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.movetime = game.time.now;
        this.game.camera.follow(this.player);
        /*
        this.player.move_x = 10;
        this.player.move_y = 10;
        this.player.destin_x = 300;
        this.player.destin_y = 315;
        */

        //Timer

        //Add button and set hot key
        //bag
        this.bagimage = game.add.image(200, 100, 'bag');
        this.bagimage.height = game.height - 100;
        this.bagimage.width = game.width - 200;
        this.bagimage.alpha = 0;
        this.bagbutton = game.add.button(1160 - 200 - 50, 720 - 100, 'Bag', this.BagOnClick, this);
        this.bagbutton.fixedToCamera = true;
        this.bagbutton.height = 100;
        this.bagbutton.width = 100;
        this.keyboard_B = game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.keyboard_B.onDown.add(this.BagOnClick, this);
        this.BagOpen = false;
        //map
        this.mapimage = game.add.image(200, 100, 'background');
        this.mapimage.height = game.height - 100;
        this.mapimage.width = game.width - 200;
        this.mapimage.alpha = 0;
        this.mapbutton = game.add.button(1160 - 100, 720 - 100, 'Map', this.MapOnClick, this);
        this.mapbutton.fixedToCamera = true;
        this.mapbutton.height = 100;
        this.mapbutton.width = 100;
        this.keyboard_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.keyboard_M.onDown.add(this.MapOnClick, this);
        this.MapOpen = false;

    },

    update: function () {

        game.physics.arcade.collide(this.player, this.wall);

        //Bag open
        if (this.BagOpen) {
            if (game.input.mousePointer.x <= 1160 && game.input.mousePointer.x >= 200 && game.input.mousePointer.y >= 100 && game.input.mousePointer.y <= 720) {
                if (game.input.activePointer.leftButton.isDown) {
                    console.log("Use the bag!!");
                }
            } else {
                if (game.input.activePointer.leftButton.isDown) {
                    //click outside the bag,then close the bag
                    this.BagOnClick();
                }
            }

        } else if (this.MapOpen) {
            if (game.input.mousePointer.x <= 1160 && game.input.mousePointer.x >= 200 && game.input.mousePointer.y >= 100 && game.input.mousePointer.y <= 720) {
                if (game.input.activePointer.leftButton.isDown) {
                    console.log("Use the Map!!");
                }
            } else {
                if (game.input.activePointer.leftButton.isDown) {
                    //click outside the map,then close the map
                }
            }
        }
        //player moving
        if (game.time.now - this.player.movetime > 1000) {
            this.moveplayer();
        }

        /*
        if (game.input.mousePointer.x <= 1070 && game.input.mousePointer.x >= 90 && game.input.mousePointer.y >= 40 && game.input.mousePointer.y <= 680) {
            if (game.input.activePointer.leftButton.isDown) {

                //set destination point
                this.player.destin_x = game.input.mousePointer.x;
                this.player.destin_y = game.input.mousePointer.y;
                //player moving
            }

            this.moveplayer();
        }
        */
    },

    House: function () {

        let housemap = [];
        housemap[0] = [1, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        housemap[1] = [4, 7, 7, 7, 7, 7, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        housemap[2] = [4, 8, 8, 8, 8, 8, 8, 4, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 3];
        housemap[3] = [4, 11, 11, 11, 11, 11, 11, 4, 0, 0, 0, 0, 0, 4, 7, 7, 7, 7, 7, 7, 7, 4];
        housemap[4] = [4, 11, 11, 11, 11, 11, 11, 4, 0, 0, 0, 0, 0, 4, 8, 8, 8, 8, 8, 8, 8, 4];
        housemap[5] = [4, 11, 11, 11, 11, 11, 11, 4, 0, 0, 0, 0, 0, 4, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[6] = [4, 11, 11, 11, 11, 11, 11, 5, 2, 2, 2, 2, 2, 6, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[7] = [4, 11, 11, 11, 11, 11, 11, 7, 7, 7, 7, 7, 7, 7, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[8] = [4, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[9] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[10] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[11] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[12] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[13] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[14] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[15] = [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 0, 0, 10, 2, 2, 2, 6];
        housemap[16] = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7];
        var width = housemap[0].length;
        var height = 17;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var x = 100 + 32 * j;
                var y = 100 + 32 * i;
                switch (housemap[i][j]) {
                    case 1:
                        var tmp = game.add.sprite(x, y, 'wall_1');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 2:
                        var tmp = game.add.sprite(x, y, 'wall_2');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 3:
                        var tmp = game.add.sprite(x, y, 'wall_3');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 4:
                        var tmp = game.add.sprite(x, y, 'wall_4');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 5:
                        var tmp = game.add.sprite(x, y, 'wall_5');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 6:
                        var tmp = game.add.sprite(x, y, 'wall_6');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 7:
                        var tmp = game.add.sprite(x, y, 'wall_7');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 8:
                        var tmp = game.add.sprite(x, y, 'wall_8');
                        break;
                    case 9:
                        var tmp = game.add.sprite(x, y, 'wall_9');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 10:
                        var tmp = game.add.sprite(x, y, 'wall_10');
                        game.physics.arcade.enable(tmp);
                        tmp.body.immovable = true;
                        this.wall.add(tmp);
                        break;
                    case 11:
                        var tmp = game.add.sprite(x, y, 'floor');
                        break;

                }
            }
        }


    },

    Farm: function () {
        let housemap = [];
        housemap[0] = [1, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        housemap[1] = [4, 7, 7, 7, 7, 7, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        housemap[2] = [4, 8, 8, 8, 8, 8, 8, 4, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 3];
        housemap[3] = [4, 11, 11, 11, 11, 11, 11, 4, 0, 0, 0, 0, 0, 4, 7, 7, 7, 7, 7, 7, 7, 4];
        housemap[4] = [4, 11, 11, 11, 11, 11, 11, 4, 0, 0, 0, 0, 0, 4, 8, 8, 8, 8, 8, 8, 8, 4];
        housemap[5] = [4, 11, 11, 11, 11, 11, 11, 4, 0, 0, 0, 0, 0, 4, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[6] = [4, 11, 11, 11, 11, 11, 11, 5, 2, 2, 2, 2, 2, 6, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[7] = [4, 11, 11, 11, 11, 11, 11, 7, 7, 7, 7, 7, 7, 7, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[8] = [4, 11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[9] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[10] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[11] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[12] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[13] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[14] = [4, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 4];
        housemap[15] = [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 0, 0, 10, 2, 2, 2, 6];
        housemap[16] = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7];
    }
    ,
    moveplayer: function () {

        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;

        } else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
        } else if (this.cursor.up.isDown) {
            this.player.body.velocity.y = -200;
            this.player.animations.play('up');
        } else if (this.cursor.down.isDown) {
            this.player.body.velocity.y = 200;
            this.player.animations.play('down');
        } else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.animations.stop();
        }



        //player move - x axis
        /*
        if (this.player.x < this.player.destin_x) {
            if (this.player.x + this.player.move_x >= this.player.destin_x) {
                this.player.x = this.player.destin_x;
            } else {
                this.player.x += this.player.move_x;
            }
        } else if (this.player.x > this.player.destin_x) {
            if (this.player.x - this.player.move_x <= this.player.destin_x) {
                this.player.x = this.player.destin_x;
            } else {
                this.player.x -= this.player.move_x;
            }
        } else {
            this.player.x = this.player.destin_x;
        }
        //player move - y axis
        if (this.player.y < this.player.destin_y) {
            if (this.player.y + this.player.move_y >= this.player.destin_y) {
                this.player.y = this.player.destin_y;
            } else {
                this.player.y += this.player.move_y;
            }
        } else if (this.player.y > this.player.destin_y) {
            if (this.player.y - this.player.move_y <= this.player.destin_y) {
                this.player.y = this.player.destin_y;
            } else {
                this.player.y -= this.player.move_y;
            }
        } else {
            this.player.y = this.player.destin_y;
        }
        */
    },

    BagOnClick: function () {

        if (this.BagOpen == false) {
            console.log('Open the Bag!');
            this.initOpen();
            this.BagOpen = true;
            game.add.tween(this.bagimage).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        } else {
            console.log('Close the Bag!');
            this.initOpen();

        }
    },

    MapOnClick: function () {
        if (this.MapOpen == false) {
            console.log('Open the Map!');
            this.initOpen();
            this.MapOpen = true;
            game.add.tween(this.mapimage).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        } else {
            console.log('Close the Map!');
            this.initOpen();
        }
    },

    initOpen: function () {
        this.MapOpen = false;
        this.BagOpen = false;
        game.add.tween(this.bagimage).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(this.mapimage).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    },
};