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
var slopeTileArray;
var slopeTiles;
var cursor;

function create () {
    game.physics.startSystem(Phaser.Physics.NINJA);

    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
    map = game.add.tilemap('testMap');
    map.addTilesetImage('dummyTiles', 'tileSet');

    //Add layers
    backgroundLayer = map.createLayer('back');
    floor = map.createLayer('floor');

    //Change the world size to match the size of this layer
    backgroundLayer.resizeWorld();

    //This maps the tiles in your sprite sheet to the phaser ninja tiles to be used
    slopeTileArray = [1, 1, 1, 1, 19, 18, 1, 1, 1, 1, 3, 1, 2];
    slopeTiles = game.physics.ninja.convertTilemap(map, floor, slopeTileArray);

    //Add the sprite to the game and enable arcade physics on it
    player = game.add.sprite(50, 200, 'player');
    player.game.physics.ninja.enable(this.sprite);

    //Set some physics on the sprite
    player.sprite.body.bounce.y = 0.2;
    player.game.physics.ninja.gravity = 2;

    //Create a running animation for the sprite and play it
    player.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    player.sprite.animations.play('right');

    //Make the camera follow the sprite
    player.game.camera.follow(player.sprite);

    //Enable cursor keys so we can create some controls
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    for (var i = 0; i < slopeTiles.length; i++)
    {
        player.sprite.body.aabb.collideAABBVsTile(this.tiles[i].tile);
    }

    player.sprite.body.moveRight(70);

    if (cursors.up.isDown)
    {
        player.sprite.body.moveUp(400);
    }

}
