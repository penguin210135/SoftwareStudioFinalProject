var game = new Phaser.Game(1160, 720, Phaser.AUTO, 'canvas');
game.state.add('Boot', Technotip.Boot);
game.state.add('Preloader', Technotip.Preloader);
game.state.add('menu', menuState);
game.state.add('main', mainState);
game.state.add('set', setState);
game.state.add('farm', farmState);
game.state.add('fight', fightState);
game.state.add('forest',forestState);
//game.state.add('battle', battleState);
//game.state.add('city', cityState);

game.state.start('Boot');