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
        this.body.gravity.y = 1000;

        // So it doesn't roll off the edge of the map.
        this.body.collideWorldBounds = false;
}

Boulder.prototype = Object.create(Phaser.Sprite.prototype);
Boulder.prototype.constructor = Boulder;

Boulder.prototype.update = function() {
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(function() {
                this.respawn();
            }, this);


        // If in the low-res world, we want the boulder to not roll, but
        // if in the high res world, we want it to move freely.
        if (!game.shifted) {
                this.frame = 0;
                this.body.moves = true;
                // Change the angle of the boulder as it moves by a factor
                // of the speed it is moving at (simulate rolling) and
                // decrease the magnitude of the speed to simulate friction
                // (we add a little to a negative speed, and subtract from a
                // positive one. Also note that the angle has velocity added
                // to it regardless of direction of rolling, because velocity
                // comes with a negative sign)
                if (this.body.velocity.x < 0) {
                        this.angle += this.body.velocity.x / 25;
                        this.body.velocity.x += 1.5;
                }
        
                if (this.body.velocity.x > 0) {
                        this.angle += this.body.velocity.x / 25;
                        this.body.velocity.x -= 1.5;
                }
        }
        else {
                this.frame = 1;
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.angle = Math.ceil(this.angle/90)*90;
                this.body.moves = false;
        }
};

Boulder.prototype.respawn = function() {
        this.position.x = this.INIT_X;
        this.position.y = this.INIT_Y;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
};