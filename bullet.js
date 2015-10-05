function Bullet (game, target, source) {
        //SET DEFAULT SPEED OF PROJECTILES
        this.SPEED = 200;
    
        // Store variables, mostly for accessing the bitshift value
        this.game = game;
        this.INIT_X = source.x;
        this.INIT_Y = source.y;
        this.target = target;
        this.source = source;
  
        // Set up the boulder. Anchor at the center so it can roll.
        Phaser.Sprite.call(this, game, this.INIT_X, this.INIT_Y, 'bullet');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        // Boulders are heavy.
        this.body.gravity.y = 0;
        // Remove once it leaves the visible field
        this.body.outOfBoundsKill= true;
    
        // Basic Pythagorean Theorem for pathfinding
        var xdist = target.x-source.x;
        var ydist = target.y-source.y;
        var hypotenuse = Math.sqrt(xdist*xdist+ydist*ydist);
    
        var timetohit = hypotenuse/100;

        xdist = xdist + target.body.velocity.x*timetohit*.05;
        ydist = ydist + target.body.velocity.y*timetohit*.05;
    
        hypotenuse = Math.sqrt(xdist*xdist+ydist*ydist);
    
        this.body.velocity.x = xdist*this.SPEED/hypotenuse;
        this.body.velocity.y = ydist*this.SPEED/hypotenuse;

}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
    if(!game.shifted || this.target.health<this.target.MAX_HEALTH) {
        this.kill();
    }
    if(game.physics.arcade.overlap(this.target, this)) {
        this.target.kill();
    }
    if(game.physics.arcade.overlap(obstacles, this)) {
        this.kill();
    }

    
}