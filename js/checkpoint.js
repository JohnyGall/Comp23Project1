function CheckPoint(game, x, y, target) {

        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.target = target;
        this.hit = false;
  
        // Set up the spike
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'player');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.anchor.setTo(0.5,0.5);
        game.add.existing(this);
}

CheckPoint.prototype = Object.create(Phaser.Sprite.prototype);
CheckPoint.prototype.constructor = CheckPoint;

CheckPoint.prototype.update = function() {
        if (!this.hit) {
                if(this.target.body.x >= this.INIT_X){
                        this.target.INIT_X = this.INIT_X;
                        this.target.INIT_Y = this.INIT_Y;
                        this.hit = true;
                }
        }

}
