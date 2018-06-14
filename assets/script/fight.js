var fightState = {
    preload: function () {
        this.enemy_random = Math.floor(Math.random()*4);
        if(this.enemy_random == 1)
            game.load.spritesheet('enemy1', 'assets/image/monster/snake_144x100.png', 144, 100);
        else if(this.enemy_random == 2)
            game.load.spritesheet('enemy1', 'assets/image/monster/dragon_188x171.png', 188, 171);
        else if(this.enemy_random == 3)
            game.load.spritesheet('enemy1', 'assets/image/monster/octopus_76x84.png', 76, 84);
        else
            game.load.spritesheet('enemy1', 'assets/image/monster/enemy1.png', 75, 75.5);
    },
    create: function () {
        this.life = mainlife;
        this.magic = 3;
        this.enemymagic = 3;
        this.animation_index = 0;//決定撥放哪個動畫
        this.enemytime = 0;//延遲用
        this.burn = false;//燒傷狀態
        this.attackbuff = 0;//增加攻擊力
        this.defendbuff = 0;//增加防禦力
        this.absolute_defence = false;//絕對防禦
        this.partial_rebound = false;//部分反彈
        this.enemydie = false;//敵人是否死亡
        this.playerdie = false;//自己是否死亡
        this.life_array = [];
        this.magic_array = [];
        this.enemylife_array = [];
        this.enemymagic_array = []

        var bg = game.add.image(0, 0, 'forest1');
        bg.height = game.height;
        bg.width = game.width;

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

        //this.player = game.add.sprite(950,350,'mainwalk');
        //this.player.animations.add('down',[0,1,2,3],8);
        //this.player.animations.add('left',[4,5,6,7],8);
        //this.player.animations.add('right',[8,9,10,11],8);
        //this.player.animations.add('up',[12,13,14,15],8);

        this.main = game.add.sprite(880, 300, 'main');
        this.main.height = 150;
        this.main.width = 100;
        this.main.animations.add('fly', [0, 1, 2, 3, 4, 5], 8, true);
        this.main.animations.play('fly');
        game.physics.arcade.enable(this.main);

        //enemy set
        if (this.enemy_random == 1) {//snake
            this.enemylife = snake_life;
            this.main_enemylife = snake_life;
            this.enemy1 = game.add.sprite(130, 250, 'enemy1');
            this.enemy1.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
            this.enemy1.height = 200;
            this.enemy1.width = 210;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else if (this.enemy_random == 2) {//dragon
            this.enemylife = dragon_life;
            this.main_enemylife = dragon_life;
            this.enemy1 = game.add.sprite(80, 180, 'enemy1');
            this.enemy1.animations.add('move', [0, 1, 2, 3, 4, 5], 8, true);
            this.enemy1.height = 300;
            this.enemy1.width = 300;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else if (this.enemy_random == 3) {//octopus
            this.enemylife = octopus_life;
            this.main_enemylife = octopus_life;
            this.enemy1 = game.add.sprite(160, 270, 'enemy1');
            this.enemy1.animations.add('move', [0, 1, 2, 3], 8, true);
            this.enemy1.height = 180;
            this.enemy1.width = 180;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else {//ghost
            this.enemylife = ghost_life;
            this.main_enemylife = octopus_life;
            this.enemy1 = game.add.sprite(160, 300, 'enemy1');
            this.enemy1.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 8, true);
            this.enemy1.height = 125;
            this.enemy1.width = 121.7;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }



        //主角生命
        this.container = game.add.image(950, 50, 'container');
        this.life1 = game.add.image(950, 50, 'life1');
        this.life2 = game.add.image(950, 63, 'life2');
        this.life3 = game.add.image(950, 76, 'life3');
        this.life4 = game.add.image(950, 89, 'life4');
        this.life5 = game.add.image(950, 102, 'life5');
        this.life6 = game.add.image(950, 115, 'life6');
        this.life7 = game.add.image(950, 128, 'life7');
        this.life8 = game.add.image(950, 141, 'life8');
        this.life9 = game.add.image(950, 154, 'life9');
        this.life10 = game.add.image(950, 167, 'life10');
        this.life_array[0] = this.life1;
        this.life_array[1] = this.life2;
        this.life_array[2] = this.life3;
        this.life_array[3] = this.life4;
        this.life_array[4] = this.life5;
        this.life_array[5] = this.life6;
        this.life_array[6] = this.life7;
        this.life_array[7] = this.life8;
        this.life_array[8] = this.life9;
        this.life_array[9] = this.life10;

        this.magic1 = game.add.image(1018, 50, 'magic1');
        this.magic2 = game.add.image(1018, 63, 'magic2');
        this.magic3 = game.add.image(1018, 76, 'magic3');
        this.magic4 = game.add.image(1018, 89, 'magic4');
        this.magic5 = game.add.image(1018, 102, 'magic5');
        this.magic6 = game.add.image(1018, 115, 'magic6');
        this.magic7 = game.add.image(1018, 128, 'magic7');
        this.magic8 = game.add.image(1018, 141, 'magic8');
        this.magic9 = game.add.image(1018, 155, 'magic9');
        this.magic10 = game.add.image(1018, 168, 'magic10');
        this.magic_array[0] = this.magic1;
        this.magic_array[1] = this.magic2;
        this.magic_array[2] = this.magic3;
        this.magic_array[3] = this.magic4;
        this.magic_array[4] = this.magic5;
        this.magic_array[5] = this.magic6;
        this.magic_array[6] = this.magic7;
        this.magic_array[7] = this.magic8;
        this.magic_array[8] = this.magic9;
        this.magic_array[9] = this.magic10;

        //敵人生命
        this.enemycontainer = game.add.image(80, 50, 'container');
        this.enemylife1 = game.add.image(80, 50, 'life1');
        this.enemylife2 = game.add.image(80, 63, 'life2');
        this.enemylife3 = game.add.image(80, 76, 'life3');
        this.enemylife4 = game.add.image(80, 89, 'life4');
        this.enemylife5 = game.add.image(80, 102, 'life5');
        this.enemylife6 = game.add.image(80, 115, 'life6');
        this.enemylife7 = game.add.image(80, 128, 'life7');
        this.enemylife8 = game.add.image(80, 141, 'life8');
        this.enemylife9 = game.add.image(80, 154, 'life9');
        this.enemylife10 = game.add.image(80, 167, 'life10');
        this.enemylife_array[0] = this.enemylife1;
        this.enemylife_array[1] = this.enemylife2;
        this.enemylife_array[2] = this.enemylife3;
        this.enemylife_array[3] = this.enemylife4;
        this.enemylife_array[4] = this.enemylife5;
        this.enemylife_array[5] = this.enemylife6;
        this.enemylife_array[6] = this.enemylife7;
        this.enemylife_array[7] = this.enemylife8;
        this.enemylife_array[8] = this.enemylife9;
        this.enemylife_array[9] = this.enemylife10;

        this.enemymagic1 = game.add.image(148, 50, 'magic1');
        this.enemymagic2 = game.add.image(148, 63, 'magic2');
        this.enemymagic3 = game.add.image(148, 76, 'magic3');
        this.enemymagic4 = game.add.image(148, 89, 'magic4');
        this.enemymagic5 = game.add.image(148, 102, 'magic5');
        this.enemymagic6 = game.add.image(148, 115, 'magic6');
        this.enemymagic7 = game.add.image(148, 128, 'magic7');
        this.enemymagic8 = game.add.image(148, 141, 'magic8');
        this.enemymagic9 = game.add.image(148, 155, 'magic9');
        this.enemymagic10 = game.add.image(148, 168, 'magic10');
        this.enemymagic_array[0] = this.enemymagic1;
        this.enemymagic_array[1] = this.enemymagic2;
        this.enemymagic_array[2] = this.enemymagic3;
        this.enemymagic_array[3] = this.enemymagic4;
        this.enemymagic_array[4] = this.enemymagic5;
        this.enemymagic_array[5] = this.enemymagic6;
        this.enemymagic_array[6] = this.enemymagic7;
        this.enemymagic_array[7] = this.enemymagic8;
        this.enemymagic_array[8] = this.enemymagic9;
        this.enemymagic_array[9] = this.enemymagic10;

        this.main.life = this.life;
        this.enemy1.enemylife = this.enemylife;

        this.battle_bgm = game.add.audio('battle_bgm', 0.9, true);
        this.attack_audio1 = game.add.audio('attack_audio1');
        this.enemyattack_audio1 = game.add.audio('enemyattack_audio1');
        this.battle_bgm.play();
        this.win = game.add.audio('win');

        //攻擊
        this.attack1 = game.add.sprite(69, 300, 'attack1');
        this.attack1.animations.add('hit1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
        this.attack2 = game.add.sprite(179, 300, 'attack2');
        this.attack2.animations.add('hit2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10);

        //defend
        this.heallife = game.add.sprite(850, 100, 'heallife');
        this.heallife.animations.add('heal_life', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 10);
        this.healmagic = game.add.sprite(850, 100, 'healmagic');
        this.healmagic.animations.add('heal_magic', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 10);
        this.shield = game.add.sprite(820, 230, 'shield');
        this.shield.animations.add('heal_shield', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8);

        //enemy 攻擊
        this.enemyattack1 = game.add.sprite(850, 300, 'attack2');
        this.enemyattack1.animations.add('enemyhit2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10);

        this.menu(0);//0 : initial ,1 : return

    },

    update: function () {
        this.check_life_magic();
        console.log(this.animation_index);
        if (this.animation_index == 1) {//attack menu
            if (this.uiattack1.y > 500) {
                this.uiattack1.y -= 7;
                this.uiattack2.y -= 7;
                this.uiattack3.y -= 7;
                this.uiattack4.y -= 7;
                this.uiattack5.y -= 7;
                this.uiattack6.y -= 7;
                this.uiattack1.x -= 8.3;
                this.uiattack2.x -= 4.975;
                this.uiattack3.x -= 1.65;
                this.uiattack4.x += 1.65;
                this.uiattack5.x += 4.975;
                this.uiattack6.x += 8.3;
            }
            else
                this.animation_index = 0;
        }
        else if (this.animation_index == 2) {
            if (this.rest.y > 500) {
                this.rest.y -= 7;
                this.heal.y -= 7;
                this.defence.y -= 7;
                this.rebound.y -= 7;
                this.rest.x -= 4.975;
                this.heal.x -= 1.65;
                this.defence.x += 1.65;
                this.rebound.x += 4.975;
            }
            else
                this.animation_index = 0;
        }
        else if (this.animation_index == 3 && game.time.now > this.enemytime + 1500) {//enemy attack
            if (this.enemydie == false) {
                if (fightState.enemy1.body.x < 900) {
                    fightState.enemy1.body.velocity.x = 600;
                    if (fightState.enemy1.body.x >= 750) {
                        this.enemyattack_audio1.play()
                        this.enemyattack1.animations.play('enemyhit2');
                    }
                }
                else {
                    fightState.enemy1.body.x = 160;
                    fightState.enemy1.body.velocity.x = 0;
                    this.animation_index = 0;
                    if (this.absolute_defence == true) {//還有特效還沒加
                        this.absolute_defence = false;
                    }
                    else if (this.partial_rebound == true) {//還有特效還沒加
                        this.enemylife -= (6 * 0.7);
                        this.life -= ((6 - this.protect) * 0.4);
                        this.partial_rebound = false;
                    }
                    else {
                        if ((protect + this.defendbuff) <= 20) {
                            this.life -= (20 - (protect + this.defendbuff));
                        }
                        this.defendbuff = 0;
                    }
                    this.menu(0);
                }
            }
        }
        else if (this.animation_index == 4) {
            if (this.main.body.x < 1000) {
                this.main.body.velocity.x = 200;
            }
            else {
                this.animation_index = 0;
                var temp = Math.floor(Math.random() * 3);
                if (temp == 0) {
                    game.time.events.add(1000, function () { game.state.start('forest'); this.battle_bgm.stop(); }, this);
                }
                else {
                    this.main.body.x = 880;
                    this.main.body.velocity.x = 0;
                    this.enemyattack(3);
                }
            }
        }
    },

    menu: function (index) {//展開menu，順便處理魔力增加,0:新的一回合 1:從攻擊回來 2:從防禦回來
        this.btn_attack = game.add.button(300, 500, 'attack', function () { this.skill_menu(0) }, this, 2, 1, 0);
        this.btn_heal = game.add.button(500, 500, 'cure', function () { this.skill_menu(1) }, this, 2, 1, 0);
        this.btn_escape = game.add.button(700, 500, 'escape', function () { this.escape(); }, this, 2, 1, 0);
        if (index == 1) {
            this.uiattack1.destroy();
            this.uiattack2.destroy();
            this.uiattack3.destroy();
            this.uiattack4.destroy();
            this.uiattack5.destroy();
            this.uiattack6.destroy();
            this.return.destroy();
        }
        else if (index == 2) {
            this.rest.destroy();
            this.heal.destroy();
            this.defence.destroy();
            this.rebound.destroy();
            this.return.destroy();
        }
        else {
            if (this.magic < 10) {
                this.magic += 1;
            }
        }
    },

    skill_menu: function (index) {
        this.btn_attack.destroy();
        this.btn_heal.destroy();
        this.btn_escape.destroy();
        if (index == 0) {//attack
            this.uiattack1 = game.add.button(543, 700, 'uiattack1', function () { this.attack(1) }, this, 2, 1, 0);
            this.uiattack2 = game.add.button(543, 700, 'uiattack2', function () { this.attack(2) }, this, 2, 1, 0);
            this.uiattack3 = game.add.button(543, 700, 'uiattack3', function () { this.attack(3) }, this, 2, 1, 0);
            this.uiattack4 = game.add.button(543, 700, 'uiattack4', function () { this.attack(4) }, this, 2, 1, 0);
            this.uiattack5 = game.add.button(543, 700, 'uiattack5', function () { this.attack(5) }, this, 2, 1, 0);
            this.uiattack6 = game.add.button(543, 700, 'uiattack6', function () { this.attack(6) }, this, 2, 1, 0);
            this.return = game.add.button(1000, 500, 'return', function () { this.menu(1) }, this, 2, 1, 0);
            this.uiattack1.scale.setTo(0.6, 0.6);
            this.uiattack2.scale.setTo(0.6, 0.6);
            this.uiattack3.scale.setTo(0.6, 0.6);
            this.uiattack4.scale.setTo(0.6, 0.6);
            this.uiattack5.scale.setTo(0.6, 0.6);
            this.uiattack6.scale.setTo(0.6, 0.6);
            this.animation_index = 1;
        }
        else {//defend
            this.rest = game.add.button(543, 700, 'rest', function () { this.defend(1) }, this, 2, 1, 0);
            this.heal = game.add.button(543, 700, 'heal', function () { this.defend(2) }, this, 2, 1, 0);
            this.defence = game.add.button(543, 700, 'defence', function () { this.defend(3) }, this, 2, 1, 0);
            this.rebound = game.add.button(543, 700, 'rebound', function () { this.defend(4) }, this, 2, 1, 0);
            this.return = game.add.button(1000, 500, 'return', function () { this.menu(2) }, this, 2, 1, 0);
            this.rest.scale.setTo(0.6, 0.6);
            this.heal.scale.setTo(0.6, 0.6);
            this.defence.scale.setTo(0.6, 0.6);
            this.rebound.scale.setTo(0.6, 0.6);
            this.animation_index = 2;
        }
    },

    escape: function () {
        console.log('escape');
        this.animation_index = 4;
    },

    attack: function (index) {
        if (index == 1) {
            if (this.magic > 0) {
                this.attack1.animations.play('hit1');
                this.attack_audio1.play();
                this.enemylife -= (5 + this.attackbuff);
                this.magic -= 1;
                this.enemyattack(1);
            }
        }
        else if (index == 2) {
            if (this.magic > 1) {
                this.attack2.animations.play('hit2');
                this.enemylife -= (8 + this.attackbuff);
                this.magic -= 2;
                this.enemyattack(1);
            }
        }
        else if (index == 3) {
            if (this.image > 3) {
                this.enemylife -= (20 + this.attackbuff);
                this.magic -= 4;
                this.burn = true;
                this.enemyattack(1);
            }
        }
        else if (index == 4) {
            if (this.magic > 5) {
                this.enemylife -= (40 + this.attackbuff);
                this.magic -= 6;
            }
        }
        else if (index == 5) {
            if (this.magic > 6) {
                this.enemylife -= (50 + this.attackbuff);
                this.attackbuff += 10;
                this.magic -= 7;
                this.enemyattack(1);
            }
        }
        else if (index == 6) {
            if (this.magic > 8) {
                this.enemylife -= (100 + this.attackbuff);
                this.magic -= 9;
                this.enemyattack(1);
            }
        }

    },

    defend: function (index) {
        if (index == 1) {
            this.defendbuff = 5;
            if (this.magic < 10) {
                this.magic += 1;
            }
            this.healmagic.animations.play('heal_magic');
            this.enemyattack(2);
        }
        if (index == 2) {
            if (this.magic > 1) {
                if (this.life + 20 <= mainlife) {
                    this.life += 20;
                }
                else {
                    this.life = mainlife;
                }
                this.magic -= 2;
                this.heallife.animations.play('heal_life');
                this.enemyattack(2);
            }
        }
        if (index == 3) {
            if (this.magic > 4) {
                this.absolute_defence = true;
                this.magic -= 5;
                this.shield.animations.play('heal_shield');
                this.enemyattack(2);
            }
        }
        if (index == 4) {
            if (this.magic > 5) {
                this.partial_rebound = true;
                this.magic -= 6;
                this.enemyattack(2);
            }
        }
    },

    enemyattack: function (index) {//enemy attack and enemymagic
        if (index == 1) {
            this.uiattack1.destroy();
            this.uiattack2.destroy();
            this.uiattack3.destroy();
            this.uiattack4.destroy();
            this.uiattack5.destroy();
            this.uiattack6.destroy();
            this.return.destroy();
        }
        else if (index == 2) {
            this.rest.destroy();
            this.heal.destroy();
            this.defence.destroy();
            this.rebound.destroy();
            this.return.destroy();
        }
        else {
            this.btn_attack.destroy();
            this.btn_heal.destroy();
            this.btn_escape.destroy();
        }
        this.animation_index = 3;
        this.enemytime = game.time.now;
        this.enemymagic += 1;

    },

    check_life_magic: function () {
        //主角
        if (this.enemydie == false && this.playerdie == false) {
            var ratio = (this.life / mainlife) * 10;
            if (ratio > 0) {
                for (var i = 9; i >= (10 - ratio); i--) {
                    this.life_array[i].visible = true;
                }
                for (var i = 0; i < (10 - ratio); i++) {
                    this.life_array[i].visible = false;
                }
                for (var i = 9; i >= (10 - this.magic); i--) {
                    this.magic_array[i].visible = true;
                }
                for (var i = 0; i < (10 - this.magic); i++) {
                    this.magic_array[i].visible = false;
                }
            }

            //敵人
            ratio = (this.enemylife / this.main_enemylife) * 10;
            if (ratio > 0) {
                for (var i = 9; i >= (10 - ratio); i--) {
                    this.enemylife_array[i].visible = true;
                }
                for (var i = 0; i < (10 - ratio); i++) {
                    this.enemylife_array[i].visible = false;
                }
                for (var i = 9; i >= (10 - this.enemymagic); i--) {
                    this.enemymagic_array[i].visible = true;
                }
                for (var i = 0; i < (10 - this.enemymagic); i++) {
                    this.enemymagic_array[i].visible = false;
                }
            }

            if (this.enemylife <= 0) {//判斷敵人死亡
                for (var i = 0; i <= 9; i++)
                    this.enemylife_array[i].visible = false;
                this.btn_attack.destroy();
                this.btn_heal.destroy();
                this.btn_escape.destroy();
                this.enemydie == true;
                game.time.events.add(8000, function () { game.state.start('forest'); }, this);
                game.time.events.add(800, function () { game.add.tween(this.enemy1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start(); this.win.play(); }, this);

                this.battle_bgm.stop();
                this.enemydie = true;
                console.log('to forest')
            }
            else if (this.life <= 0) {//判斷我方死亡
                for (var i = 0; i <= 9; i++)
                    this.life_array[i].visible = false;
                this.btn_attack.destroy();
                this.btn_heal.destroy();
                this.btn_escape.destroy();
                this.playerdie = true;
                game.time.events.add(8000, function () { game.state.start('forest'); }, this);
                game.time.events.add(800, function () { game.add.tween(this.main).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start(); this.win.play(); }, this);
                this.battle_bgm.stop();
                console.log('to forest')
            }
        }
    }
};