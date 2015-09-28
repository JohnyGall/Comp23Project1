Boulder.prototype = Object.create(Phaser.Sprite.prototype);

Boulder.prototype.constructor = Boulder;

Boulder.prototype.force = {x:0.0, y:0.0}; 


function Boulder(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'boulder');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.body.bounce.y = 0.01;
        this.body.bounce.x = 0.05;
        this.body.gravity.y = 8000;
        this.body.collideWorldBounds = true;
}
Boulder.prototype.update = function() {
        game.physics.arcade.collide(this, platforms);
        game.physics.arcade.collide(player, this);
        if (this.body.velocity.x > 0) {
                this.angle += 5;
                this.body.velocity.x -= 1.5;
        } else if (this.body.velocity.x < 0) {
                this.angle -= 5;
                this.body.velocity.x += 1.5;
        }
}