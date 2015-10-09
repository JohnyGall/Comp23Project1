function Bullet (game, target, source) {
        //SET DEFAULT SPEED OF PROJECTILES
        //High-res
        this.H_SPEED = 3000;
        //Low-res
        this.L_SPEED = 250;

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = source.x;
        this.INIT_Y = source.y;
        this.target = target;
        this.source = source;
  
        // Set up the bullet
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'bullet');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);

        bullets.add(this);

        // Remove once it leaves the visible field (Phaser built-in)
        this.body.outOfBoundsKill = true;
    
        // Correct for turret scale vs player scale on flat ground
        if (target.y-source.y == 9.5)
                this.INIT_Y += 9.5;
        var angle = Math.atan2(target.y - this.INIT_Y, target.x - this.INIT_X);

        if (game.shifted) {
                //this.body.gravity.y = 160;
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
                this.checkWorldBounds = true;
                this.events.onOutOfBounds.add(function() {
                        this.destroy();
                }, this);



        if (this.target.health < this.target.MAX_HEALTH) {
                this.destroy();
        }
        if (game.physics.arcade.overlap(this.target, this)) {
                this.target.kill();
        }
        if (game.physics.arcade.overlap(obstacles, this)) {
                this.destroy();
        }
}

Bullet.prototype.shift = function() {
        if(game.shifted) {
                this.frame = 0;
            
                var velocity = Math.sqrt(this.body.velocity.x*this.body.velocity.x + this.body.velocity.y*this.body.velocity.y);
                if (velocity > this.L_SPEED) {
                        this.body.velocity.x *= this.L_SPEED / this.H_SPEED;
                        this.body.velocity.y *= this.L_SPEED / this.H_SPEED;
                }
        } else {
                this.frame = 1;
//                this.body.velocity.x *= this.H_SPEED / this.L_SPEED;
//                this.body.velocity.y *= this.H_SPEED / this.L_SPEED;
        }
}