// This class contains the functionality for the boulders in the game. 

function Boulder(game, x, y) {
        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;

        // Set up the boulder. Anchor at the center so it can roll.
        Phaser.Sprite.call(this, game, x, y, 'boulder');
        this.anchor.setTo(0.5, 0.5);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);

        // Boulders are heavy.
        this.ORIG_GRAV = 1000;
        this.body.gravity.y = this.ORIG_GRAV;
        this.onSlope = false;

        // So it rolls off the edge of the map (it respawns).
        // If this is removed the boulders will get stuck in corners.
        this.body.collideWorldBounds = false;
}

Boulder.prototype = Object.create(Phaser.Sprite.prototype);
Boulder.prototype.constructor = Boulder;

Boulder.prototype.update = function() {

        // Respawn the boulder if it goes off the edges of the map.
        // Boulders can still get stuck in corners, but we mostly solved
        // this with clever level design.
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(function() {
                this.respawn();
        }, this);


        // If in the low-res world, we want the boulder to freeze, but
        // if in the high res world, we want it to move freely.
        if (!game.shifted) { // high-res case
                // use high-res asset
                this.frame = 0;
                // turn on movement
                this.body.moves = true;

                // Change the angle of the boulder as it moves by a factor
                // of the speed it is moving at (simulate rolling) and
                // decrease the magnitude of the speed to simulate friction
                // (we add a little to a negative speed, and subtract from a
                // positive one. Also note that the angle has velocity added
                // to it regardless of direction of rolling, because velocity
                // comes with a negative sign)
                if (this.body.velocity.x < 0) {
                        // roll the boulder
                        this.angle += this.body.velocity.x / 25;
                        // slow down the boulder
                        this.body.velocity.x += 1.5;
                }
        
                if (this.body.velocity.x > 0) {
                        this.angle += this.body.velocity.x / 25;
                        this.body.velocity.x -= 1.5;
                }
        }
        else { // low-res case
                // use low-res asset
                this.frame = 1;
                // Make the boulder not move
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                // reset the boulder rotation. This would look weird otherwise,
                // with strange diamonds instead of pixel-grid-fixed squares.
                this.angle = Math.ceil(this.angle/90)*90;
                // Stop movement.
                this.body.moves = false;
        }
};

// Put the boulder back where it belongs.
Boulder.prototype.respawn = function() {
        this.body.gravity.y = this.ORIG_GRAV;
        this.position.x = this.INIT_X;
        this.position.y = this.INIT_Y;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
};