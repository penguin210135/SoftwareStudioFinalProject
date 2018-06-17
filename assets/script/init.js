var game = new Phaser.Game(1160, 720, Phaser.AUTO, 'canvas');
game.state.add('Boot', Technotip.Boot);
game.state.add('Preloader', Technotip.Preloader);
game.state.add('menu', menuState);
game.state.add('house', houseState);
game.state.add('set', setState);
game.state.add('farm', farmState);
game.state.add('fight', fightState);
game.state.add('forest', forestState);
game.state.add('town', townState);
game.state.add('story_front', storyfrontState);
game.state.add('gamewin', gamewinState);
game.state.add('gameover', gameoverState);
game.state.add('author', authorState);
game.state.add('rank', rankState);
game.state.add('sleep', sleepState);
game.state.add('skill', skillState);

game.state.start('Boot');