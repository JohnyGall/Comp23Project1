var gameWidth = 800, gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game", {preload:preload, update:update, create:create, render:render});

var fontname = 'Raleway';
WebFontConfig = {
        // The Google Fonts we want to load (specify as many as you like in the array)
        // the :100 determines font weight
        google: {
                families: [fontname + ':100']
        }
};

function preload () {
        // Customise the sprites used
        var backgroundSprites = {
                "sky":{
                        "url":"assets/sky_spritesheet.png",
                        "sizeX":1920,
                        "sizeY":1080,
                        "number":2
                },
                "backgrass":{
                        "url":"assets/background_grass_spritesheet.png",
                        "sizeX":1008,
                        "sizeY":311,
                        "number":2
                },
                "hgrass":{
                        "url":"assets/grass_h_spritesheet.png",
                        "sizeX":252,
                        "sizeY":48,
                        "number":2
                },
                "vgrass":{
                        "url":"assets/grass_v_spritesheet.png",
                        "sizeX":144,
                        "sizeY":208,
                        "number":2
                },
                "darkgrass":{
                        "url":"assets/darkgrass.png",
                        "sizeX":252,
                        "sizeY":48,
                        "number":2

                },
                "floatgrass":{
                        "url":"assets/floating_spritesheet.png",
                        "sizeX":252,
                        "sizeY":48,
                        "number":2
                },
                "floatright":{
                        "url":"assets/floatingledge_spritesheet.png",
                        "sizeX":65,
                        "sizeY":48,
                        "number":2
                },
                "floatleft":{
                        "url":"assets/floatingledge1_spritesheet.png",
                        "sizeX":65,
                        "sizeY":48,
                        "number":2
                },
                "miniledge":{
                        "url":"assets/mini_floating_spritesheet.png",
                        "sizeX":48,
                        "sizeY":48,
                        "number":2
                }
        }

        var playerObjectSprites = {
                "boulder":{
                        "url":"assets/boulder_spritesheet.png",
                        "sizeX":48,
                        "sizeY":48,
                        "number":2
                },
                "player":{
                        "url":"assets/protag_spritesheet.png",
                        "sizeX":37,
                        "sizeY":65,
                        // no "number" because the player sprite uses the defualt value (1)
                },
                "turret":{
                        "url":"assets/turretspritesheet.png",
                        "sizeX":96,
                        "sizeY":96,
                        "number":6
                },
                "bullet":{
                        "url":"assets/bullet_spritesheet.png",
                        "sizeX":16,
                        "sizeY":16,
                        "number":2
                },
                "cloud":{
                        "url":"assets/cloud_spritesheet.png",
                        "sizeX":96,
                        "sizeY":32,
                        "number":2

                }
        }

        // Object and player Sprites and stuff
        game.load.spritesheet('boulder',playerObjectSprites.boulder.url ,playerObjectSprites.boulder.sizeX, playerObjectSprites.boulder.sizeY, playerObjectSprites.boulder.number);
        game.load.spritesheet('player', playerObjectSprites.player.url, playerObjectSprites.player.sizeX, playerObjectSprites.player.sizeY);
        game.load.spritesheet('turret', playerObjectSprites.turret.url ,playerObjectSprites.turret.sizeX, playerObjectSprites.turret.sizeY, playerObjectSprites.turret.number);
        game.load.spritesheet('bullet', playerObjectSprites.bullet.url ,playerObjectSprites.bullet.sizeX, playerObjectSprites.bullet.sizeY, playerObjectSprites.bullet.number);
        game.load.spritesheet('cloud', playerObjectSprites.cloud.url ,playerObjectSprites.cloud.sizeX, playerObjectSprites.cloud.sizeY, playerObjectSprites.cloud.number);

        // Level background sprites
        game.load.spritesheet('sky', backgroundSprites.sky.url, backgroundSprites.sky.sizeX, backgroundSprites.sky.sizeY, backgroundSprites.sky.number);
        game.load.spritesheet('backgrass', backgroundSprites.backgrass.url,backgroundSprites.backgrass.sizeX, backgroundSprites.backgrass.sizeY, backgroundSprites.backgrass.number);
        game.load.spritesheet('hgrass', backgroundSprites.hgrass.url,backgroundSprites.hgrass.sizeX, backgroundSprites.hgrass.sizeY, backgroundSprites.hgrass.number);
        game.load.spritesheet('vgrass', backgroundSprites.vgrass.url, backgroundSprites.vgrass.sizeX, backgroundSprites.vgrass.sizeY, backgroundSprites.vgrass.number);
        game.load.spritesheet('darkgrass', backgroundSprites.darkgrass.url, backgroundSprites.darkgrass.sizeX, backgroundSprites.darkgrass.sizeY, backgroundSprites.darkgrass.number);
        game.load.spritesheet('floatgrass', backgroundSprites.floatgrass.url, backgroundSprites.floatgrass.sizeX, backgroundSprites.floatgrass.sizeY, backgroundSprites.floatgrass.number);
        game.load.spritesheet('floatright', backgroundSprites.floatright.url, backgroundSprites.floatright.sizeX, backgroundSprites.floatright.sizeY, backgroundSprites.floatright.number);
        game.load.spritesheet('floatleft', backgroundSprites.floatleft.url, backgroundSprites.floatleft.sizeX, backgroundSprites.floatleft.sizeY, backgroundSprites.floatleft.number);
        game.load.spritesheet('miniledge', backgroundSprites.miniledge.url, backgroundSprites.miniledge.sizeX, backgroundSprites.miniledge.sizeY, backgroundSprites.miniledge.number);

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
// A group for all slopes
var slopes;
// A group containing the background elements
var background;
// The controls
var controls;
// sprites
var boulder;
var turrets;
var bullets;

//checkpoints
var checkpoints;
// UI text elements
var respawnText;
var respawnCount;
var framerate;
// Time, used for favicon animation
var then = Date.now();
// Are we in debug mode?
var debug_toggle = 0;

//first cloud
var clouds;

function create() {
        // Create world, with the sky and background grass
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 4500, 600);
    
        // Make wonderful music
        music = game.add.audio('wordl1');
        music.volume = 0.25;
        music.loop = true;
        music_l = game.add.audio('wordl1_l');
        music_l.volume = 0.25;
        music_l.mute = true;
        music_l.loop = true;
    
        background = game.add.group();
        background.create(0,0, 'sky');
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
        for(var i = 0; i < 6; i++) {
                var ground = platforms.create(252 * i, game.world.height - 64, 'hgrass');
                var groundshadow = platforms.create(252 * i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

                var ground = platforms.create(1700, game.world.height - 100, 'hgrass');
                var groundshadow = platforms.create(1700, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;

                var ground = platforms.create(3800, game.world.height - 64, 'hgrass');
                var groundshadow = platforms.create(3800, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
                var ground = platforms.create(3550, game.world.height - 64, 'hgrass');
                var groundshadow = platforms.create(3550, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;

                var ground = platforms.create(930, game.world.height - 260, 'hgrass');
                var groundshadow = platforms.create(930, game.world.height - 222, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;

        for (var i = 0; i < 10; i++) {
                var groundshadow = platforms.create(1050, game.world.height - 450+40*i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
        for (var i = 0; i < 3; i++) {
                var groundshadow = platforms.create(930, game.world.height - 450+35*i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        var ground = platforms.create(930, game.world.height - 483, 'hgrass');
        ground.body.immovable = true;
        var ground = platforms.create(1050, game.world.height - 483, 'hgrass');
        ground.body.immovable = true;



        // Create the floating rocky grass platforms
        for(var i = 0; i < 2; i++) {
                var floating = platforms.create(240 * i, game.world.height - 250, 'floatgrass');

                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }

        // Create the ledge that ends the floating rocky grass platforms
        var ledge = platforms.create(474, game.world.height - 250, 'floatright');
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
        controls.P = game.input.keyboard.addKey(Phaser.Keyboard.P);
        controls.P.onDown.add(pause);


        // Create the sprites of the game
        boulder = new Boulder(game, 500, 150);
        boulder.scale.setTo(1.5,1.5);
        obstacles = game.add.group();
        for (var i = 0; i < platforms.length; i++) {
                obstacles.add(platforms.getAt(i));
        }
        obstacles.add(boulder);
        //Add player
        player = new Player(game, controls);

        checkpoints = new CheckPoint(game, 1173, 52, player);
        checkpoints = new CheckPoint(game, 300, 500, player);

        //create a clouds group
        clouds = game.add.group();
        cloud = new Cloud(game, 600, 250, 'cloud');
        clouds.add(cloud);
        cloud = new Cloud(game, 500, 500, 'cloud');
        clouds.add(cloud);
        for(var i = 0; i< clouds.length; i++){
                obstacles.add(clouds.getAt(i));
        }

//         Add turrets
        turrets = game.add.group();
        turret = new Turret(game, player, obstacles, bullets, 975, 300);
        turret.scale.x *= -1;
        turrets.add(turret);
//        turret = new Turret(game, player, obstacles, bullets, 1300, 500);
//        turrets.add(turret);

        for (var i = 0; i < 5; i++) {
                turrets = game.add.group();
                turret = new Turret(game, player, obstacles, bullets, 4000, 100+i*100);
                turret.scale.x *= -1;
                turrets.add(turret);
        }

        // Add slopes
        slopes = game.add.group();
        var movables = game.add.group();
        movables.add(player);
        movables.add(boulder);


        for(var i = 0; i < 2; i++) {
                var slope = new Slope(this, 860-144 * i, 300+192*.7*i, movables);
                slopes.add(slope);
        }

        for(var i = 0; i < 3; i++) {
                var slope = new Slope(this, 1220+144 * (i+1), 117+192*.7*i, movables);
                slope.scale.x = -1;
                slopes.add(slope);
        }

        var slope = new Slope(this, 2000, 117+192*.7*2, movables);


        // Set up UI text
        createUI();

}

function update() {

        // Collision detection for all objects
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, boulder);
        game.physics.arcade.collide(player, boulder);
        game.physics.arcade.collide(player, turrets);
        game.physics.arcade.collide(boulder, turrets);
        if(game.shifted){
                game.physics.arcade.collide(player, clouds);
        }

        // Update UI
        if(player.health < 2) {
                respawnCount.visible = true;
                respawnText.visible = true;
                respawnCount.text = Math.ceil((player.RESPAWN_TIME - (Date.now() - player.killTime)) / 1000);
                if (Date.now() - player.killTime >= player.RESPAWN_TIME) {
                        respawnCount.visible = false;
                        respawnText.visible = false;
                        player.respawn();
                        boulder.respawn();
                        if(this.game.shifted)
                                bitshift();
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
                turrets.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                obstacles.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                slopes.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
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

function pause() {
        game.paused = !game.paused;
}
