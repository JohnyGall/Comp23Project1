var playState2 = {

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

        //Customize sprites used
        var backgroundSprites = {
                "sky":{
                        "url":"assets/art/default/sky_spritesheet.png",
                        "sizeX":1920,
                        "sizeY":1080,
                        "number":2
                },
                "backgrass":{
                        "url":"assets/art/default/background_grass_spritesheet.png",
                        "sizeX":1008,
                        "sizeY":311,
                        "number":2
                },
                "hgrass":{
                        "url":"assets/art/ice/ice_h_spritesheet.png",
                        "sizeX":252,
                        "sizeY":48,
                        "number":2
                },
                "vgrass":{
                        "url":"assets/art/ice/ice_v_spritesheet.png",
                        "sizeX":144,
                        "sizeY":144,
                        "number":2
                },
                "onegrass":{
                        "url":"assets/art/default/grass_one_spritesheet.png",
                        "sizeX":1,
                        "sizeY":144,
                        "number":2
                },
                "darkgrass":{
                        "url":"assets/art/ice/darkice.png",
                        "sizeX":252,
                        "sizeY":48,
                        "number":2

                },
                "floatgrass":{
                        "url":"assets/art/ice/floating_ice_spritesheet.png",
                        "sizeX":252,
                        "sizeY":48,
                        "number":2
                },
                "floatright":{
                        "url":"assets/art/ice/floatingiceledge_spritesheet.png",
                        "sizeX":64,
                        "sizeY":48,
                        "number":2
                },
                "floatleft":{
                        "url":"assets/art/ice/floatingiceledge1_spritesheet.png",
                        "sizeX":64,
                        "sizeY":48,
                        "number":2
                },
                "miniledge":{
                        "url":"assets/art/ice/mini_floating_ice_spritesheet.png",
                        "sizeX":48,
                        "sizeY":48,
                        "number":2
                }
        }

        var playerObjectSprites = {
                "boulder":{
                        "url":"assets/art/ice/ice_boulder_spritesheet.png",
                        "sizeX":80,
                        "sizeY":80,
                        "number":2
                },
                "player":{
                        "url":"assets/art/default/protag_spritesheet.png",
                        "sizeX":37,
                        "sizeY":65,
                        // no "number" because the player sprite uses the defualt value (1)
                },
                "checkpoint":{
                        "url":"assets/art/default/checkpoint_spritesheet.png",
                        "sizeX":37,
                        "sizeY":65,
                        "number":4
                },
                "turret":{
                        "url":"assets/art/default/turretspritesheet.png",
                        "sizeX":96,
                        "sizeY":96,
                        "number":6
                },
                "bullet":{
                        "url":"assets/art/default/bullet_spritesheet.png",
                        "sizeX":16,
                        "sizeY":16,
                        "number":2
                },
                "cloud":{
                        "url":"assets/art/default/cloud_spritesheet.png",
                        "sizeX":96,
                        "sizeY":32,
                        "number":2
                },
                "spike":{
                        "url":"assets/art/default/spike_spritesheet.png",
                        "sizeX":48,
                        "sizeY":85,
                        "number":2
                }
        }

        // Object and player Sprites and stuff
        game.load.spritesheet('boulder',playerObjectSprites.boulder.url ,playerObjectSprites.boulder.sizeX, playerObjectSprites.boulder.sizeY, playerObjectSprites.boulder.number);
        game.load.spritesheet('player', playerObjectSprites.player.url, playerObjectSprites.player.sizeX, playerObjectSprites.player.sizeY);
        game.load.spritesheet('turret', playerObjectSprites.turret.url ,playerObjectSprites.turret.sizeX, playerObjectSprites.turret.sizeY, playerObjectSprites.turret.number);
        game.load.spritesheet('bullet', playerObjectSprites.bullet.url ,playerObjectSprites.bullet.sizeX, playerObjectSprites.bullet.sizeY, playerObjectSprites.bullet.number);
        game.load.spritesheet('checkpoint', playerObjectSprites.checkpoint.url ,playerObjectSprites.checkpoint.sizeX, playerObjectSprites.checkpoint.sizeY, playerObjectSprites.checkpoint.number);
        game.load.spritesheet('cloud', playerObjectSprites.cloud.url ,playerObjectSprites.cloud.sizeX, playerObjectSprites.cloud.sizeY, playerObjectSprites.cloud.number);
        game.load.spritesheet('spike', playerObjectSprites.spike.url ,playerObjectSprites.spike.sizeX, playerObjectSprites.spike.sizeY, playerObjectSprites.spike.number);
    
        // Level background sprites
        game.load.spritesheet('sky', backgroundSprites.sky.url, backgroundSprites.sky.sizeX, backgroundSprites.sky.sizeY, backgroundSprites.sky.number);
        game.load.spritesheet('backgrass', backgroundSprites.backgrass.url,backgroundSprites.backgrass.sizeX, backgroundSprites.backgrass.sizeY, backgroundSprites.backgrass.number);
        game.load.spritesheet('hgrass', backgroundSprites.hgrass.url,backgroundSprites.hgrass.sizeX, backgroundSprites.hgrass.sizeY, backgroundSprites.hgrass.number);
        game.load.spritesheet('vgrass', backgroundSprites.vgrass.url, backgroundSprites.vgrass.sizeX, backgroundSprites.vgrass.sizeY, backgroundSprites.vgrass.number);
        game.load.spritesheet('onegrass', backgroundSprites.onegrass.url, backgroundSprites.onegrass.sizeX, backgroundSprites.onegrass.sizeY, backgroundSprites.onegrass.number);
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
        this.music = game.add.audio('wordl2');
        this.music.volume = 0.15;
        this.music.loop = true;
        this.music_l = game.add.audio('wordl2_l');
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
        //starting platform
        
        var ground = this.platforms.create(0, game.world.height - 64, 'hgrass');
        var groundshadow = this.platforms.create(0, game.world.height - 21, 'darkgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 37, 0, 6);
        groundshadow.body.immovable = true;

        ground = this.platforms.create(586, game.world.height - 64, 'hgrass');
        var groundshadow = this.platforms.create(586, game.world.height - 21, 'darkgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 37, 0, 6);
        groundshadow.body.immovable = true;
    
        //second long stretch of ground
        for(var i = 0; i < 6; i++) {
                var ground = this.platforms.create(1648 + 252*i, game.world.height - 64, 'hgrass');
                var groundshadow = this.platforms.create(1648 + 252*i, game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }
        
        for (var i = game.world.height - 700; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(798, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
        for (var i = game.world.height - 700; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(778, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
    
        // second puzle blocker
        var ground = this.platforms.create(4120-504, 657, 'hgrass');
        ground.body.immovable = true;
        for (var i = 175; i > -48; i -= 48) {
                var groundshadow = this.platforms.create(1150, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
    
        // intangible slope filler bars 
        /*
        for (var i = 626; i < game.world.height; i += 48) {
                this.background.create(552, i, 'darkgrass');
        }
        for (var i = 700; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(552, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
        this.slopefill(3348,520);
        this.slopefill(3476,648);
        this.slopefill(3865,648);
        this.slopefill(6864,430);
        this.slopefill(6985,558);
        this.slopefill(7116,686);
        this.slopefill(7499,686);
        
        var ground = this.platforms.create(930-252, game.world.height - 533, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        var ground = this.platforms.create(1050-252, game.world.height - 533, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        */
        var ground = this.platforms.create(3096, 400, 'hgrass');
        ground.body.immovable = true;
        for (var i = 423; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(3096, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
    
        var ground = this.platforms.create(4120-504, 657, 'hgrass');
        ground.body.immovable = true;
        for (var i = 675; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(4120-504, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        var ground = this.platforms.create(7256, 684, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        for (var i = 700; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(7256, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }


        var ground = this.platforms.create(8650-504, 300, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        for (var i = 346; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(8650-504, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        var ground = this.platforms.create(620, 94, 'hgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 37, 0, 6);
        var ground = this.platforms.create(798, 94, 'hgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 37, 0, 6);

        // ALL FLOATING PLATFORMS GO HERE
        
        //first ledge, above start
        var floating = this.platforms.create(0, 175, 'floatgrass');
        floating.body.immovable = true;
        floating.body.setSize(252, 56, 0, 6);

        var floating = this.platforms.create(1050, 400, 'floatgrass');
        floating.body.immovable = true;
        floating.body.setSize(252, 56, 0, 6);
        var floating = this.platforms.create(1050+248, 400, 'floatgrass');
        floating.body.immovable = true;
        floating.body.setSize(252, 56, 0, 6);

        var ground = this.platforms.create(1550, 200, 'hgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 37, 0, 6);
        for (var i = 230; i < game.world.height; i += 48) {
                var groundshadow = this.platforms.create(1550, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        // Turret Wall
        for (var i = 500; i > -48; i -= 48) {
                var groundshadow = this.platforms.create(2100, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }
        var groundshadow = this.platforms.create(2004, 500, 'darkgrass');
        groundshadow.body.immovable = true;
        

        var ledge = this.platforms.create(252 - 20, 175, 'floatright');
        ledge.body.immovable = true;
        ledge.body.setSize(64, 54, 0, 6);


        for(var i = 0; i < 2; i++) {
                var floating = this.platforms.create(5100-504 + 240 * i, 600, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }
        var floating = this.platforms.create(5580-504, 600, 'floatright');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        var floating = this.platforms.create(5036-504, 600, 'floatleft');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        var floating = this.platforms.create(6750-504, 600, 'floatgrass');
        floating.body.immovable = true;
        floating.body.setSize(252, 56, 0, 6);
        var floating = this.platforms.create(6686-504, 600, 'floatleft');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);
        var floating = this.platforms.create(6990-504, 600, 'floatright');
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
        // cloud puzzle
        cloud = new Cloud(this, 725, 625); // bottom cloud
        clouds.add(cloud);
        cloud = new Cloud(this, 625, 475); // middle left cloud
        clouds.add(cloud);
        cloud = new Cloud(this, 725, 475); // middle right cloud 
        clouds.add(cloud);
        cloud = new Cloud(this, 525, 325); // top left cloud 
        clouds.add(cloud);
        cloud = new Cloud(this, 625, 325); // top middle cloud
        clouds.add(cloud);
        cloud = new Cloud(this, 725, 325); // top right cloud
        clouds.add(cloud);
    
        //second puzzle
        cloud = new Cloud(this, 1100, 200); // top right cloud
        clouds.add(cloud);

        // PLAYER IS MADE HERE
        this.player = new Player(game, this.controls, this);
        this.player.x = 0;
        this.player.DEFAULT_SPEED = 175;
        this.player.SLIDE_SPEED = 125;
    //remove later
        this.player.y = 0;

//        this.player.SLIDE_SPEED = 125;
//        this.player.DEFAULT_SPEED = 175;
    
        // ALL SPIKES GO HERE
        this.spikes = game.add.group()
        var spike = new Spike(game,1075,360,this.player);
        spike.scale.y = -1;
        this.spikes.add(spike);
        var spike = new Spike(game,1125,360,this.player);
        spike.scale.y = -1;
        this.spikes.add(spike);
        
        //spikes in second puzzle w/ spikes
        for (var i = 0; i < 3; i++) {
                var spike = new Spike(game,2900+50*i, 700,this.player);
                spike.scale.y = -1;
                this.spikes.add(spike);
        }
        for (var i = 0; i < 3; i++) {
                var spike = new Spike(game,2600+50*i, 550,this.player);
                spike.scale.y = -1;
                this.spikes.add(spike);
        }
    
        // ALL CHECKPOINTS GO HERE
        this.checkpoints = game.add.group();
        
        var checkpoint = new CheckPoint(game, 800, 60, this.player);
        this.checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 1700, 173.5, this.player);
        this.checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 2120, 709.5, this.player);
        this.checkpoints.add(checkpoint);
        /*
        var checkpoint = new CheckPoint(game, 5259-502, 573.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 3300-502, 709.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 2100-252, 709.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 1173-252, 240.5, this.player);
        checkpoints.add(checkpoint);
        var checkpoint = new CheckPoint(game, 300-252, 523.5, this.player);
        checkpoints.add(checkpoint);
        */
        
        // ALL BOULDERS GO HERE
        this.boulders = game.add.group();
        var boulder = new Boulder(game, 350, 0);
        this.boulders.add(boulder);
        boulder = new Boulder(game, 1700-252, -100);
        this.boulders.add(boulder);
    
        // ALL SLOPES GO HERE
        this.slopes = game.add.group();
        /*for(var i = 0; i < 2; i++) {
                var slope = new Slope(this, 860-128-252+128 * i, 482+128-128*i, this.boulders, this);
                this.slopes.add(slope);
        }    
        for(var i = 0; i < 2; i++) {
                var slope = new Slope(this, 3924-504+128 * i, 400+128*i, this.boulders, this);
                this.slopes.add(slope);
                slope.scale.x = -1;
        }
        var slope = new Slope(this, 4438-504, 528, this.boulders, this);
        this.slopes.add(slope);
        for(var i = 0; i < 3; i++) {
                var slope = new Slope(this, 7440-504+128 * i, 300+128*i, this.boulders, this);
                this.slopes.add(slope);
                slope.scale.x = -1;
                var wall = this.platforms.create(7440-504-72, 556-110*i, 'onegrass');
                wall.body.immovable = true;
        }
        var slope = new Slope(this, 8072-504, 556, this.boulders, this);
        this.slopes.add(slope);
        */
        // ALL TURRETS GO HERE
        this.turrets = game.add.group();
        
    for (var i = 0; i < 4; i++) {
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 2052, 452-96*i);
        turret.scale.x *= -1;
        this.turrets.add(turret);
    }
        /*
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 2470-504, 700);
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 3200-504, 700);
        turret.scale.x = -1;
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 6730-504, 560);
        turret.scale.x = -1;
        this.turrets.add(turret);
        */

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
                game.physics.arcade.collide(this.player, this.spikes);
        } 

        // Update UI
        if(this.player.health < 2) {
                this.respawnCount.visible = true;
                this.respawnText.visible = true;
                this.respawnCount.text = Math.ceil((this.player.RESPAWN_TIME - (Date.now() - this.player.killTime)) / 500);
                if (Date.now() - this.player.killTime >= this.player.RESPAWN_TIME) {
                        this.respawnCount.visible = false;
                        this.respawnText.visible = false;
                        this.player.respawn();
                        this.boulders.forEach(function(b) {b.respawn();},this);
                        if(this.game.shifted)
                                this.bitshift();
                }
        }
    
        if (this.player.x > this.world.width) {
            this.music.stop();
            this.music_l.stop();
            game.state.start('menu');
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
                this.spikes.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
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

        playState2.bullets.forEach(
                function(b) { b.shift(); }
        , this);
        playState2.turrets.forEach(
                function(t) { t.bmd.clear(); }
        , this);
        if (!game.shifted) {
                playState2.platforms.forEach(playState.shiftOff, this);
                playState2.background.forEach(playState.shiftOff, this);
                playState2.spikes.forEach(playState.shiftOff, this);
                playState2.music.mute = false;
                playState2.music_l.mute = true;
        }
        else {
                playState2.platforms.forEach(playState.shiftOn, this);
                playState2.background.forEach(playState.shiftOn, this);
                playState2.spikes.forEach(playState.shiftOn, this);
                playState2.music.mute = true;
                playState2.music_l.mute = false;
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

slopefill: function(x,y) {
        for (var i = y; i < game.world.height; i += 48) {
                var fill = this.background.create(x, i, 'darkgrass');
                fill.scale.x = 0.56
        }
},
};