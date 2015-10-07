function Slope (game, x, y, sprites) {
        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.sprites = sprites;
        this.steps = game.add.group();
  
        // Set up the slope
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'vgrass');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
    
        //var step = platforms.create(252 * i, game.world.height - 64, 'boulder');

        // Make slope stationary
        this.body.moves = false;
}

Slope.prototype = Object.create(Phaser.Sprite.prototype);
Slope.prototype.constructor = Slope;

Slope.prototype.update = function() {
    this.sprites.forEach(function(thing) {
        if (game.physics.arcade.overlap(this.sprites, this)) {
            thing.onslope = true;
            var rel_x = thing.x + thing.anchor.x*thing.width - this.x;
            var rel_y = (1-rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height;

            if (thing.y >= rel_y) {
                thing.y = rel_y;
                thing.body.gravity.y = 0;
                thing.body.velocity.x -= 10;
                thing.body.velocity.y = -thing.body.velocity.x / this.width *this.height;
            } 
        } else {
            thing.body.gravity.y = 500;
        }
    }, this);
}

Slope.prototype.shift = function() {

}