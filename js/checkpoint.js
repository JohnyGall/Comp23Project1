function CheckPoint(game, x, y, target) {

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.target = target; // player
        this.hit = false; // whether it was hit
  
        // Set up the spike
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'checkpoint');
        this.frame = 0; // initialize to high res and not hit
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.body.immovable = true;
        this.anchor.setTo(0.5,0.5);
}

CheckPoint.prototype = Object.create(Phaser.Sprite.prototype);
CheckPoint.prototype.constructor = CheckPoint;

CheckPoint.prototype.update = function() {
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
        if (!this.hit) {
                //check if the player crosses the x axis of the checkpoint in which case 
                if(this.target.body.x >= this.INIT_X){
                        this.target.INIT_X = this.INIT_X;
                        this.target.INIT_Y = this.INIT_Y;
                        this.hit = true;
                        this.frame = 2;
                }
        }

}
