var gameWidth = 800, gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game", {preload:preload, update:update, create:create, render:render});

WebFontConfig = {
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Raleway']
    }

};

function preload () {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('backgrass', 'assets/background_grass_pattern.png');
        game.load.spritesheet('player', 'assets/protag_spritesheet.png',37, 65);
        game.load.image('hgrass', 'assets/grass_h.png');
        game.load.image('tgrass', 'assets/grass_t.png');
        game.load.image('vgrass', 'assets/grass_v.png');
        game.load.image('darkgrass', 'assets/darkgrass.png');
        game.load.image('floatgrass', 'assets/floating.png');
        game.load.image('floatledge', 'assets/floatingledge.png');
        game.load.image('boulder', 'assets/boulder.png');
        game.load.spritesheet('turret', 'assets/turretspritesheet.png', 70, 84, 5);
        game.time.advancedTiming = true;
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

var player;
var platforms;
var cursors;
var spacebar;
var tilde;
var vkey;
var boulder;
var turret;
var shifted = false;
var PLAYER_X = 200;
var PLAYER_Y = 500;
var text;
var framerate;

var debug_toggle = 0;

function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        game.world.setBounds(0, 0, 1920, 600);
        game.add.sprite(0, 300, 'backgrass');
        game.add.sprite(1019, 300, 'backgrass');

        platforms = game.add.group();
        platforms.enableBody = true;
        tilde = game.input.keyboard.addKey(Phaser.Keyboard.TILDE)

        for(var i = 0; i < 5; i++) {
                var ground = platforms.create(252 * i, game.world.height - 64, 'hgrass');
                var groundshadow = platforms.create(252 * i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

        for(var i = 0; i < 2; i++) {
                var ground = platforms.create(252 * i, game.world.height - 350, 'floatgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 56, 0, 6);
        }
        var ledge = platforms.create(504, game.world.height - 350, 'floatledge');
        ledge.body.immovable = true;
        ledge.body.setSize(80, 54, 0, 6);

        boulder = new Boulder(game, 500, 150);
        turret = new Turret(game, 700, 500);
        player = new Player(game, PLAYER_X, PLAYER_Y);

        tilde.onDown.add(function() {
                debug_toggle = debug_toggle ? false : true;
                game.debug.reset();
        }, this);

        cursors = game.input.keyboard.createCursorKeys();
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(bitshift, this);
        vkey = game.input.keyboard.addKey(Phaser.Keyboard.V);
        vkey.onDown.add(vtest, this);

        text = game.add.text(game.width/2, game.height/2, "");
        text.fixedToCamera = true;
        text.anchor.setTo(0.5);
        text.font = 'Raleway Black';
        text.fontSize = 120;
        text.align = 'center';
        text.fill = '#fff';
        text.stroke = '#000';
        text.strokeThickness = 3;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        text.visible = false;

        framerate = game.add.text(25, 25, game.time.fps);
        framerate.fixedToCamera = true;
        framerate.font = "Raleway Light";
        framerate.fontSize = 14;
        framerate.fill = '#33ff33';
        framerate.visible = false;

}

function update() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, boulder);
        game.physics.arcade.collide(player, boulder);
        game.physics.arcade.collide(player, turret);
        game.physics.arcade.collide(boulder, turret);


}

function render() {

        if (debug_toggle == true) {
                game.debug.context.clearRect(0, 0, game.world.width, game.world.height);
                framerate.visible = true;
                framerate.text = game.time.fps;
                game.debug.body(player);
                game.debug.body(boulder);
                game.debug.body(turret);
                platforms.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
        } else {
                framerate.visible = false;
        }
}
