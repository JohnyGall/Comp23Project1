
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

function preload() {
        // Load Map Data
        game.load.tilemap('testMap', 'testMap.json', null, Phaser.Tilemap.TILED_JSON);

        // Load Tileset
        game.load.image('tileSet', 'dummyTileSet.png');

        // Load Dummy Player Data - from Phaser tutorial
        game.load.spritesheet('dude','dude.png', 32,48);
}

var map;
var background;
var floor;
var player;

function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#787878';

    //  The 'test' key here is the Loader key given in game.load.tilemap
        map = game.add.tilemap('testMap');
        map.addTilesetImage('dummyTiles', 'tileSet');

            //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
            //  The second parameter maps this name to the Phaser.Cache key 'tiles'

            //  Creates a layer from the World1 layer in the map data.
            //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
            background = map.createLayer('back');
            floor = map.createLayer('floor');


            // This sets up an area of the map (based on tile indexes) as collidable
            // Still trying to figure out how to apply this to curved surfaces.
            map.setCollisionBetween(142, 178, true, 'floor');
            player = game.add.sprite(32, 32, 'dude');
            game.physics.arcade.enable(player);
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;
            player.body.bounce.y = 0.2;
            player.animations.add('left', [0,1,2,3],10, true);
            player.animations.add('right',[5,6,7,8],10, true);

            //  This resizes the game world to match the layer dimensions
            backgroud.resizeWorld();

            //A bunch of player and control stuff
            cursors = game.input.keyboard.createCursorKeys();
}

function update() {
        game.physics.arcade.collide(player, floor);
        player.body.velocity.x = 0;

        /*
        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }


        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
*/
}
