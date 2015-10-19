function CheckPoint(game, x, y, target) {

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.target = target;
        this.hit = false;
  
        // Set up the spike
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'checkpoint');
        this.frame = 1;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.body.immovable = true;
        this.anchor.setTo(0.5,0.5);
}

CheckPoint.prototype = Object.create(Phaser.Sprite.prototype);
CheckPoint.prototype.constructor = CheckPoint;

CheckPoint.prototype.update = function() {
        if(!this.game.shifted && !this.hit){
                this.frame = 0;
        }
        if(!this.game.shifted && this.hit){
                this.frame = 1;
        }
        if(this.game.shifted && !this.hit){
                this.frame = 2;
        }
        if(this.game.shifted && this.hit){
                this.frame = 3;
        }
        if (!this.hit) {
                if(this.target.body.x >= this.INIT_X){
                        this.target.INIT_X = this.INIT_X;
                        this.target.INIT_Y = this.INIT_Y;
                        this.hit = true;
                        this.frame = 2;
                }
        }

}
