// This class is for the bullets fired from turrets. They
// fire at a high speed in high-res and a low speed in
// low-res. They take the position of the target at the 
// moment of firing and use that to angle themselves.

function Bullet (game, target, source, playstate) {
        //Set default speeds
        //High-res
        this.H_SPEED = 3000;
        //Low-res
        this.L_SPEED = 250;

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.playstate = playstate;
        this.INIT_X = source.x;
        this.INIT_Y = source.y;
        this.target = target;
        this.source = source;
  
        // Set up the bullet
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'bullet');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);

        this.playstate.bullets.add(this);

        // Remove once it leaves the visible field (Phaser built-in)
        this.body.outOfBoundsKill = true;
        this.checkWorldBounds = true;
    
        // Correct for the difference in the y-value of the anchor points
        // of the turret and player
        if (target.y - source.y == 9.5)
                this.INIT_Y += 9.5;

        // Set an angle to the target
        var angle = Math.atan2(target.y - this.INIT_Y, target.x - this.INIT_X);

        // Set the velocity based on the angle and the shiftedness
        if (game.shifted) {
                this.frame = 0;
                this.body.velocity.x = Math.cos(angle) * this.L_SPEED;
                this.body.velocity.y = Math.sin(angle) * this.L_SPEED;
        } else {
                this.frame = 1;
                this.body.velocity.x = Math.cos(angle) * this.H_SPEED;
                this.body.velocity.y = Math.sin(angle) * this.H_SPEED;
        }
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
        // First, check if the bullet is out of bounds and if so, destroy it
        this.events.onOutOfBounds.add(function() {
                this.destroy();
        }, this);

        // If the bullet has hit the target, kill the target
        if (game.physics.arcade.overlap(this.target, this)) {
                this.target.kill();
        }

        // If the bullet has hit its target, destroy the bullet
        // we check this with the target health value because
        // that is always set when a bullet collision happens
        // possibly from the above if-statement.
        if (this.target.health < this.target.MAX_HEALTH) {
                this.destroy();
        }

        // If the bullet is overlapping any world object like a wall, 
        // destroy the bullet
        if (game.physics.arcade.overlap(this.playstate.boulders, this) ||
            game.physics.arcade.overlap(this.playstate.platforms, this) ||
            game.physics.arcade.overlap(this.playstate.clouds, this)) {
                this.destroy();
        }
}

// Change the shiftedness of the bullet. This requires a function where
// many objects don't, because the velocity must change.
Bullet.prototype.shift = function() {
        if(game.shifted) {
                // Set to low-res
                this.frame = 0;
                // Calculate the magnitude of the current velocity via
                // the Pythagorean theorem
                var velocity = Math.sqrt(this.body.velocity.x * 
                                         this.body.velocity.x + 
                                         this.body.velocity.y * 
                                         this.body.velocity.y);
                // If the current velocity is greater than the speed of a low
                // velocity bullet (i.e. nothing weird has happened) convert 
                // each component to a low velocity component.
                // (Optional read) Math explanation:
                // In this case, we have some x velocity that is a fraction
                // of H_SPEED dependent on the cosine of the angle to the
                // target, xVel == H_SPEED * cos(angle)
                // To convert to a low speed value, we divite this by H_SPEED
                // and multiply by L_SPEED to get
                // xVel == L_SPEED * cos(angle) * (H_SPEED / H_SPEED)
                // We then repeat for the y-value.
                if (velocity > this.L_SPEED) {
                        this.body.velocity.x *= this.L_SPEED / this.H_SPEED;
                        this.body.velocity.y *= this.L_SPEED / this.H_SPEED;
                }
        } else {
                // Set to high-res asset
                this.frame = 1;
                // See above.
                this.body.velocity.x *= this.H_SPEED / this.L_SPEED;
                this.body.velocity.y *= this.H_SPEED / this.L_SPEED;
        }
}