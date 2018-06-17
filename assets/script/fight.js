var fightState = {
    preload: function () {
        this.enemy_random = Math.floor(Math.random() * 5);
        if (this.enemy_random == 1)
            game.load.spritesheet('enemy1', 'assets/image/monster/snake_144x100.png', 144, 100);
        else if (this.enemy_random == 2)
            game.load.spritesheet('enemy1', 'assets/image/monster/dragon_188x171.png', 188, 171);
        else if (this.enemy_random == 3)
            game.load.spritesheet('enemy1', 'assets/image/monster/octopus_76x84.png', 76, 84);
        else if (this.enemy_random == 4) {
            game.load.spritesheet('enemy1', 'assets/image/monster/mountainPig_149x98.png', 149, 98);//new!!!!!!!!
        }
        else
            game.load.spritesheet('enemy1', 'assets/image/monster/enemy1.png', 75, 75.5);
    },
    create: function () {
        this.life = mainlife;
        this.magic = 3;
        this.enemymagic = 3;
        this.animation_index = 0;//決定撥放哪個動畫
        this.enemytime = 0;//延遲用
        this.burnbuff = false;//燒傷狀態
        this.attackbuff = 0;//增加攻擊力
        this.defendbuff = 0;//增加防禦力
        this.absolute_defence = false;//絕對防禦
        this.partial_reboundbuff = false;//部分反彈
        this.enemydie = false;//敵人是否死亡
        this.playerdie = false;//自己是否死亡
        this.attack_number_player = 0;
        this.attack_number_enemy = 0;
        this.life_array = [];
        this.magic_array = [];
        this.enemylife_array = [];
        this.enemymagic_array = []

        var bg = game.add.image(0, 0, 'forest1');
        bg.height = game.height;
        bg.width = game.width;

        this.main = game.add.sprite(880, 300, 'main');
        this.main.height = 150;
        this.main.width = 100;
        this.main.animations.add('fly', [0, 1, 2, 3, 4, 5], 8, true);
        this.main.animations.play('fly');
        game.physics.arcade.enable(this.main);

        //enemy set
        if (this.enemy_random == 1) {//snake
            this.enemy_power = snake_power;
            this.enemylife = snake_life;
            this.main_enemylife = snake_life;
            this.enemy1 = game.add.sprite(120, 250, 'enemy1');
            this.enemy_x_position = 120;
            this.enemy1.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
            this.enemy1.height = 200;
            this.enemy1.width = 210;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else if (this.enemy_random == 2) {//dragon
            this.enemy_power = dragon_power;
            this.enemylife = dragon_life;
            this.main_enemylife = dragon_life;
            this.enemy1 = game.add.sprite(80, 180, 'enemy1');
            this.enemy_x_position = 80;
            this.enemy1.animations.add('move', [0, 1, 2, 3, 4, 5], 8, true);
            this.enemy1.height = 300;
            this.enemy1.width = 300;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else if (this.enemy_random == 3) {//octopus
            this.enemy_power = octopus_power;
            this.enemylife = octopus_life;
            this.main_enemylife = octopus_life;
            this.enemy1 = game.add.sprite(160, 270, 'enemy1');
            this.enemy_x_position = 160;
            this.enemy1.animations.add('move', [0, 1, 2, 3], 8, true);
            this.enemy1.height = 180;
            this.enemy1.width = 180;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else if (this.enemy_random == 4) {//pig
            this.enemy_power = pig_power;
            this.enemylife = pig_life;
            this.main_enemylife = pig_life;
            this.enemy1 = game.add.sprite(110, 270, 'enemy1');
            this.enemy_x_position = 160;
            this.enemy1.animations.add('move', [0, 1, 2, 3], 8, true);
            this.enemy1.height = 180;
            this.enemy1.width = 220;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }
        else {//ghost
            this.enemy_power = ghost_power;
            this.enemylife = ghost_life;
            this.main_enemylife = ghost_life;
            this.enemy1 = game.add.sprite(160, 300, 'enemy1');
            this.enemy_x_position = 160;
            this.enemy1.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 8, true);
            this.enemy1.height = 125;
            this.enemy1.width = 121.7;
            this.enemy1.animations.play('move');
            game.physics.arcade.enable(this.enemy1);
        }

        //主角生命 & 敵人生命
        this.enemycontainer = game.add.image(80, 50, 'container');
        this.container = game.add.image(950, 50, 'container');
        this.main.life = this.life;
        this.enemy1.enemylife = this.enemylife;
        for (var i = 0; i < 10; i++) {
            this.life_array[i] = game.add.image(950, 50 + i * 13, 'life' + (i + 1).toString());
            this.magic_array[i] = game.add.image(1018, 50 + i * 13, 'magic' + (i + 1).toString());
            this.enemylife_array[i] = game.add.image(80, 50 + i * 13, 'life' + (i + 1).toString());
            this.enemymagic_array[i] = game.add.image(148, 50 + i * 13, 'magic' + (i + 1).toString());
        }


        this.battle_bgm = game.add.audio('battle_bgm', 0.9, true);
        this.battle_bgm.play();
        this.attack_audio1 = game.add.audio('attack_audio1');
        this.attack_audio2 = game.add.audio('attack_audio2');
        this.attack_audio3 = game.add.audio('attack_audio3');
        this.attack_audio4 = game.add.audio('attack_audio4');
        this.attack_audio5 = game.add.audio('attack_audio5');
        this.attack_audio6 = game.add.audio('attack_audio6');
        this.heal_audio1 = game.add.audio('heal_audio1');
        this.heal_audio2 = game.add.audio('heal_audio2');
        this.heal_audio3 = game.add.audio('heal_audio3');
        this.heal_audio4 = game.add.audio('heal_audio4');
        this.burn_audio = game.add.audio('burn_audio');
        this.enemyattack_audio1 = game.add.audio('enemyattack_audio1');
        this.win = game.add.audio('win');
        this.lose = game.add.audio('lose');

        //攻擊
        this.attack1 = game.add.sprite(69, 300, 'attack1');
        this.attack1.animations.add('hit1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
        this.attack2 = game.add.sprite(179, 300, 'attack2');
        this.attack2.animations.add('hit2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10);
        this.attack3 = game.add.sprite(60, 200, 'attack3');
        this.attack3.animations.add('hit3', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 11);
        this.attack3.alpha = 0;
        this.attack4 = game.add.sprite(100, 240, 'attack4');
        this.attack4.scale.setTo(1.4);
        this.attack4.animations.add('hit4', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0], 10);
        this.attack5 = game.add.sprite(120, 200, 'attack5');
        this.attack5.animations.add('hit5', [0, 1, 2, 3, 4, 5, 6, 7], 6);
        this.attack5.alpha = 0;
        this.attack6 = game.add.sprite(60, 200, 'attack6');
        this.attack6.animations.add('hit6', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7);
        this.attack6.alpha = 0;
        this.burn = game.add.sprite(40, 200, 'burn');
        this.burn.alpha = 0;
        this.burn.scale.setTo(1.4);
        this.burn.animations.add('burning', [0, 1, 2, 3, 4, 5, 6], 8, true);
        this.burn.animations.play('burning');

        //defend
        this.heallife = game.add.sprite(850, 100, 'heallife');
        this.heallife.animations.add('heal_life', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 10);
        this.healmagic = game.add.sprite(850, 100, 'healmagic');
        this.healmagic.animations.add('heal_magic', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 10);
        this.shield = game.add.sprite(820, 230, 'shield');
        this.shield.animations.add('heal_shield', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7);
        this.partial_rebound = game.add.sprite(800, 250, 'partial_rebound');
        this.partial_rebound.animations.add('heal_partial_rebound', [0, 1, 2, 3, 4, 3, 2, 1], 8, true);
        this.partial_rebound.animations.play('heal_partial_rebound');
        this.partial_rebound.alpha = 0;

        //enemy power add
        this.power_add = game.add.sprite(120, 150, 'power_add');
        this.power_add.animations.add('add', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 12);

        //招式名稱
        this.attack1_name = game.add.image(300, 600, 'attack1_name');
        this.attack2_name = game.add.image(300, 600, 'attack2_name');
        this.attack3_name = game.add.image(300, 600, 'attack3_name');
        this.attack4_name = game.add.image(300, 600, 'attack4_name');
        this.attack5_name = game.add.image(300, 600, 'attack5_name');
        this.attack6_name = game.add.image(300, 600, 'attack6_name');
        this.heal1_name = game.add.image(300, 600, 'heal1_name');
        this.heal2_name = game.add.image(300, 600, 'heal2_name');
        this.heal3_name = game.add.image(300, 600, 'heal3_name');
        this.heal4_name = game.add.image(300, 600, 'heal4_name');
        this.attack1_name.alpha = 0;
        this.attack2_name.alpha = 0;
        this.attack3_name.alpha = 0;
        this.attack4_name.alpha = 0;
        this.attack5_name.alpha = 0;
        this.attack6_name.alpha = 0;
        this.heal1_name.alpha = 0;
        this.heal2_name.alpha = 0;
        this.heal3_name.alpha = 0;
        this.heal4_name.alpha = 0;
        this.attack1_name.scale.setTo(0.8);
        this.attack2_name.scale.setTo(0.8);
        this.attack3_name.scale.setTo(0.8);
        this.attack4_name.scale.setTo(0.8);
        this.attack5_name.scale.setTo(0.8);
        this.attack6_name.scale.setTo(0.8);
        this.heal1_name.scale.setTo(0.8);
        this.heal2_name.scale.setTo(0.8);
        this.heal3_name.scale.setTo(0.8);
        this.heal4_name.scale.setTo(0.8);

        //結算畫面
        this.win_dragon = game.add.image(335, 100, 'win_dragon');
        this.win_pig = game.add.image(335, 100, 'win_pig');
        this.win_snake = game.add.image(335, 100, 'win_snake');
        this.win_normal = game.add.image(335, 100, 'win_normal');
        this.win_lose = game.add.image(335, 100, 'win_lose');
        this.win_dragon.scale.setTo(0.8);
        this.win_pig.scale.setTo(0.8);
        this.win_snake.scale.setTo(0.8);
        this.win_normal.scale.setTo(0.8);
        this.win_lose.scale.setTo(0.8);
        this.win_dragon.alpha = 0;
        this.win_pig.alpha = 0;
        this.win_snake.alpha = 0;
        this.win_normal.alpha = 0;
        this.win_lose.alpha = 0;

        //enemy 攻擊
        this.enemyattack1 = game.add.sprite(850, 300, 'attack2');
        this.enemyattack1.animations.add('enemyhit2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10);

        //life magic text
        this.playerlife_text = game.add.bitmapText(950, 30, 'fightnumber', this.life, 65);
        this.playermagic_text = game.add.bitmapText(1045, 30, 'fightnumber', this.magic, 65);
        this.enemylife_text = game.add.bitmapText(80, 30, 'fightnumber', this.enemylife, 65);
        this.enemymagic_text = game.add.bitmapText(175, 30, 'fightnumber', this.enemymagic, 65);
        this.attack_number_player_text = game.add.bitmapText(900, 320, 'fightnumber', '', 90);
        if (this.enemy_power == dragon_power)
            this.attack_number_enemy_text = game.add.bitmapText(this.enemy_x_position + 160, 320, 'fightnumber', '', 90);
        else if (this.enemy_power == snake_power)
            this.attack_number_enemy_text = game.add.bitmapText(this.enemy_x_position + 130, 320, 'fightnumber', '', 90);
        else
            this.attack_number_enemy_text = game.add.bitmapText(this.enemy_x_position + 80, 320, 'fightnumber', '', 90);

        this.menu(0);//0 : initial ,1 : return
    },

    update: function () {

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
            this.attack3.alpha = 0;
            this.attack5.alpha = 0;
            this.attack6.alpha = 0;
            if (this.enemydie == false) {
                if (fightState.enemy1.body.x < 900) {
                    this.burn.alpha = 0;
                    fightState.enemy1.body.velocity.x = 600;
                    if (fightState.enemy1.body.x >= 750) {
                        this.enemyattack_audio1.play()
                        this.enemyattack1.animations.play('enemyhit2');
                    }
                }
                else {
                    fightState.enemy1.body.x = this.enemy_x_position;
                    fightState.enemy1.body.velocity.x = 0;
                    this.animation_index = 0;

                    if (this.burnbuff == true) {
                        this.burn.alpha = 0.7;
                        this.enemylife -= 5;
                        this.attack_number_enemy = 5;
                        this.attack_number_enemy_text.text = this.attack_number_enemy;
                        this.attack_number_enemy_text.y = 320;
                        game.time.events.add(800, function () {
                            this.burn_audio.play();
                            this.attack_number_enemy_text.alpha = 1;
                            game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                        }, this);
                    }

                    if (this.absolute_defence == true) {
                        this.absolute_defence = false;
                        this.attack_number_player = 0;
                    }
                    else if (this.partial_reboundbuff == true) {//還有特效還沒加
                        if ((this.enemy_power - protect) > 0) {
                            this.enemylife -= (this.enemy_power * 2);
                            this.life -= ((this.enemy_power - protect - 5));
                            this.partial_reboundbuff = false;
                            this.attack_number_enemy = (this.enemy_power * 2);
                            this.attack_number_player = ((this.enemy_power - protect - 2));
                        }
                        else
                            this.attack_number_player = 0;

                        this.partial_rebound.alpha = 0;
                        this.attack_number_enemy_text.text = this.attack_number_enemy;
                        this.attack_number_enemy_text.y = 320;
                        this.attack_number_enemy_text.alpha = 1;
                        game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                    }
                    else {
                        if ((protect + this.defendbuff) <= this.enemy_power) {
                            this.life -= (this.enemy_power - (protect + this.defendbuff));
                            this.attack_number_player = (this.enemy_power - (protect + this.defendbuff))
                        }
                        else {
                            this.attack_number_player = 0;
                        }
                        this.defendbuff = 0;
                    }
                    this.attack_number_player_text.text = this.attack_number_player;
                    this.attack_number_player_text.y = 320;
                    this.attack_number_player_text.alpha = 1;
                    game.add.tween(this.attack_number_player_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
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
                var temp = Math.floor(Math.random() * 2);
                if (temp == 0) {
                    pre_state = game.state.current;
                    game.time.events.add(1000, function () { ToNewPlace('forest'); this.battle_bgm.stop(); }, this);
                }
                else {
                    this.main.body.x = 880;
                    this.main.body.velocity.x = 0;
                    this.enemyattack(3);
                }
            }
        }
        this.check_life_magic();
    },

    menu: function (index) {//展開menu，順便處理魔力增加,0:新的一回合 1:從攻擊回來 2:從防禦回來
        //tmp_plant.events.onInputOver.add(function () { this.plantInputOver(index) }, this);
        this.btn_attack = game.add.button(300, 500, 'attack', function () { this.skill_menu(0) }, this, 2, 1, 0);
        this.btn_heal = game.add.button(500, 500, 'cure', function () { this.skill_menu(1) }, this, 2, 1, 0);
        this.btn_escape = game.add.button(700, 500, 'escape', function () { this.escape(); }, this, 2, 1, 0);
        console.log(this.btn_attack.onInputOver);
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
            this.uiattack1.onInputOver.add(function () { this.attack1_name.alpha = 1 }, this);
            this.uiattack1.onInputOut.add(function () { this.attack1_name.alpha = 0 }, this);
            this.uiattack2.onInputOver.add(function () { this.attack2_name.alpha = 1 }, this);
            this.uiattack2.onInputOut.add(function () { this.attack2_name.alpha = 0 }, this);
            this.uiattack3.onInputOver.add(function () { this.attack3_name.alpha = 1 }, this);
            this.uiattack3.onInputOut.add(function () { this.attack3_name.alpha = 0 }, this);
            this.uiattack4.onInputOver.add(function () { this.attack4_name.alpha = 1 }, this);
            this.uiattack4.onInputOut.add(function () { this.attack4_name.alpha = 0 }, this);
            this.uiattack5.onInputOver.add(function () { this.attack5_name.alpha = 1 }, this);
            this.uiattack5.onInputOut.add(function () { this.attack5_name.alpha = 0 }, this);
            this.uiattack6.onInputOver.add(function () { this.attack6_name.alpha = 1 }, this);
            this.uiattack6.onInputOut.add(function () { this.attack6_name.alpha = 0 }, this);
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
            this.rest.onInputOver.add(function () { this.heal1_name.alpha = 1 }, this);
            this.rest.onInputOut.add(function () { this.heal1_name.alpha = 0 }, this);
            this.heal.onInputOver.add(function () { this.heal2_name.alpha = 1 }, this);
            this.heal.onInputOut.add(function () { this.heal2_name.alpha = 0 }, this);
            this.defence.onInputOver.add(function () { this.heal3_name.alpha = 1 }, this);
            this.defence.onInputOut.add(function () { this.heal3_name.alpha = 0 }, this);
            this.rebound.onInputOver.add(function () { this.heal4_name.alpha = 1 }, this);
            this.rebound.onInputOut.add(function () { this.heal4_name.alpha = 0 }, this);
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
                this.attack1_name.alpha = 0
                this.attack1.animations.play('hit1');
                this.attack_audio1.play();
                this.enemylife -= (5 + this.attackbuff);
                this.magic -= 1;
                this.attack_number_enemy_text.text = (5 + this.attackbuff);
                this.attack_number_enemy_text.y = 320;
                this.attack_number_enemy_text.alpha = 1;
                game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                this.enemyattack(1);
            }
        }
        else if (index == 2) {
            if (this.magic > 1) {
                this.attack2_name.alpha = 0;
                var hit2_power;
                var attack_temp = Math.floor(Math.random() * 2);
                if (attack_temp == 0)
                    hit2_power = 16;
                else
                    hit2_power = 8
                this.attack2.animations.play('hit2');
                this.attack_audio2.play();
                this.enemylife -= (hit2_power + this.attackbuff);
                this.magic -= 2;
                this.attack_number_enemy_text.text = (hit2_power + this.attackbuff);
                this.attack_number_enemy_text.y = 320;
                this.attack_number_enemy_text.alpha = 1;
                game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                this.enemyattack(1);
            }
        }
        else if (index == 3) {
            if (this.magic > 3) {
                this.attack3_name.alpha = 0;
                this.attack3.alpha = 1;
                this.attack3.animations.play('hit3');
                this.attack_audio3.play();
                this.enemylife -= (20 + this.attackbuff);
                this.magic -= 4;
                this.burnbuff = true;
                this.attack_number_enemy_text.text = (20 + this.attackbuff);
                this.attack_number_enemy_text.y = 320;
                this.attack_number_enemy_text.alpha = 1;
                game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                this.enemyattack(1);
            }
        }
        else if (index == 4) {
            if (this.magic > 5) {
                this.attack4_name.alpha = 0;
                this.attack4.animations.play('hit4');
                this.attack_audio4.play();
                this.enemylife -= (40 + this.attackbuff);
                this.magic -= 6;
                this.attack_number_enemy_text.text = (40 + this.attackbuff);
                this.attack_number_enemy_text.y = 320;
                this.attack_number_enemy_text.alpha = 1;
                game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                this.uiattack1.destroy();
                this.uiattack2.destroy();
                this.uiattack3.destroy();
                this.uiattack4.destroy();
                this.uiattack5.destroy();
                this.uiattack6.destroy();
                this.return.destroy();
                game.time.events.add(1200, function () { this.menu(0); }, this);
            }
        }
        else if (index == 5) {
            if (this.magic > 6) {
                this.attack5_name.alpha = 0;
                this.attack5.alpha = 1;
                this.attack5.animations.play('hit5');
                this.attack_audio5.play();
                this.enemylife -= (50 + this.attackbuff);
                this.attackbuff += 10;
                this.magic -= 7;
                this.attack_number_enemy_text.text = (50 + this.attackbuff);
                this.attack_number_enemy_text.y = 320;
                this.attack_number_enemy_text.alpha = 1;
                game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                this.enemyattack(1);
            }
        }
        else if (index == 6) {
            if (this.magic > 8) {
                this.attack6_name.alpha = 0;
                this.attack6.alpha = 1;
                this.attack6.animations.play('hit6');
                this.attack_audio6.play();
                this.enemylife -= (100 + this.attackbuff);
                this.magic -= 9;
                this.attack_number_enemy_text.text = (100 + this.attackbuff);
                this.attack_number_enemy_text.y = 320;
                this.attack_number_enemy_text.alpha = 1;
                game.add.tween(this.attack_number_enemy_text).to({ y: 270 }, 500).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                this.enemyattack(1);
            }
        }
    },

    defend: function (index) {
        if (index == 1) {
            this.heal1_name.alpha = 0;
            this.defendbuff = 5;
            if (this.magic < 10) {
                this.magic += 1;
            }
            this.healmagic.animations.play('heal_magic');
            this.heal_audio1.play();
            this.enemyattack(2);
        }
        if (index == 2) {
            if (this.magic > 1) {
                this.heal2_name.alpha = 0;
                if (this.life + 20 <= mainlife) {
                    this.life += 20;
                }
                else {
                    this.life = mainlife;
                }
                this.magic -= 2;
                this.heallife.animations.play('heal_life');
                this.heal_audio2.play();
                this.enemyattack(2);
            }
        }
        if (index == 3) {
            if (this.magic > 4) {
                this.heal3_name.alpha = 0;
                this.absolute_defence = true;
                this.magic -= 5;
                this.shield.animations.play('heal_shield');
                this.heal_audio3.play();
                this.enemyattack(2);
            }
        }
        if (index == 4) {
            if (this.magic > 7) {
                this.heal4_name.alpha = 0;
                console.log('rebound');
                this.partial_reboundbuff = true;
                this.magic -= 8;
                this.partial_rebound.alpha = 1;
                this.heal_audio4.play();
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

        if (this.enemymagic < 10)
            this.enemymagic += 1;

        if (this.enemymagic == 10) {
            console.log('add');
            this.enemy_power = this.enemy_power * 2;
            this.enemymagic -= 10;
            game.time.events.add(400, function () { this.power_add.animations.play('add') }, this);
        }

    },

    check_life_magic: function () {
        //主角
        if (this.enemydie == false && this.playerdie == false) {
            //life magic text
            this.playerlife_text.text = this.life;
            this.playermagic_text.text = this.magic;
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
            this.enemylife_text.text = this.enemylife;
            this.enemymagic_text.text = this.enemymagic;
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
                //get health
                mainlife += 4;

                for (var i = 0; i <= 9; i++)
                    this.enemylife_array[i].visible = false;
                this.enemylife_text.text = '0';
                this.btn_attack.destroy();
                this.btn_heal.destroy();
                this.btn_escape.destroy();
                this.enemydie == true;
                this.burnbuff = false;
                game.add.tween(this.burn).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start();
                game.time.events.add(8000, function () { ToNewPlace('forest'); }, this);
                game.time.events.add(1200, function () { game.add.tween(this.enemy1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start(); this.battle_bgm.stop(); this.win.play(); }, this);
                if (this.enemy_random == 1) {
                    bag_list[1][2] += 1;
                    game.time.events.add(1200, function () { game.add.tween(this.win_snake).to({ alpha: 1 }, 1, Phaser.Easing.Linear.None).start(); }, this);
                }
                else if (this.enemy_random == 2) {
                    bag_list[1][1] += 1;
                    game.time.events.add(1200, function () { game.add.tween(this.win_dragon).to({ alpha: 1 }, 1, Phaser.Easing.Linear.None).start(); }, this);
                }
                else if (this.enemy_random == 4) {
                    bag_list[1][3] += 1;
                    game.time.events.add(1200, function () { game.add.tween(this.win_pig).to({ alpha: 1 }, 1, Phaser.Easing.Linear.None).start(); }, this);
                }
                else {
                    game.time.events.add(1200, function () { game.add.tween(this.win_normal).to({ alpha: 1 }, 1, Phaser.Easing.Linear.None).start(); }, this);
                }

                this.enemydie = true;
            }
            else if (this.life <= 0) {//判斷我方死亡
                for (var i = 0; i <= 9; i++)
                    this.life_array[i].visible = false;
                this.playerlife_text.text = '0';
                this.btn_attack.destroy();
                this.btn_heal.destroy();
                this.btn_escape.destroy();
                this.playerdie = true;
                ConsumeTime(5, 5);
                game.time.events.add(6000, function () { ToNewPlace('forest'); }, this);
                game.time.events.add(1200, function () { game.add.tween(this.main).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None).start(); this.battle_bgm.stop(); this.lose.play(); }, this);
                game.time.events.add(1200, function () { game.add.tween(this.win_lose).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None).start(); }, this);
            }
        }
    },



};