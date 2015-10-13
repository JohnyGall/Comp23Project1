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

}

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;

Cloud.prototype.update = function(){
        // in high res we want the cloud to be 
        if(!game.shifted){
                this.frame = 0;
        }
        else{
                this.frame = 1;
        }

};