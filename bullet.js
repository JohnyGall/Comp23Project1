function Bullet (game, target, source) {
        //SET DEFAULT SPEED OF PROJECTILES
        //High Rez
        this.H_SPEED = 3000;
        //Low Rez
        this.L_SPEED = 200;

        
    
        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = source.x;
        this.INIT_Y = source.y;
        this.target = target;
        this.source = source;
  
        // Set up the bullet
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'bullet');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        // Bullets are light
        this.body.gravity.y = 0;
        // Remove once it leaves the visible field
        this.body.outOfBoundsKill= true;
    
        // Choose correct speed and frame
        var speed = this.H_SPEED;
        this.frame = 1;
        if (game.shifted) {
            this.frame = 0;
            speed = this.L_SPEED;
        }
    
        // Basic Pythagorean Theorem for pathfinding
        var xdist = target.x-source.x;
        var ydist = target.y-source.y;
        var hypotenuse = Math.sqrt(xdist*xdist+ydist*ydist);
    
        var timetohit = hypotenuse/100;

        xdist = xdist + target.body.velocity.x*timetohit*.05;
        ydist = ydist + target.body.velocity.y*timetohit*.05;
    
        hypotenuse = Math.sqrt(xdist*xdist+ydist*ydist);
    
        this.body.velocity.x = xdist*speed/hypotenuse;
        this.body.velocity.y = ydist*speed/hypotenuse;
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
    if(this.target.health<this.target.MAX_HEALTH) {
        this.kill();
    }
    if(game.physics.arcade.overlap(this.target, this)) {
        this.target.kill();
    }
    if(game.physics.arcade.overlap(obstacles, this)) {
        this.kill();
    }    
}

Bullet.shift = function() {
    if(game.shifted) {
        this.frame = 1;
        this.velocity.x *= this.L_SPEED/this.H_SPEED;
        this.velocity.y *= this.L_SPEED/this.H_SPEED;
    } else {
        this.frame = 0;
        this.velocity.x *= this.H_SPEED/this.L_SPEED;
        this.velocity.y *= this.H_SPEED/this.L_SPEED;
    }
}