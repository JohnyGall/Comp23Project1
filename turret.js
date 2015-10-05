function Turret(game, target, obstacles, x, y) {
        // Store variables
        this.game = game;
        this.target = target;
        this.obstacles = obstacles;

        // Used for counting down to player death
        this.timeEnteredRange = 0;
        // Is the target in the respawn countdown?
        this.targetdying = false;

        // Store constants
        // Position
        this.INIT_X = x;
        this.INIT_Y = y;
        // Time to wait before the turret kills the target, in milliseconds
        this.KILL_DELAY = 1500;
        this.FIRE_DELAY = 600;

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
        var visible = false;
        if (Math.abs(this.x-this.target.x) < game.width/2 + this.body.width *this.anchor.x)
            var visible = true;
    
        if(game.shifted) {
                this.frame = 5;
                if (visible && this.x*this.scale.x < this.target.x*this.scale.x){
                        if (!this.targetdying && this.target.health >= 2) {
                                this.timeEnteredRange = game.time.now;
                                this.targetdying = true;
                        }
                        if (this.targetdying && game.time.now - this.timeEnteredRange >= this.FIRE_DELAY) {
                                bullet = new Bullet(game,this.target,this);
                                this.targetdying = false;
                        }
                }
        } else {
                if (this.targetdying)
                    console.log('dying!\n');
                else
                    console.log('okay!\n');

                var strout = toString(this.x);
      
                // The first thing to do when updating the turret is to raytrace to the target to
                // see if the turret can kill them.
                //For this, we need a line between the target and the turret.
                var ray = new Phaser.Line(this.target.x, this.target.y, this.x, this.y);
                // Call the raytracing method, and store the result
                var intersect = this.findTarget(ray, this.obstacles);
                // Play the rotation animation at an FPS of 0 (not playing, just set to the first frame)
                this.frame = 0;

        
                // If there was no intersection
                if (!intersect && visible) {
                        // target Stuff
                        // Shuffle the tint of the target to show they are being hurt        
                        this.target.tint = 0xffaaaa * (0.001 * Math.random() + 0.9995);
                        // If the target is not yet dying (i.e. this is the first time the turret
                        // has found the target) and the target's health says they have not been
                        // hit yet, update 'dying' to show they are under fire and start the timer
                        // that will lead to their death.
                        if (!this.targetdying && this.target.health >= 2) {
                                this.timeEnteredRange = game.time.now;
                                console.log(this.timeEnteredRange);
                                this.targetdying = true;
                        }

                        // Turret Animations
                        // Measure the angle between the turret and the target, and add 180 to it to get it in the range of 0-90 degrees
                        var angle = 180 + Math.atan2(this.position.y - this.target.position.y, (this.position.x - this.target.position.x)*this.scale.x) * -57.2957795;
            
                        // Convert the angle to a number 0 to 4, and then set it as the current frame
                        var frame = Math.round(angle / 90 * 4);
                        this.frame = frame;

                        // Clear whatever was on the bitmap before, so we don't end up with a million red lines on the screen
                        this.bmd.context.clearRect(0, 0, this.game.world.getBounds().width, this.game.world.getBounds().height);
                        // Draw a red line from the turret to the target
                        this.bmd.context.beginPath();
                        this.bmd.context.strokeStyle = 'rgb(255, 0, 0)';
                        this.bmd.context.fillStyle = 'rgb(255, 0, 0)';
                        this.bmd.context.moveTo(this.position.x, this.position.y);
                        this.bmd.context.lineTo(this.target.position.x, this.target.position.y);
                        this.bmd.context.stroke();
                
                        // This just tells the engine it should update the texture cache so the bitmap can be redrawn
                        this.bmd.dirty = true;
                } else {
                        // If the target is not being hit, update their dying status (kill the death countdown), clear
                        // any residual raytraces, and reset the target's tint
                        this.targetdying = false;
                        this.target.tint = 0xffffff;
                }

                // if the player is being hit, check if enough time has passed for the player to die. If so, kill them
                // and make sure the turret won't shoot at them anymore by resetting dying (if it does, a stack overflow 
                // will follow).
                if (this.targetdying && (game.time.now - this.timeEnteredRange) >= this.KILL_DELAY) {
                        console.log(this.timeEnteredRange);
                        console.log(game.time.now);
                        bullet = new Bullet(game,this.target,this);
                        this.targetdying = false;
                }
        }
};

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
