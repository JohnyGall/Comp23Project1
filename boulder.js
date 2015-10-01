Boulder.prototype = Object.create(Phaser.Sprite.prototype);

Boulder.prototype.constructor = Boulder;

//Boulder.prototype.force = {x:0.0, y:0.0}; 

function Boulder(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'boulder');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
}

Boulder.prototype.update = function() {
        if (!shifted) {
            this.body.moves = true;

            if (this.body.velocity.x < 0) {
                this.angle += this.body.velocity.x / 25;
                this.body.velocity.x += 1.5;
            }
            if (this.body.velocity.x > 0) {
                this.angle += this.body.velocity.x / 25;
                this.body.velocity.x -= 1.5;
            }
        }
        else {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.body.moves = false;
        }
}