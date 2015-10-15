function Player(game, controls) {
        // Store variables
        this.game = game;
        this.controls = controls;
        this.facingRight = true;
        this.killTime = 0;

        // if player is on slope
        this.onSlope = false;

        //Store constants
        // Player initial coordinates
        this.INIT_X = 200;
        this.INIT_Y = this.game.world.height-100;
        // Walking and jumping speeds
        this.DEFAULT_SPEED = 150;
        this.SLIDE_SPEED = 150;
        this.JUMP_SPEED = -450;
        // Constants to make jumps higher if the key is held down
        this.UP_DECAY_FACTOR = 0.8;
        this.UP_DECAY_THRESH = -100;
        // Default gravity value
        this.ORIG_GRAV = 500;
        // Decay factor for coming down from a speedboost
        this.SIDE_DECAY_NUM = 5;
        // Speed for the accelerated downward movement (ground pound)
        this.DOWN_SPEED = 400;
        // Speedboost speed
        this.V_SPEED = 30;
        // Respawn time, in milliseconds
        this.RESPAWN_TIME = 3000;

        // Player health. We only have one-hit deaths, but setting
        // health to zero triggers some default Phaser code, so we
        // use 1 and 2 as our values for alive and dead.
        this.MAX_HEALTH = 2;

        // Initialize the player sprite
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'player');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        // Add gravity and don't let the player pass offscreen
        this.body.gravity.y = this.ORIG_GRAV;
        this.body.checkWorldBounds = true;
        this.body.outOfBoundsKill = true;
        // Have the game camera always centered on the player
        game.camera.follow(this);
        // Initialize alive-ness
        this.health = this.MAX_HEALTH;

        //  Name animations for the player
        // walking
        //                   name,     frames from sheet,    FPS, loop
        this.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.animations.add('right', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        // jumping
        this.animations.add('jright', [18, 19, 20], 4, false);
        this.animations.add('jleft', [21, 22, 23], 4, false);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
            this.onSlope = false;
            slopes.forEach(function(slope) {this.onSlope = (slope.isOn(this) || this.onSlope);}, this);
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(function() {
                        if (this.y > game.world.height)
                                this.kill();
            }, this);

        // If the player is dead and waiting to be respawned, don't let the user
        // move the player around.
        if (this.health < 2) {
                this.animations.currentAnim.stop();
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                return;
        }

        // Reset velocities if touching the ground or moving slowly
        if (Math.abs(this.body.velocity.x) <= this.SLIDE_SPEED) {
                this.body.velocity.x = 0;
        }
        if (this.body.blocked.down) {
                this.body.velocity.y = 0;
        }


        // CONTROLS

        //  If player pushing down both arrow keys, don't move
        if ((this.controls.right.isDown && this.controls.left.isDown) || (this.controls.up.isDown && this.controls.down.isDown)) {
                if(this.body.touching.down || this.onSlope){
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                        this.animations.stop();
                        // Frame for idling
                        this.frame = 9;
                }
        }

        // Right Arrow
        else if (this.controls.right.isDown) {
                this.facingRight = true;
                // If we are touching the ground, walk to the right
                if(this.body.touching.down || this.body.blocked.down || this.onSlope) {
                        this.animations.play('right');
                }

                // This is rightwards motion, so if we are moving to the left with a high
                // velocity, decay that speed until we are back at the default. Otherwise,
                // it is business as usual and we go to the right at our default speed.
                if (this.body.velocity.x < -1 * this.DEFAULT_SPEED) {
                        this.body.velocity.x += this.SIDE_DECAY_NUM;
                } else if (this.body.velocity.x <= this.DEFAULT_SPEED) {
                        this.body.velocity.x = this.DEFAULT_SPEED;
                }
        }

        // Left Arrow
        else if (this.controls.left.isDown) {
                this.facingRight = false;
                // If we are touching the ground, walk to the left
                if(this.body.touching.down || this.body.blocked.down || this.onSlope) {
                        this.animations.play('left');
                }

                // Same as above, if we are going fast to the right, the left arrow key should
                // slow us down. If not, then just change our speed to the default walking speed.
                if (this.body.velocity.x > this.DEFAULT_SPEED) {
                        this.body.velocity.x -= this.SIDE_DECAY_NUM;
                } else if (this.body.velocity.x >= -1 * this.DEFAULT_SPEED) {
                        this.body.velocity.x = -1 * this.DEFAULT_SPEED;
                }
        }

        // Reset the animation when the player is idle, so we don't walk in place
        if (!this.controls.left.isDown && !this.controls.right.isDown && (this.body.touching.down || this.body.blocked.down || this.onSlope)) {
                if(this.facingRight){
                        this.frame = 9;
                } else {
                        this.frame = 8;
                }
        }

        // Up Arrow
        // If the up arrow is being pushed, give the player a velocity upwards as long as
        // the player is touching the ground.
        if (this.controls.up.isDown && (this.body.touching.down || this.body.blocked.down || this.onSlope)) {
                if (this.body.velocity.y > this.JUMP_SPEED) {
                    this.y -= 1;
                    this.body.velocity.y = this.JUMP_SPEED;
                }
                // Play jump animations
                if (this.facingRight){
                        this.animations.play('jright');
                } else {
                        this.animations.play('jleft');
                }
        }
        // If the user is not holding down the up key, we make the jump decay faster than
        // it normally would. This makes it so holding down the up arrow leads to a
        // higher jump.
        else if (!this.controls.up.isDown && this.body.velocity.y <= this.UP_DECAY_THRESH) {
                this.body.velocity.y *= this.UP_DECAY_FACTOR;
        }

        // Down Arrow
        //  Allows player to descend rapidly if airborne
        if (this.controls.down.isDown && !(this.body.touching.down || this.body.blocked.down)) {
                // If we are falling already, set our speed to be the down speed and let
                // gravity add to that as we fall. It is important that this key never makes
                // the player slower, so triggering it when at a low falling speed will
                // boost the player speed, but at the next frame this conditional will be
                // false and so gravity will increase the player's speed.
                if (this.body.velocity.y < this.DOWN_SPEED){
                        this.body.velocity.y = this.DOWN_SPEED;
                        // Set the falling animations
                        if(this.facingRight){
                                this.frame = 24;
                        }
                        else {
                                this.frame = 25;
                        }
                }
        }

        //change to low-res graphics if shifted
        if(game.shifted) {
                if (this.facingRight)
                        this.frame = 26;
                else
                        this.frame = 27;
        }

        // V Key (speedboost)
        if (this.controls.V.isDown) {
                // Add the speedboost speed to the player's velocity.
                // The weird math makes it so if the player is facing
                // right the speed added will be 1 * V_SPEED as 2 * 1 - 1 = 1,
                // whereas if the player is facing left 2 * 0 - 1 = -1,
                // and a velocity of -V_SPEED will be added.
                this.body.velocity.x += ((2 * this.facingRight) - 1) * this.V_SPEED;
        }

        if(this.x >= game.world.width) {
                this.x -= 1;
                this.body.velocity.x = 0;
        } else if(this.x <= 0) {
                this.x += 1;
                this.body.velocity.x = 0;
        }
};

// Function to kill the player, and begin the respawn cycle.
Player.prototype.kill = function() {
        // Set health to 'dead'
        this.health = this.MAX_HEALTH - 1;
        // Mark the time of death, and reset all player variables
        // so the player corpse doesn't zombie around the screen
        this.killTime = Date.now();
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.gravity.y = 0;
};

// Reset the player
Player.prototype.respawn = function() {
        this.health = this.MAX_HEALTH;
        this.body.gravity.y = this.ORIG_GRAV;
        this.position.x = this.INIT_X;
        this.position.y = this.INIT_Y;
};
