var Bitshift = Bitshift || {};

var gameWidth = 800, gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game",
                            playState);

var fontname = 'Raleway';
WebFontConfig = {
        // The Google Fonts we want to load
        // (specify as many as you like in the array)
        // the :100 determines font weight
        google: {
                families: [fontname + ':100']
        }
};

// menu state
game.state.add('menu', menuState);
// dialogue states
game.state.add('pre1', pre1State);
game.state.add('pre2', pre2State);
// gameplay states
game.state.add('play', playState);
game.state.add('play2', playState2);
// state for when end of lv2 is reached
game.state.add('win', winState);
// state for loading JSON map
game.state.add('loadmap', loadState);

//start game at menu
game.state.start('menu');
