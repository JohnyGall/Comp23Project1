var gameWidth = 800, gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game", {preload:preload, update:update, create:create, render:render});

function preload () {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('player', 'assets/protag.png');
        game.load.image('hgrass', 'assets/grass_h.png');
        game.load.image('tgrass', 'assets/grass_t.png');
        game.load.image('vgrass', 'assets/grass_v.png');
        game.load.image('boulder', 'assets/boulder.png');
}

var player;
var wasd;
var platforms;
var cursors;
var boulder;

var debug_toggle = 0;

function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        player = game.add.sprite(150, 64, 'player');
        player.anchor.setTo(0.5, 0.5);
        cursors = game.input.keyboard.createCursorKeys();
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.bounce.x = 0.05;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;
        
        game.world.setBounds(0, 0, 1920, 600);
        game.camera.follow(player);

        wasd = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
                tilde: game.input.keyboard.addKey(Phaser.Keyboard.TILDE)
        };

        platforms = game.add.group();
        platforms.enableBody = true;

        for(var i = 0; i < 5; i++) {
                var ground = platforms.create(252 * i, game.world.height - 64, 'hgrass');
                ground.body.immovable = true;
                ground.body.setSize(252, 60, 0, 6);
        }

        boulder = new Boulder(game, 500, 150);

        wasd.tilde.onDown.add(function() {
                debug_toggle = debug_toggle ? false : true;
                game.debug.reset();
        }, this);

}

function update() {
        
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, boulder);
        game.physics.arcade.collide(player, boulder);

        player.body.velocity.x = 0;
        
        if (cursors.left.isDown || wasd.left.isDown) {
                player.body.velocity.x = -150;
               //player.animations.play('left');
        } else if (cursors.right.isDown || wasd.right.isDown) { //Movement right
                player.body.velocity.x = 150;
                //player.animations.play('right');
        } else { //No Movement
                //player.animations.stop();
                //player.frame = 4;
        }

        //Jump
        if ((cursors.up.isDown || wasd.up.isDown) && (player.body.touching.down || player.body.blocked.down)) {
                player.body.velocity.y = -600;
        }
        

}

function render() {
        
        if (debug_toggle == true) { 
                game.debug.body(player);
                game.debug.body(boulder);
                platforms.forEach(game.debug.body, game.debug, game.debug, 'rgba(255, 30, 30, 0.3)');
        }
}
