// This class is for clouds, which are a game object that is
// impassable and solid in low-res mode and does not interact with
// the player at all in high-res. 

function Cloud(game, x, y){
        //Initial variables
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;

        //Set up the cloud
        Phaser.Sprite.call(this, game, x, y, 'cloud');
        this.anchor.setTo(0.5, 0.5);

        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.body.moves = false;

}

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;

Cloud.prototype.update = function(){
        // In high-res we want the cloud to be fluffy and pretty
        if(!game.shifted){
                this.frame = 0;
        }
        else{
        // In low-res we want the cloud to be a block
                this.frame = 1;
        }

};