function Turret(game, target, obstacles, bullets, x, y) {
        // Store variables
        this.game = game;
        this.target = target;
        this.obstacles = obstacles;
        this.bullets = bullets;

        // Used for counting down to player death
        this.lastShotTime = game.time.now;
        // Is the target in the respawn countdown?
        this.targetdying = false;

        // Store constants
        // Position
        this.INIT_X = x;
        this.INIT_Y = y;
        // Time to wait before the turret kills the target, in milliseconds
        this.HIGH_DELAY = 1500;
        this.LOW_DELAY = 750;

        // Create a new sprite based on the preloaded turet image, and add it to the this.game
        Phaser.Sprite.call(this, game, x, y, 'turret');
        this.game.add.existing(this);
        // Anchor in middle so the laser comes out of the center
        this.anchor.setTo(0.5, 0.5);

        // Add physics to the turret
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.enableBody = true;
        this.body.immovable = true;

        // Add the rotating animation to the turret, so it can track the target
        this.animations.add('rotate');

        // Initialization code to create a blank bitmap image to be drawn over the screen.
        // This bitmap will be used to draw the tracking line from the turret to the target.
        this.bmd = game.add.bitmapData(game.world.getBounds().width, game.world.getBounds().height);
        this.bmdimg = game.add.image(0, 0, this.bmd);
        this.bmdimg.visible = true;
    
        this.inWorld = false;
}

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.update = function() {
        this.target.tint = 0xffffff;
        this.bmd.clear();
        var waitTime = this.HIGH_DELAY;

        var visible = false;
        if (Math.abs(this.x-this.target.x) < game.width/2 + this.body.width *this.anchor.x)
            var visible = true;
    
        // The first thing to do when updating the turret is to raytrace to the target to
        // see if the turret can kill them.
        //For this, we need a line between the target and the turret.
        var ray = new Phaser.Line(this.target.x, this.target.y, this.x, this.y);
        // Call the raytracing method, and store the result
        var intersect = this.findTarget(ray, this.obstacles);
        
            // If there was no intersection
            if (!intersect && visible) {
                if(!this.targetdying) {
                    this.targetdying = true;
                    this.lastShotTime = game.time.now;                    
                }
                   if(game.shifted) {
                        this.frame = 5;
                        waitTime = this.LOW_DELAY;
                        this.bmd.context.lineWidth = 16;
                   } else {
                        this.frame = 0;
                        this.bmd.context.lineWidth = 1;
                        // Turret Animations
                        // Measure the angle between the turret and the target, and add 180 to it to get it in the range of 0-90 degrees
                        var angle = 180 + Math.atan2(this.position.y - this.target.position.y, (this.position.x - this.target.position.x)*this.scale.x) * -57.2957795;
             
                         // Convert the angle to a number 0 to 4, and then set it as the current frame
                        var frame = Math.round(angle / 90 * 4);
                        if (frame > 4 || frame < 0) 
                            frame = 0;
                        this.frame = frame;
 
                       // Clear whatever was on the bitmap before, so we don't end up with a million red lines on the screen
                       this.bmd.context.clearRect(0, 0, this.game.world.getBounds().width, this.game.world.getBounds().height);
                       // Draw a red line from the turret to the target
                       this.bmd.context.beginPath();
                       this.bmd.context.strokeStyle = 'rgb(255, 0, 0)';
                       this.bmd.context.fillStyle = 'rgb(255, 0, 0)';
                       this.bmd.context.moveTo(this.position.x, this.position.y);
                        var fraction = 1 - (game.time.now - this.lastShotTime) / waitTime; 
                       console.log(fraction);
                       this.bmd.context.lineTo(this.target.position.x - (fraction * (this.target.x - this.x)), this.target.position.y - (fraction * (this.target.y - this.y)));
                       this.bmd.context.stroke();
        
                       // This just tells the engine it should update the texture cache so the bitmap can be redrawn
                       this.bmd.dirty = true;
                   };
             
                if (this.targetdying && game.time.now - this.lastShotTime >= waitTime) {
                    var bullet = new Bullet(game, this.target, this);
                    this.bullets.add(bullet);
                        this.lastShotTime = game.time.now;
                }
            } else {
                // If the target is not being hit, update their dying status (kill the death countdown), clear
                // any residual raytraces, and reset the target's tint
                this.targetdying = false;

                if(game.shifted) {
                        this.frame = 5;
                        waitTime = this.LOW_DELAY;
                } else {
                        this.frame = 0;
                }
         }
}

// Method to find the intersection of the turret and its target via raycasting.
// Most of the code is for removing intersections with any obstacles.
Turret.prototype.findTarget = function(ray) {

        if (!this.inWorld)
            return 1;
    
        // Don't shoot the player if they are  behind the turret. The function
        // returns a valid intersection point if a collision occurred, and therefore
        // no turret firing occurs — there is a wall in the way. We want the same
        // result of an inactive turret, so we return a valid value.
        if (this.x*this.scale.x > this.target.x*this.scale.x) {
                return 1;
        }

        var currentIntersection;
        var closestIntersection = null;
        // Set the distance between the turret and the wall to be the maximum possible:
        // the width of the game level.
    
        // Check for an intersection between the ray and every obstacle
        this.obstacles.forEach(function(wall) {
                // Create an array of lines to represent the four edges of each wall
                var lines = [
                        new Phaser.Line(wall.x-(wall.anchor.x*wall.width), wall.y-(wall.anchor.y*wall.height), wall.x-(wall.anchor.x*wall.width), wall.y+((1-wall.anchor.y)*wall.height)),
                        new Phaser.Line(wall.x-(wall.anchor.x*wall.width), wall.y-(wall.anchor.y*wall.height), wall.x+((1-wall.anchor.x)*wall.width), wall.y-(wall.anchor.y*wall.height)),
                        new Phaser.Line(wall.x+((1-wall.anchor.x)*wall.width), wall.y-(wall.anchor.y*wall.height), wall.x+((1-wall.anchor.x)*wall.width), wall.y+((1-wall.anchor.y)*wall.height)),
                        new Phaser.Line(wall.x-(wall.anchor.x*wall.width), wall.y+((1-wall.anchor.y)*wall.height), wall.x+((1-wall.anchor.x)*wall.width), wall.y+((1-wall.anchor.y)*wall.height)),
                ];
                distanceToWall = game.width;
        
                // Test each of the edges in this wall against the ray.
                // If the ray intersects any of the edges then the wall must be in the way.
                for(var i = 0; i < lines.length; i++) {

                        currentIntersection = Phaser.Line.intersects(ray, lines[i]);
                        if (currentIntersection) {
                                // Find the closest intersection
                                var distance = this.game.math.distance(ray.start.x, ray.start.y, currentIntersection.x, currentIntersection.y);
                                if (distance < distanceToWall) {
                                        distanceToWall = distance;
                                        closestIntersection = currentIntersection;
                                }
                        }
                }
        
        }, this);
    
        return closestIntersection;
};
