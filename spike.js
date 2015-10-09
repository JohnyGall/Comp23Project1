function Spike(game, x, y, target) {

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.target = target;
  
        // Set up the spike
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'spike');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.moves = false;
        this.anchor.setTo(0.5,0.5);
        game.add.existing(this);
}

Spike.prototype = Object.create(Phaser.Sprite.prototype);
Spike.prototype.constructor = Spike;

Spike.prototype.update = function() {
        if (!game.shifted) {
                this.body.immovable = false;
                if (game.physics.arcade.overlap(this.target, this) ) {
                        if (this.target.health >= 2)
                            this.target.kill();
                }
        } else 
                this.body.immovable = true;
}
