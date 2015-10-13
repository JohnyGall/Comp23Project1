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
        // in high res we want the cloud to be fluffy
        if(!game.shifted){
                this.frame = 0;
        }
        else{//in low res we want the cloud to be the block
                this.frame = 1;
        }

};