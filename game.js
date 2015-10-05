var gameWidth = 800, gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game", {preload:preload, update:update, create:create, render:render});

var fontname = 'Raleway';
WebFontConfig = {
        // The Google Fonts we want to load (specify as many as you like in the array)
        google: {
                families: [fontname + ':100']
        }
};

function preload () {
        // Level background
        game.load.image('sky', 'assets/sky.png');

        game.load.spritesheet('backgrass', 'assets/background_grass_spritesheet.png',1008,311,2);
        game.load.spritesheet('hgrass', 'assets/grass_h_spritesheet.png',252,48,2);
        game.load.spritesheet('tgrass', 'assets/grass_t_spritesheet.png',48,66,2);
        game.load.spritesheet('vgrass', 'assets/grass_v_spritesheet.png',145,210,2);
        game.load.spritesheet('darkgrass', 'assets/darkgrass.png',252,48,2);
        game.load.spritesheet('floatgrass', 'assets/floating_spritesheet.png',252,48,2);
        game.load.spritesheet('floatledge', 'assets/floatingledge_spritesheet.png',64,48,2);

        // Sprites and stuff 
        game.load.spritesheet('boulder', 'assets/boulder_spritesheet.png',48, 48, 2);
        game.load.spritesheet('player', 'assets/protag_spritesheet.png',37, 65);
        game.load.spritesheet('turret', 'assets/turretspritesheet.png', 96, 96, 6);
        game.load.spritesheet('bullet', 'assets/bullet_spritesheet.png', 16, 16, 2);
        // Makes FPS counter work
        game.time.advancedTiming = true;
        // Allows Google Fonts to be used remotely
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

// The player sprite, extended from Phaser.Sprite
var player;
// A group of the static platforms in the level
var platforms;
// A group containing things that block raycasts
var obstacles;
// A group containing the background elements
var background;
// The controls
var controls;
// sprites
var boulder;
var turret;
var bullets;
// UI text elements
var respawnText;
var respawnCount;
var framerate;
// Time, used for favicon animation
var then = Date.now();
// Are we in debug mode?
var debug_toggle = 0;

function create() {
        // Create world, with the sky and background grass
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        game.world.setBounds(0, 0, 1920, 600);
        
        background = game.add.group();
        background.create(0, 300, 'backgrass');
        background.create(1008, 300, 'backgrass');
        
        // Create a new part of the game keeping track of the world resolution
        game.shifted = false;

        // Create platforms group
        platforms = game.add.group();
        platforms.enableBody = true;
    
        // Create a bullets
        bullets = game.add.group();

        // Add the "ground" platforms to the bottom of the screen
        for(var i = 0; i < 5; i++) {
                var ground = platforms.create(252 * i, game.world.height - 64, 'hgrass');
                var groundshadow = platforms.create(252 * i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

        // Create the floating rocky grass platforms
        for(var i = 0; i < 2; i++) {
                var floating = platforms.create(252 * i, game.world.height - 350, 'floatgrass');
                
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }

        // Create the ledge that ends the floating rocky grass platforms
        var ledge = platforms.create(504, game.world.height - 350, 'floatledge');
        ledge.body.immovable = true;
        ledge.body.setSize(80, 54, 0, 6);

        // Add controls to the game
        controls = game.input.keyboard.createCursorKeys();
        controls.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        controls.space.onDown.add(bitshift);
        controls.V = game.input.keyboard.addKey(Phaser.Keyboard.V);
        controls.tilde = game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
        // Tilde toggles debug mode
        controls.tilde.onDown.add(function() {
                debug_toggle = debug_toggle ? false : true;
                // If debug is turned off, we want to clear the bounding boxes and make the FPS
                // counter invisible. This code is put here because in render it would be called
                // at every frame. 
                framerate.visible = false;
                game.debug.reset();
        }, this);

        // Create the sprites of the game
        boulder = new Boulder(game, 500, 150);
        
        obstacles = game.add.group();
        for (var i = 0; i < platforms.length; i++) {
                obstacles.add(platforms.getAt(i));
        }
        obstacles.add(boulder); 
        
        //Add player
        player = new Player(game, controls);

        turret = new Turret(game, player, obstacles, 700, 500);

        // Set up UI text
        createUI();

}

function update() {

        // Collision detection for all objects
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, boulder);
        game.physics.arcade.collide(player, boulder);
        game.physics.arcade.collide(player, turret);
        game.physics.arcade.collide(boulder, turret);

        // Update UI
        if(player.health < 2) {
                respawnCount.visible = true;
                respawnText.visible = true;
                respawnCount.text = Math.ceil((player.RESPAWN_TIME - (Date.now() - player.killTime)) / 1000);
                if (Date.now() - player.killTime >= player.RESPAWN_TIME) {
                        respawnCount.visible = false;
                        respawnText.visible = false;
                        player.respawn();
                }
        }

}

function render() {
        // Don't render anything unless the user wants to debug
        if (debug_toggle === true) {
                // Clear the debug render screen, so there isn't any flicker
                game.debug.context.clearRect(0, 0, game.world.width, game.world.height);
                // Show and update the framerate
                framerate.visible = true;
                framerate.text = game.time.fps;
                // Draw bounding boxes
                game.debug.body(player);
                game.debug.body(boulder);
                game.debug.body(turret);
                obstacles.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                // Animate the favicon, for fun
                if(Date.now() - then >= 50) {
                        then = Date.now();
                        favicon();
                }
        }
}

function createUI() {
        // Set up text for the large countdown to respawn
        // We use game.width, not game.world.getBounds().width, because the text is locked to the camera
        respawnCount = game.add.text(game.width/2, game.height/2, "");
        // Keep text from moving when player moves
        respawnCount.fixedToCamera = true;
        // Set the anchor so centering isn't based off the top left corner
        respawnCount.anchor.setTo(0.5);
        // font settings
        respawnCount.font = fontname;
        respawnCount.fontSize = 150;
        respawnCount.align = 'center';
        respawnCount.fill = '#fff';
        respawnCount.stroke = '#000';
        respawnCount.strokeThickness = 3;
        respawnCount.setShadow(5, 5, 'rgba(0,0,0,1)', 0);
        // Make the text invisible until a respawn countdown is needed
        respawnCount.visible = false;

        // Similarly, we need text above the countdown to tell the player they will respawn
        respawnText = game.add.text(game.width/2, game.height/2 - 150, "Respawn in:");
        respawnText.fixedToCamera = true;
        respawnText.anchor.setTo(0.5);
        respawnText.font = fontname;
        respawnText.fontSize = 48;
        respawnText.align = 'center';
        respawnText.fill = '#fff';
        respawnText.stroke = '#000';
        respawnText.strokeThickness = 3;
        respawnText.setShadow(3, 3, 'rgba(0,0,0,1)', 0);
        respawnText.visible = false;

        // Add an FPS counter to the top left corner, to be turned on with debug mode
        framerate = game.add.text(25, 25, game.time.fps);
        framerate.fixedToCamera = true;
        framerate.font = fontname;
        framerate.fontSize = 14;
        framerate.fill = '#33ff33';
        framerate.stroke = '#000';
        framerate.strokeThickness = 3;
        framerate.visible = false;
}


function bitshift() {
    game.shifted = !game.shifted;

    bullets.forEach(
        function(b) { b.shift(); }
    , this);
    if (!game.shifted) {
        platforms.forEach(shiftOff, this);
        obstacles.forEach(shiftOff, this);
        background.forEach(shiftOff, this);
    }
    else {
        platforms.forEach(shiftOn, this);
        obstacles.forEach(shiftOn, this);
        background.forEach(shiftOn, this);
    }
}

function shiftOff(object) {
        object.frame = 0;
}

function shiftOn(object) {
        object.frame = 1;
}
