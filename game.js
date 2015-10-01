var gameWidth = 800, gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game", {preload:preload, update:update, create:create, render:render});

function preload () {
        game.load.image('sky', 'assets/sky.png');
        game.load.spritesheet('player', 'assets/spritesheet_walk.png',37, 64);
        game.load.image('hgrass', 'assets/grass_h.png');
        game.load.image('tgrass', 'assets/grass_t.png');
        game.load.image('vgrass', 'assets/grass_v.png');
        game.load.image('boulder', 'assets/boulder.png');
}

var player;
var platforms;
var cursors;
var spacebar;
var tilde;
var vkey;
var boulder;
var shifted = false;

var debug_toggle = 0;

function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');        
        game.world.setBounds(0, 0, 1920, 600);

        platforms = game.add.group();
        platforms.enableBody = true;
        tilde = game.input.keyboard.addKey(Phaser.Keyboard.TILDE)

        for(var i = 0; i < 2; i++) {
                var ground = platforms.create(252 * i, game.world.height - 350, 'hgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 80, 0, 6);
        }
        
        var ground = platforms.create(875, game.world.height - 300, 'hgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 60, 0, 6);

        for(var i = 0; i < 10; i++) {
                var ground = platforms.create(252 * i, game.world.height - 50, 'hgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 60, 0, 6);
        }
    

        boulder = new Boulder(game, 500, 150);

        player = new Player(game, 200, 100);
        tilde.onDown.add(function() {
                debug_toggle = debug_toggle ? false : true;
                game.debug.reset();
        }, this);
    
        cursors = game.input.keyboard.createCursorKeys();
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacebar.onDown.add(bitshift, this);
        vkey = game.input.keyboard.addKey(Phaser.Keyboard.V);
        vkey.onDown.add(vtest, this);
}

function update() { 
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, boulder);
        game.physics.arcade.collide(player, boulder);
}

function render() {
        
        if (debug_toggle == true) { 
                game.debug.body(player);
                game.debug.body(boulder);
                platforms.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
        }
}
