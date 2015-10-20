// The playstate for Level 1

var playState = {

preload: function() {
        // Load the chosen music and SFX
        var currentSoundSet = JSON.parse(localStorage.getItem('currentSoundSetStorage'));

        if (currentSoundSet == undefined){
                currentSoundSet = "default";
        }

        var loadSounds = new XMLHttpRequest();
        loadSounds.open("GET", "assets/music/" + currentSoundSet +
                                        "/" + currentSoundSet + ".json", false);
        loadSounds.send(null);
        var sounds = JSON.parse(loadSounds.responseText);
        var music = sounds.music;
        var soundEffects = sounds.SFX;

        // Music
        game.load.audio('wordl1_l', [music.world1_l.wavURL,
                                     music.world1_l.oggURL]);
        game.load.audio('wordl1', [music.world1.wavURL,
                                   music.world1.oggURL]);
        game.load.audio('wordl2_l', [music.world2_l.wavURL,
                                     music.world2_l.oggURL]);
        game.load.audio('wordl2', [music.world2.wavURL,
                                   music.world2.oggURL]);

        // Other sfx
        game.load.audio('player_jump', [soundEffects.player_jump.wavURL,
                                        soundEffects.player_jump.oggURL]);
        game.load.audio('player_spawn', [soundEffects.player_jump.wavURL,
                                         soundEffects.player_jump.oggURL]);

        game.load.audio('turret_charge_hr',
                        [soundEffects.turret_charge_hr.wavURL,
                         soundEffects.turret_charge_hr.oggURL]);
        game.load.audio('turret_fire_hr', [soundEffects.turret_fire_hr.wavURL,
                                           soundEffects.turret_fire_hr.oggURL]);
        game.load.audio('turret_fire_lr', [soundEffects.turret_fire_lr.wavURL,
                                           soundEffects.turret_fire_lr.oggURL]);

        // Load art
        var currentArtSet = JSON.parse(localStorage.getItem('currentArtSetStorage'));
        if (currentArtSet == undefined){
                currentArtSet = "default";
        }
        var loadSprites = new XMLHttpRequest();
        loadSprites.open("GET", "assets/art/" + currentArtSet + "/" +
                                                currentArtSet + ".json", false);
        loadSprites.send(null);
        var sprites = JSON.parse(loadSprites.responseText);
        var playerObjectSprites = sprites.playerObjectSprites;
        var backgroundSprites = sprites.backgroundSprites;

        // boulders
        game.load.spritesheet('boulder', playerObjectSprites.boulder.url,
                              playerObjectSprites.boulder.sizeX,
                              playerObjectSprites.boulder.sizeY,
                              playerObjectSprites.boulder.number);

        // player
        game.load.spritesheet('player', playerObjectSprites.player.url,
                              playerObjectSprites.player.sizeX,
                              playerObjectSprites.player.sizeY);

        // turrets
        game.load.spritesheet('turret', playerObjectSprites.turret.url,
                              playerObjectSprites.turret.sizeX,
                              playerObjectSprites.turret.sizeY,
                              playerObjectSprites.turret.number);

        // bullets
        game.load.spritesheet('bullet', playerObjectSprites.bullet.url,
                              playerObjectSprites.bullet.sizeX,
                              playerObjectSprites.bullet.sizeY,
                              playerObjectSprites.bullet.number);

        // checkpoints
        game.load.spritesheet('checkpoint', playerObjectSprites.checkpoint.url,
                              playerObjectSprites.checkpoint.sizeX,
                              playerObjectSprites.checkpoint.sizeY,
                              playerObjectSprites.checkpoint.number);

        // clouds
        game.load.spritesheet('cloud', playerObjectSprites.cloud.url,
                              playerObjectSprites.cloud.sizeX,
                              playerObjectSprites.cloud.sizeY,
                              playerObjectSprites.cloud.number);

        game.load.spritesheet('hice', backgroundSprites.hice.url,
                              backgroundSprites.hice.sizeX,
                              backgroundSprites.hice.sizeY,
                              backgroundSprites.hice.number);

        // sky
        game.load.spritesheet('sky', backgroundSprites.sky.url,
                              backgroundSprites.sky.sizeX,
                              backgroundSprites.sky.sizeY,
                              backgroundSprites.sky.number);

        // background grassy rolling hills
        game.load.spritesheet('backgrass', backgroundSprites.backgrass.url,
                              backgroundSprites.backgrass.sizeX,
                              backgroundSprites.backgrass.sizeY,
                              backgroundSprites.backgrass.number);

        // horizontal grass platforms
        game.load.spritesheet('hgrass', backgroundSprites.hgrass.url,
                              backgroundSprites.hgrass.sizeX,
                              backgroundSprites.hgrass.sizeY,
                              backgroundSprites.hgrass.number);

        // vertical (sloped) grass platforms
        game.load.spritesheet('vgrass', backgroundSprites.vgrass.url,
                              backgroundSprites.vgrass.sizeX,
                              backgroundSprites.vgrass.sizeY,
                              backgroundSprites.vgrass.number);

        // one pixel thick vertical grass
        game.load.spritesheet('onegrass', backgroundSprites.onegrass.url,
                              backgroundSprites.onegrass.sizeX,
                              backgroundSprites.onegrass.sizeY,
                              backgroundSprites.onegrass.number);

        // dark grass for filling in the empty spaces under platforms
        game.load.spritesheet('darkgrass', backgroundSprites.darkgrass.url,
                              backgroundSprites.darkgrass.sizeX,
                              backgroundSprites.darkgrass.sizeY,
                              backgroundSprites.darkgrass.number);

        // rocky floating grass platforms
        game.load.spritesheet('floatgrass', backgroundSprites.floatgrass.url,
                              backgroundSprites.floatgrass.sizeX,
                              backgroundSprites.floatgrass.sizeY,
                              backgroundSprites.floatgrass.number);

        // cliff edge for floating platforms (right side)
        game.load.spritesheet('floatright', backgroundSprites.floatright.url,
                              backgroundSprites.floatright.sizeX,
                              backgroundSprites.floatright.sizeY,
                              backgroundSprites.floatright.number);

        // cliff edge for floating platforms (left side)
        game.load.spritesheet('floatleft', backgroundSprites.floatleft.url,
                              backgroundSprites.floatleft.sizeX,
                              backgroundSprites.floatleft.sizeY,
                              backgroundSprites.floatleft.number);

        // mini floating rocky grass platforms
        game.load.spritesheet('miniledge', backgroundSprites.miniledge.url,
                              backgroundSprites.miniledge.sizeX,
                              backgroundSprites.miniledge.sizeY,
                              backgroundSprites.miniledge.number);

        // horizontal ice platform for level end
        game.load.spritesheet('hice', "assets/art/ice/ice_h_spritesheet.png",
                              backgroundSprites.hgrass.sizeX,
                              backgroundSprites.hgrass.sizeY,
                              backgroundSprites.hgrass.number);

        // Makes FPS counter work
        game.time.advancedTiming = true;
        // Allows Google Web Fonts to be used
        game.load.script('webfont',
                '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

},

create: function() {
        // Store initial time of creation
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

        // Create a new variable in game keeping track of the world resolution
        game.shifted = false;

        this.platforms = game.add.group();
        this.platforms.enableBody = true;

        this.bullets = game.add.group();

        // ALL STANDARD GROUND PLATFORMS GO HERE

        var ground;
        var groundshadow;

        //starting platform
        for(var i = 0; i < 5; i++) {
                ground = this.platforms.create(252 * i,
                                              game.world.height - 64, 'hgrass');

                groundshadow = this.platforms.create(252 * i,
                                           game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

        //second long stretch of ground
        for(var i = 0; i < 6; i++) {
                ground = this.platforms.create(1648 + 252 * i,
                                              game.world.height - 64, 'hgrass');

                groundshadow = this.platforms.create(1648 + 252 * i,
                                           game.world.height - 21, 'darkgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 37, 0, 6);
                groundshadow.body.immovable = true;
        }

        // turret cliff
        ground = this.platforms.create(930 - 252,
                                     game.world.height - 290, 'hgrass');
        groundshadow = this.platforms.create(930 - 252,
                                  game.world.height - 270, 'darkgrass');
        groundshadow = this.platforms.create(930 - 252,
                                  game.world.height - 222, 'darkgrass');
        ground.body.immovable = true;
        ground.body.setSize(252, 37, 0, 6);
        groundshadow.body.immovable = true;

        for (var i = game.world.height - 500; i < game.world.height; i += 48) {
                groundshadow = this.platforms.create(798, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        for (var i = game.world.height - 500; i < game.world.height; i += 48) {
                groundshadow = this.platforms.create(778, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        // intangible slope filler bars
        for (var i = 626; i < game.world.height; i += 48) {
                this.background.create(552, i, 'darkgrass');
        }

        for (var i = 700; i < game.world.height; i += 48) {
                groundshadow = this.platforms.create(552, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        this.slopefill(3348,520);
        this.slopefill(3476,648);
        this.slopefill(3865,648);
        this.slopefill(6864,430);
        this.slopefill(6985,558);
        this.slopefill(7116,686);
        this.slopefill(7499,686);

        ground = this.platforms.create(930 - 252,
                        game.world.height - 533, 'hgrass');

        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;

        ground = this.platforms.create(1050 - 252,
                        game.world.height - 533, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;

        ground = this.platforms.create(3096, 400, 'hgrass');
        ground.body.immovable = true;
        for (var i = 423; i < game.world.height; i += 48) {
                groundshadow = this.platforms.create(3096, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        var ground = this.platforms.create(4120-504, 657, 'hgrass');
        ground.body.immovable = true;
        for (var i = 675; i < game.world.height; i += 48) {
                groundshadow =
                        this.platforms.create(4120 - 504, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }

        ground = this.platforms.create(7256, 684, 'hgrass');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        for (var i = 700; i < game.world.height; i += 48) {
                groundshadow = this.platforms.create(7256, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }


        ground = this.platforms.create(8650 - 504, 300, 'hice');
        ground.body.setSize(252, 37, 0, 6);
        ground.body.immovable = true;
        for (var i = 346; i < game.world.height; i += 48) {
                groundshadow =
                        this.platforms.create(8650 - 504, i, 'darkgrass');
                groundshadow.body.immovable = true;
        }


        // ALL FLOATING PLATFORMS GO HERE
        var floating;
        var ledge;
        //first boulder ledge
        for(var i = 0; i < 1; i++) {
                floating = this.platforms.create(240 * i,
                                game.world.height - 250, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }

        ledge = this.platforms.create(474 - 228,
                        game.world.height - 250, 'floatright');
        ledge.body.immovable = true;
        ledge.body.setSize(64, 54, 0, 6);

        //second boulder ledge
        for(var i = 0; i < 1; i++) {
                floating = this.platforms.create(2200 - 502 + 240 * i,
                                         game.world.height - 300, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }

        for(var i = 0; i < 2; i++) {
                floating = this.platforms.create(5100 - 504 + 240 * i,
                                                        600, 'floatgrass');
                floating.body.immovable = true;
                floating.body.setSize(252, 56, 0, 6);
        }

        floating = this.platforms.create(5580 - 504, 600, 'floatright');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        floating = this.platforms.create(5036 - 504, 600, 'floatleft');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        floating = this.platforms.create(6750 - 504, 600, 'floatgrass');
        floating.body.immovable = true;
        floating.body.setSize(252, 56, 0, 6);

        floating = this.platforms.create(6686 - 504, 600, 'floatleft');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        floating = this.platforms.create(6990 - 504, 600, 'floatright');
        floating.body.immovable = true;
        floating.body.setSize(64, 54, 0, 6);

        // Add this.controls to the game
        this.controls = game.input.keyboard.createCursorKeys();

        this.controls.space =
                game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.controls.space.onDown.add(this.bitshift);

        this.controls.V = game.input.keyboard.addKey(Phaser.Keyboard.V);

        this.controls.tilde = game.input.keyboard.addKey(Phaser.Keyboard.TILDE);
        // Tilde toggles debug mode
        this.controls.tilde.onDown.add(function() {
                this.debug_toggle = this.debug_toggle ? false : true;
                // If debug is turned off, we want to clear the bounding boxes
                // and make the FPS counter invisible. This code is put here
                // because in render it would be called at every frame.
                this.framerate.visible = false;
                game.debug.reset();
        }, this);

        this.controls.P = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.controls.P.onDown.add(this.pause);

        // ALL CLOUDS GO HERE
        clouds = game.add.group();
        var cloud = new Cloud(this, 3500 - 502, 600);
        clouds.add(cloud);
        cloud = new Cloud(this, 5900 - 502, 600);
        clouds.add(cloud);
        cloud = new Cloud(this, 6200 - 502, 600);
        clouds.add(cloud);
        cloud = new Cloud(this, 6500 - 502, 600);
        clouds.add(cloud);
        cloud = new Cloud(this, 7200 - 502, 450);
        clouds.add(cloud);

        // ALL BOULDERS GO HERE
        this.boulders = game.add.group();
        var boulder = new Boulder(game, 500 - 252, 150);
        this.boulders.add(boulder);
        boulder = new Boulder(game, 1700 - 252, -100);
        this.boulders.add(boulder);
        boulder = new Boulder(game, 2420 - 502, 300);
        this.boulders.add(boulder);

        var slope;

        // ALL SLOPES GO HERE
        this.slopes = game.add.group();
        for(var i = 0; i < 2; i++) {
                slope = new Slope(this, 860 - 128 - 252 + 128 * i,
                                      482 + 128 - 128 * i, this.boulders, this);
                this.slopes.add(slope);
        }

        for(var i = 0; i < 2; i++) {
                slope = new Slope(this, 3924 - 504 + 128 * i,
                                            400 + 128 * i, this.boulders, this);
                this.slopes.add(slope);
                slope.scale.x = -1;
        }

        slope = new Slope(this, 4438 - 504, 528, this.boulders, this);
        this.slopes.add(slope);

        for(var i = 0; i < 3; i++) {
                slope = new Slope(this, 7440 - 504 + 128 * i, 300 + 128 * i,
                                                           this.boulders, this);
                this.slopes.add(slope);
                slope.scale.x = -1;
                var wall = this.platforms.create(7440 - 504 - 72, 556 - 110 * i,
                                                                    'onegrass');
                wall.body.immovable = true;
        }

        slope = new Slope(this, 8072 - 504, 556, this.boulders, this);
        this.slopes.add(slope);

        // PLAYER IS MADE HERE
        this.player = new Player(game, this.controls, 200,
                                 game.world.height - 100, this);

        // ALL CHECKPOINTS GO HERE
        checkpoints = game.add.group();
        var checkpoint = new CheckPoint(game, 6845 - 502, 573.5, this.player);
        checkpoints.add(checkpoint);
        checkpoint = new CheckPoint(game, 5259 - 502, 573.5, this.player);
        checkpoints.add(checkpoint);
        checkpoint = new CheckPoint(game, 3300 - 502, 709.5, this.player);
        checkpoints.add(checkpoint);
        checkpoint = new CheckPoint(game, 2100 - 252, 709.5, this.player);
        checkpoints.add(checkpoint);
        checkpoint = new CheckPoint(game, 1173 - 252, 240.5, this.player);
        checkpoints.add(checkpoint);
        checkpoint = new CheckPoint(game, 300 - 252, 523.5, this.player);
        checkpoints.add(checkpoint);

        // ALL TURRETS GO HERE
        this.turrets = game.add.group();
        turret = new Turret(game, this.player, this.platforms, this.slopes,
                                                          this, 975 - 252, 475);
        turret.scale.x *= -1;
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes, this, 2470-504, 700);
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes,
                                                         this, 2470 - 504, 700);
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes,
                                                         this, 3200 - 504, 700);
        turret.scale.x = -1;
        this.turrets.add(turret);
        turret = new Turret(game, this.player, this.platforms, this.slopes,
                                                         this, 6730 - 504, 560);
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
                this.respawnCount.text =
                        Math.ceil((this.player.RESPAWN_TIME -
                                        (Date.now() -
                                                this.player.killTime)) / 500);

                if (Date.now() - this.player.killTime >=
                        this.player.RESPAWN_TIME) {

                        this.respawnCount.visible = false;
                        this.respawnText.visible = false;
                        this.player.respawn();
                        this.boulders.forEach(function(b) {b.respawn();}, this);
                        if(this.game.shifted)
                                this.bitshift();
                }
        }

        if (this.player.x > this.world.width) {
            this.music.stop();
            this.music_l.stop();
            game.state.start('pre2');
        }
},

        render: function() {

                // Don't render anything unless the user wants to debug
                if (this.debug_toggle === true) {

                        // Clear the debug render screen, so there isn't
                        // any flicker
                        game.debug.context.clearRect(0, 0,
                                        game.world.width, game.world.height);

                        // Show and update the this.framerate
                        this.framerate.visible = true;
                        this.framerate.text = game.time.fps;

                        // Draw bounding boxes
                        game.debug.body(this.player);
                        this.boulders.forEach(game.debug.body,
                                      game.debug, game.debug,
                                      'rgba(255, 30, 30, 0.3)');
                        this.turrets.forEach(game.debug.body,
                                      game.debug, game.debug,
                                      'rgba(255, 30, 30, 0.3)');
                        this.platforms.forEach(game.debug.body,
                                      game.debug, game.debug,
                                      'rgba(255, 30, 30, 0.3)');
                        this.clouds.forEach(game.debug.body,
                                      game.debug, game.debug,
                                      'rgba(255, 30, 30, 0.3)');
                        this.slopes.forEach(game.debug.body,
                                      game.debug, game.debug,
                                      'rgba(255, 30, 30, 0.3)');

                        // Animate the favicon, for fun
                        if(Date.now() - this.then >= 50) {
                                this.then = Date.now();
                                favicon();
                        }

                }
        },

        createUI: function() {
                // Set up text for the large countdown to respawn
                // We use game.width, not game.world.getBounds().width,
                // because the text is locked to the camera
                this.respawnCount = game.add.text(game.width/2,
                                                  game.height/2, "");
                // Keep text from moving when this.player moves
                this.respawnCount.fixedToCamera = true;
                // Set the anchor so centering isn't based off the top
                // left corner
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

                // Similarly, we need text above the countdown to tell the
                // this.player they will respawn
                this.respawnText = game.add.text(game.width/2,
                                                 game.height/2 - 150,
                                                 "Respawn in:");
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

                // Add an FPS counter to the top left corner, to be turned
                // on with debug mode
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

        // Change an object to be in its high-res state
        shiftOff: function(object) {
                object.frame = 0;
        },

        // Change an object to be in its low-res state
        shiftOn: function(object) {
                object.frame = 1;
        },

        // Pause the game
        pause: function() {
                game.paused = !game.paused;
        },

        // Create many solid 'darkgass' blocks to fill empty space
        slopefill: function(x, y) {
                for (var i = y; i < game.world.height; i += 48) {
                        var fill = this.background.create(x, i, 'darkgrass');
                        fill.scale.x = 0.56;
                }
        }
};
