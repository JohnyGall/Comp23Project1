// This creates the checkpoint class, which respawns
// the player from a set location once passed in a level.

function CheckPoint(game, x, y, target) {

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.target = target; // player
        this.hit = false; // whether it is 'on'
  
        // Set up the checkpoint sprite
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'checkpoint');
        this.frame = 0; // initialize to high res
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.body.immovable = true;
        this.anchor.setTo(0.5,0.5);
}

CheckPoint.prototype = Object.create(Phaser.Sprite.prototype);
CheckPoint.prototype.constructor = CheckPoint;

CheckPoint.prototype.update = function() {
        // When updating the checkpoint, toggle to one of four
        // states determined by whether the world is in high-res
        // or low-res (the asset type used) and whether the 
        // checkpoint has been hit.

        if(!this.game.shifted && !this.hit){ // high res not active
                this.frame = 0; 
        }
        if(!this.game.shifted && this.hit){ // high res active
                this.frame = 1;
        }
        if(this.game.shifted && !this.hit){ //low res not active
                this.frame = 2;
        }
        if(this.game.shifted && this.hit){ // high res active
                this.frame = 3;
        }
        // Lastly, check if the checkpoint is changing from inactive
        // to active.
        if (!this.hit) {
                // Check if the player crosses the x axis of the checkpoint,
                // in which case we will turn on the checkpoint.
                if(this.target.body.x >= this.INIT_X){
                        this.target.INIT_X = this.INIT_X;
                        this.target.INIT_Y = this.INIT_Y;
                        this.hit = true;
                        this.frame = 2;
                }
        }

}
