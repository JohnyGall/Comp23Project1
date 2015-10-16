function Slope (game, x, y, boulders) {
        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = x;
        this.INIT_Y = y;
        this.boulders = boulders;
        // Set up the slope
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'vgrass');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.anchor.setTo(0.5,0);

        // Make slope stationary
        this.body.moves = false;
}

Slope.prototype = Object.create(Phaser.Sprite.prototype);
Slope.prototype.constructor = Slope;

Slope.prototype.update = function() {
    if (game.shifted) 
            this.frame = 1;
    else 
            this.frame = 0;

    this.boulders.forEach(function(thing) {
        if (game.physics.arcade.overlap(thing, this) && this.scale.x*thing.x >= this.scale.x*(this.x-0.5*this.width) && this.scale.x*thing.x  <= this.scale.x*(this.x+0.5*this.width)) {
            var rel_x = this.scale.x*(thing.x - this.x+0.5*this.width*this.scale.x);
            if (this.scale.x > 0) 
                var rel_y = (1-rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height;
            else
                var rel_y = (rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height;


//            if (thing.x >= this.x + this.width-5) {
//                thing.x += 1;
//                if (thing.body.velocity.x < 0) {
//                    thing.body.velocity.x = 0;  
//                }
//            } else 

            if (thing.y > rel_y) {
                    thing.y = rel_y;

                    thing.body.gravity.y = 0;
                    if (game.shifted) {
                        if(this.scale.x * thing.body.velocity.x > 0)
                            thing.body.velocity.x = 0;
                    } else {
                        thing.body.velocity.x -= this.scale.x*thing.ORIG_GRAV/50;
                    }
                    thing.body.velocity.y = -thing.body.velocity.x / this.width *this.height;
            } else {
                thing.body.gravity.y = thing.ORIG_GRAV;
            }
        } else {
            thing.body.gravity.y = thing.ORIG_GRAV;
        }
    }, this);

    var thing = player;
if (game.physics.arcade.overlap(thing, this) && this.scale.x*thing.x >= this.scale.x*(this.x-0.5*this.width) && this.scale.x*thing.x  <= this.scale.x*(this.x+0.5*this.width)) {
            var rel_x = this.scale.x*(thing.x - this.x+0.5*this.width*this.scale.x);
            if (this.scale.x > 0) 
                var rel_y = (1-rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height;
            else
                var rel_y = (rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height;


//            if (thing.x >= this.x + this.width-5) {
//                thing.x += 1;
//                if (thing.body.velocity.x < 0) {
//                    thing.body.velocity.x = 0;  
//                }
//            } else 

            if (thing.y > rel_y) {
                    thing.y = rel_y;

                    thing.body.gravity.y = 0;
                    if (game.shifted) {
                        if(this.scale.x * thing.body.velocity.x > 0)
                            thing.body.velocity.x = 0;
                    } else {
                        thing.body.velocity.x -= this.scale.x*thing.ORIG_GRAV/50;
                    }
                    thing.body.velocity.y = -thing.body.velocity.x / this.width *this.height;
            } else {
                thing.body.gravity.y = thing.ORIG_GRAV;
            }
        } else {
            thing.body.gravity.y = thing.ORIG_GRAV;
        }
}

Slope.prototype.isOn = function(thing) {
        if (game.physics.arcade.overlap(thing, this) && this.scale.x*thing.x >= this.scale.x*(this.x-0.5*this.width) && this.scale.x*thing.x  <= this.scale.x*(this.x+0.5*this.width)) {
            var rel_x = this.scale.x*(thing.x - this.x+0.5*this.width*this.scale.x);
            var rel_y = 0;
            if (this.scale.x > 0) 
                rel_y = (1-rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height - 1;
            else
                rel_y = (rel_x / this.width) * this.height + this.y - thing.anchor.y*thing.height - 1;

            if (thing.y > rel_y) 
                return true; 
            else 
                return false;
        }

        return false;
}