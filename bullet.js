function Bullet (game, target, source) {
        //SET DEFAULT SPEED OF PROJECTILES
        //High-res
        this.H_SPEED = 2000;
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

        // Remove once it leaves the visible field (Phaser built-in)
        this.body.outOfBoundsKill = true;
        this.body.gravity.y = 0;
        var angle = 2 * Math.atan2(target.y - source.y, target.x - source.x);


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

        if (this.target.health < this.target.MAX_HEALTH) {
                this.kill();
        }
        if (game.physics.arcade.overlap(this.target, this)) {
                this.target.kill();
        }
        if (game.physics.arcade.overlap(obstacles, this)) {
                this.kill();
        }
}

Bullet.prototype.shift = function() {
        if (!game.shifted) {
                this.frame = 1;
                this.body.velocity.x *= this.H_SPEED / this.L_SPEED;
                this.body.velocity.y *= this.H_SPEED / this.L_SPEED;
        } else {
                this.frame = 0;
                this.body.velocity.x *= this.L_SPEED / this.H_SPEED;
                this.body.velocity.y *= this.L_SPEED / this.H_SPEED;
        }
}