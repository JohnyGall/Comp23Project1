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

var bgs;
var sprites;

function preload () {

       // Customise the sprites used
       bgs = {
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
                       "sizeY":144,
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
                       "sizeX":64,
                       "sizeY":48,
                       "number":2
               },
               "floatleft":{
                       "url":"assets/floatingledge1_spritesheet.png",
                       "sizeX":64,
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

       sprites = {
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
       game.load.spritesheet('boulder',sprites.boulder.url ,sprites.boulder.sizeX, sprites.boulder.sizeY, sprites.boulder.number);
       game.load.spritesheet('player', sprites.player.url, sprites.player.sizeX, sprites.player.sizeY);
       game.load.spritesheet('turret', sprites.turret.url ,sprites.turret.sizeX, sprites.turret.sizeY, sprites.turret.number);
       game.load.spritesheet('bullet', sprites.bullet.url ,sprites.bullet.sizeX, sprites.bullet.sizeY, sprites.bullet.number);
       game.load.spritesheet('cloud', sprites.cloud.url ,sprites.cloud.sizeX, sprites.cloud.sizeY, sprites.cloud.number);

       // Level background sprites
       game.load.spritesheet('sky', bgs.sky.url, bgs.sky.sizeX, bgs.sky.sizeY, bgs.sky.number);
       game.load.spritesheet('backgrass', bgs.backgrass.url,bgs.backgrass.sizeX, bgs.backgrass.sizeY, bgs.backgrass.number);
       game.load.spritesheet('hgrass', bgs.hgrass.url,bgs.hgrass.sizeX, bgs.hgrass.sizeY, bgs.hgrass.number);
       game.load.spritesheet('vgrass', bgs.vgrass.url, bgs.vgrass.sizeX, bgs.vgrass.sizeY, bgs.vgrass.number);
       game.load.spritesheet('darkgrass', bgs.darkgrass.url, bgs.darkgrass.sizeX, bgs.darkgrass.sizeY, bgs.darkgrass.number);
       game.load.spritesheet('floatgrass', bgs.floatgrass.url, bgs.floatgrass.sizeX, bgs.floatgrass.sizeY, bgs.floatgrass.number);
       game.load.spritesheet('floatright', bgs.floatright.url, bgs.floatright.sizeX, bgs.floatright.sizeY, bgs.floatright.number);
       game.load.spritesheet('floatleft', bgs.floatleft.url, bgs.floatleft.sizeX, bgs.floatleft.sizeY, bgs.floatleft.number);
       game.load.spritesheet('miniledge', bgs.miniledge.url, bgs.miniledge.sizeX, bgs.miniledge.sizeY, bgs.miniledge.number);

        // Music
        game.load.audio('wordl1_l', ['assets/music/bitshift2_lr.wav', 'assets/music/bitshift2_lr.ogg']);
        game.load.audio('wordl1', ['assets/music/bitshift2.wav', 'assets/music/bitshift2.ogg']);   
        game.load.audio('wordl2_l', ['assets/music/bitshift3_lr.wav', 'assets/music/bitshift3_lr.ogg']);
        game.load.audio('wordl2', ['assets/music/bitshift3.wav', 'assets/music/bitshift3.ogg']);
    
        // Other sfx
        game.load.audio('player_jump', ['assets/music/player_jump.wav', 'assets/music/player_jump.ogg']);
        game.load.audio('player_spawn', ['assets/music/player_spawn.wav', 'assets/music/player_spawn.ogg']);

        game.load.audio('turret_charge_hr', ['assets/music/turret_charge_hr.wav', 'assets/music/turret_charge_hr.ogg']);
        game.load.audio('turret_fire_hr', ['assets/music/turret_fire_hr.wav', 'assets/music/turret_fire_hr.ogg']); 
        game.load.audio('turret_fire_lr', ['assets/music/turret_fire_lr.wav', 'assets/music/turret_fire_lr.ogg']); 

        // Makes FPS counter work
        game.time.advancedTiming = true;
        // Allows Google Fonts to be used remotely
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

// The player sprite, extended from Phaser.Sprite
var player;
// A group of the static platforms in the level
var platforms;
// A group for all slopes
var slopes;
// A group containing the background elements
var background;
// The controls
var controls;
// sprite groups
var boulders;
var turrets;
var bullets;
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
        music.volume = 0.15;
        music.loop = true;
        music_l = game.add.audio('wordl1_l');
        music_l.volume = 0.15;
        music_l.mute = true;
        music_l.loop = true;
    
        background = game.add.group();
        background.create(0,0, 'sky');
        background.create(0, 500, 'backgrass');
        background.create(1008, 500, 'backgrass');

        // Create a new part of the game keeping track of the world resolution
        game.shifted = false;

        // Create platforms group
        platforms = game.add.group();
        platforms.enableBody = true;

        // Create other groups
        bullets = game.add.group();
        boulders = game.add.group();
        turrets = game.add.group();
        clouds = game.add.group();
        slopes = game.add.group();

        //Set up level
        level1();
        
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

        //Add player
        player = new Player(game, 200, game.height - 128, controls);

        // Set up UI text
        createUI();

}

function update() {
        if(!music.isPlaying) {
            music.play()
            music_l.play()
        }
        // Collision detection for all objects
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, boulders);
        game.physics.arcade.collide(player, boulders);
        game.physics.arcade.collide(player, turrets);
        game.physics.arcade.collide(boulders, turrets);

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
                        boulders.forEach(function(b) {b.respawn();},this);
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
                boulders.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                turrets.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                platforms.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
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
        // We use game.width, not game.world.width, because the text is locked to the camera
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

        turrets.forEach(
                function(t) { t.bmd.clear(); }
        , this);

        if (!game.shifted) {
                platforms.forEach(shiftOff, this);
                background.forEach(shiftOff, this);
                music.mute = false;
                music_l.mute = true;
        }
        else {
                platforms.forEach(shiftOn, this);
                background.forEach(shiftOn, this);
                music.mute = true;
                music_l.mute = false;
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

function level1() {
        var w = game.world.width;
        var h = game.world.height;

        // add infinite sky
        var c = 0;
        while (c < w) {
                background.create(c, 0, 'sky');
                c += bgs.sky.sizeX;
        }

        // add infinite rolling hills
        c = 0;
        while (c < w) {
                background.create(c, h - bgs.backgrass.sizeY, 'backgrass');
                c += bgs.backgrass.sizeX;
        }

        // ZONE 1
        // create three flat platforms and dark grass to go underneath them
        for (var i = 0; i < 4; i++) {
                var ground = platforms.create(bgs.hgrass.sizeX * i, h - bgs.hgrass.sizeY * 2, 'hgrass');
                ground.body.immovable = true;
                ground.body.setSize(bgs.hgrass.sizeX, 37, 0, 6);

                var groundshadow = platforms.create(bgs.darkgrass.sizeX * i, h - bgs.darkgrass.sizeY, 'darkgrass');
                groundshadow.body.immovable = true;
        }


}