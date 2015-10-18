var playState = {

preload: function() {
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

},

create: function() {

	this.then = Date.now();
	// Are we in debug mode?
	this.debug_toggle = 0;
    
        // Create world
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 8191, 800);
    
        // Make wonderful this.music
        this.music = game.add.audio('wordl1');
        this.music.volume = 0.15;
        this.music.loop = true;
        this.music_l = game.add.audio('wordl1_l');
        this.music_l.volume = 0.15;
        this.music_l.mute = true;
        this.music_l.loop = true;
    
        // Create looping background images
        this.background = game.add.group();
        for (var i = 0; i <= game.world.width; i += 1920) {
            this.background.create(i,0, 'sky');
        }
        for (var i = 0; i <= game.world.width; i += 1008) {
            this.background.create(i,500, 'backgrass');
        }

        // Create a new part of the game keeping track of the world resolution
        game.shifted = false;

        // Create this.platforms group
        this.platforms = game.add.group();
        this.platforms.enableBody = true;

        // Create a this.bullets group
        this.bullets = game.add.group();

        // ALL STANDARD GROUND PLATFORMS GO HERE
        for(var i = 0; i < 6; i++) {
                var ground = this.platforms.create(252 * i, game.world.height - 64, 'hgrass');
                var groundshadow = this.platforms.create(252 * i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }
    
        for(var i = 0; i < 2; i++) {
                var ground = this.platforms.create(9300+252 * i, game.world.height - 64, 'hgrass');
                var groundshadow = this.platforms.create(9300*252 * i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

        for(var i = 0; i < 1; i++) {
                var floating = this.platforms.create(2200+240 * i, game.world.height - 300, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }
    
        for(var i = 0; i < 7; i++) {
                var ground = this.platforms.create(1900 + 252*i, game.world.height - 64, 'hgrass');
                var groundshadow = this.platforms.create(1900 + 252*i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

                var ground = this.platforms.create(930, game.world.height - 290, 'hgrass');
                var groundshadow = this.platforms.create(930, game.world.height - 270, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;

        for (var i = 0; i < 12; i++) {
                var groundshadow = this.platforms.create(1050, game.world.height - 500+40*i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
        for (var i = 0; i < 3; i++) {
                var groundshadow = this.platforms.create(930, game.world.height - 500+35*i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        var ground = this.platforms.create(930, game.world.height - 533, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        var ground = this.platforms.create(1050, game.world.height - 533, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;

        var ground = this.platforms.create(3600, 400, 'hgrass');
        ground.body.immovable = true;
        for (var i = 0; i < 10; i++) {
                var groundshadow = this.platforms.create(3600, 423+35*i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
    
        var ground = this.platforms.create(4120, 657, 'hgrass');
        ground.body.immovable = true;
        for (var i = 0; i < 10; i++) {
                var groundshadow = this.platforms.create(4120, 675+35*i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        var ground = this.platforms.create(7760, 684, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
    

        // ALL FLOATING PLATFORMS GO HERE
        for(var i = 0; i < 2; i++) {
                var floating = this.platforms.create(240 * i, game.world.height - 250, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }

        var ledge = this.platforms.create(474, game.world.height - 250, 'floatright');
        ledge.body.immovable = true;
        ledge.body.setSize(64, 54, 0, 6);

        for(var i = 0; i < 2; i++) {
                var floating = this.platforms.create(5100 + 240 * i, 600, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }
        var floating = this.platforms.create(5580, 600, 'floatright');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        var floating = this.platforms.create(5036, 600, 'floatleft');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        var floating = this.platforms.create(6750, 600, 'floatgrass');
        floating.body.immovable = true;
        floating.body.setSize(252, 56, 0, 6);
        var floating = this.platforms.create(6686, 600, 'floatleft');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);
        var floating = this.platforms.create(6990, 600, 'floatright');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);
    
        // Add this.controls to the game
        this.controls = game.input.keyboard.createCursorKeys();
        this.controls.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.controls.space.onDown.add(this.bitshift);
        this.controls.V = game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.controls.tilde = game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
        // Tilde toggles debug mode
        this.controls.tilde.onDown.add(function() {
                this.debug_toggle = this.debug_toggle ? false : true;
                // If debug is turned off, we want to clear the bounding boxes and make the FPS
                // counter invisible. This code is put here because in render it would be called
                // at every frame.
                this.framerate.visible = false;
                game.debug.reset();
        }, this);
        this.controls.P = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.controls.P.onDown.add(this.pause);

        // ALL CLOUDS GO HERE
        clouds = game.add.group();
        cloud = new Cloud(this,3500,600);
        clouds.add(cloud);
        cloud = new Cloud(this,5900,600);
        clouds.add(cloud);
        cloud = new Cloud(this,6200,600);
        clouds.add(cloud);
        cloud = new Cloud(this,6500,600);
        clouds.add(cloud);
        cloud = new Cloud(this,7200,450);
        clouds.add(cloud);

        // PLAYER IS MADE HERE
        this.player = new Player(game, this.controls, this);
    
        // ALL CHECKPOINTS GO HERE
        checkpoints = game.add.group();
        var checkpoint = new CheckPoint(game, 6845, 573.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 5259, 573.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 3300, 709.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 2100, 709.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 1173, 52, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 300, 500, this.player);
        checkpoints.add(checkpoint);

        // ALL BOULDERS GO HERE
        this.boulders = game.add.group();
        var boulder = new Boulder(game, 500, 150);
        this.boulders.add(boulder);
        boulder = new Boulder(game, 1700, -100);
        this.boulders.add(boulder);
        boulder = new Boulder(game, 2420, 300);
        this.boulders.add(boulder);
    
        // ALL SLOPES GO HERE
        this.slopes = game.add.group();
        for(var i = 0; i < 2; i++) {
                var slope = new Slope(this, 860-128+128 * i, 482+128-128*i, this.boulders, this);
                this.slopes.add(slope);
        }    
        for(var i = 0; i < 2; i++) {
                var slope = new Slope(this, 3924+128 * i, 400+128*i, this.boulders, this);
                this.slopes.add(slope);
                slope.scale.x = -1;
        }
        var slope = new Slope(this, 4438, 528, this.boulders, this);
        this.slopes.add(slope);
        for(var i = 0; i < 3; i++) {
                var slope = new Slope(this, 7440+128 * i, 300+128*i, this.boulders, this);
                this.slopes.add(slope);
                slope.scale.x = -1;
        }
        var slope = new Slope(this, 8072, 556, this.boulders, this);
        this.slopes.add(slope);
    
        // ALL TURRETS GO HERE
        this.turrets = game.add.group();
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 975, 475);
        turret.scale.x *= -1;
        this.turrets.add(turret); 
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 2470, 700);
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 3200, 700);
        turret.scale.x = -1;
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 6730, 560);
        turret.scale.x = -1;
        this.turrets.add(turret);


        // Set up UI text
        this.createUI();

},

update: function() {
        if(!this.music.isPlaying) {
            this.music.play()
            this.music_l.play()
        }
    
        // Collision detection for all objects
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.platforms, this.boulders);
        game.physics.arcade.collide(this.player, this.boulders);
        game.physics.arcade.collide(this.player, this.turrets);
        game.physics.arcade.collide(this.boulders, this.turrets);

        if(game.shifted){
                game.physics.arcade.collide(this.player, clouds);
        }

        // Update UI
        if(this.player.health < 2) {
                this.respawnCount.visible = true;
                this.respawnText.visible = true;
                this.respawnCount.text = Math.ceil((this.player.RESPAWN_TIME - (Date.now() - this.player.killTime)) / 1000);
                if (Date.now() - this.player.killTime >= this.player.RESPAWN_TIME) {
                        this.respawnCount.visible = false;
                        this.respawnText.visible = false;
                        this.player.respawn();
                        this.boulders.forEach(function(b) {b.respawn();},this);
                        if(this.game.shifted)
                                this.bitshift();
                }
        }

},

render: function() {
        // Don't render anything unless the user wants to debug
        if (this.debug_toggle === true) {
                // Clear the debug render screen, so there isn't any flicker
                game.debug.context.clearRect(0, 0, game.world.width, game.world.height);
                // Show and update the this.framerate
                this.framerate.visible = true;
                this.framerate.text = game.time.fps;
                // Draw bounding boxes
                game.debug.body(this.player);
                this.boulders.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                this.turrets.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                this.platforms.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                clouds.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');

                this.slopes.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
                // Animate the favicon, for fun
                if(Date.now() - this.then >= 50) {
                        this.then = Date.now();
                        favicon();
                }

        }
},

createUI: function() {
        // Set up text for the large countdown to respawn
        // We use game.width, not game.world.getBounds().width, because the text is locked to the camera
        this.respawnCount = game.add.text(game.width/2, game.height/2, "");
        // Keep text from moving when this.player moves
        this.respawnCount.fixedToCamera = true;
        // Set the anchor so centering isn't based off the top left corner
        this.respawnCount.anchor.setTo(0.5);
        // font settings
        this.respawnCount.font = fontname;
        this.respawnCount.fontSize = 150;
        this.respawnCount.align = 'center';
        this.respawnCount.fill = '#fff';
        this.respawnCount.stroke = '#000';
        this.respawnCount.strokeThickness = 3;
        this.respawnCount.setShadow(5, 5, 'rgba(0,0,0,1)', 0);
        // Make the text invisible until a respawn countdown is needed
        this.respawnCount.visible = false;

        // Similarly, we need text above the countdown to tell the this.player they will respawn
        this.respawnText = game.add.text(game.width/2, game.height/2 - 150, "Respawn in:");
        this.respawnText.fixedToCamera = true;
        this.respawnText.anchor.setTo(0.5);
        this.respawnText.font = fontname;
        this.respawnText.fontSize = 48;
        this.respawnText.align = 'center';
        this.respawnText.fill = '#fff';
        this.respawnText.stroke = '#000';
        this.respawnText.strokeThickness = 3;
        this.respawnText.setShadow(3, 3, 'rgba(0,0,0,1)', 0);
        this.respawnText.visible = false;

        // Add an FPS counter to the top left corner, to be turned on with debug mode
        this.framerate = game.add.text(25, 25, game.time.fps);
        this.framerate.fixedToCamera = true;
        this.framerate.font = fontname;
        this.framerate.fontSize = 14;
        this.framerate.fill = '#33ff33';
        this.framerate.stroke = '#000';
        this.framerate.strokeThickness = 3;
        this.framerate.visible = false;
},


bitshift: function() {
        game.shifted = !game.shifted;

        playState.bullets.forEach(
                function(b) { b.shift(); }
        , this);
        playState.turrets.forEach(
                function(t) { t.bmd.clear(); }
        , this);
        if (!game.shifted) {
                playState.platforms.forEach(playState.shiftOff, this);
                playState.background.forEach(playState.shiftOff, this);
                playState.music.mute = false;
                playState.music_l.mute = true;
        }
        else {
                playState.platforms.forEach(playState.shiftOn, this);
                playState.background.forEach(playState.shiftOn, this);
                playState.music.mute = true;
                playState.music_l.mute = false;
        }
},

shiftOff: function(object) {
        object.frame = 0;
},

shiftOn: function(object) {
        object.frame = 1;
},

pause: function() {
        game.paused = !game.paused;
},

};