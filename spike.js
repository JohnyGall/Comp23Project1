function Spike(game, x, y, target) {

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.target = target;
  
        // Set up the spike
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'spike');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.moves = false 
        this.anchor.setTo(.5,.5);
        game.add.existing(this);
}

Spike.prototype = Object.create(Phaser.Sprite.prototype);
Spike.prototype.constructor = Spike;

Spike.prototype.update = function() {
        if (game.shifted) {
                this.frame = 1;
        } else {
                this.frame = 0;
            
                if (game.physics.arcade.overlap(this.target, this)) {
                        this.target.kill();
                }
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