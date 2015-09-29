
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
        // Load Map Data
        game.load.tilemap('testMap', 'testMap.json', null, Phaser.Tilemap.TILED_JSON);

        // Load Tileset
        game.load.image('tileSet', 'dummyTileSet.png');
}

var map;
var layer;

function create() {

    game.stage.backgroundColor = '#787878';

    //  The 'mario' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('testMap');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('dummyTiles', 'tileSet');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('layer1');

    //  This resizes the game world to match the layer dimensions
    //layer.resizeWorld();
}
