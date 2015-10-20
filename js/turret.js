// This class contains the functionality for turrets, the main enemy in the game
// Turrets fire projectile bullets at the player. High-res bullets move more
// quickly than low-res ones, but take longer to fire and take up less space.

function Turret(game, target, obstacles, slopes, playstate, x, y) {
        // Store variables
        this.game = game;
        this.target = target;
        this.obstacles = obstacles;
        this.slopes = slopes;
        this.playstate = playstate;

        // Used for counting down to player death
        this.lastShotTime = game.time.now;
        // Is the target in the respawn countdown? (if so we don't want to
        // shoot a dead person)
        this.targetdying = false;

        // Setup audio for the turret
        this.sfx_tracking = game.add.audio('turret_charge_hr');
        this.sfx_tracking.volume = 0.25;
        this.sfx_fire_hr = game.add.audio('turret_fire_hr');
        this.sfx_fire_hr.volume = 0.25;
        this.sfx_fire_lr = game.add.audio('turret_fire_lr');
        this.sfx_fire_lr.volume = 0.25;
    
        // Store constants
        // Position
        this.INIT_X = x;
        this.INIT_Y = y;
        // Time to wait before the turret kills the target, in milliseconds
        this.HIGH_DELAY = 1500;
        this.LOW_DELAY = 750;

        // Create a new sprite based on the preloaded turet image
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

        // Initialization code to create a blank bitmap image to be drawn 
        // over the screen. This bitmap will be used to draw the tracking line 
        // from the turret to the target.
        this.bmd = game.add.bitmapData(game.world.width, game.world.height);
        this.bmdimg = game.add.image(0, 0, this.bmd);
        this.bmdimg.visible = true;
    
        this.inWorld = false;
}

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.update = function() {
        // If the game is in the high-res mode, make the wait time longer
        // before a bullet is shot. This is changed for low-res.
        var waitTime = this.HIGH_DELAY;                

        // If the target of the turret is outside of the screen,
        // turn off the targeting and return.
        /*if (Math.abs(this.x - this.target.x) > game.width/2 + 
            this.body.width * this.anchor.x ||
            Math.abs(this.y - this.target.y) > game.height/2 + 
            this.body.height * this.anchor.y) {

                this.targetdying = false;
                this.sfx_tracking.stop();
                return;   
        }*/
         if (Math.abs(this.x-this.target.x) > game.width/2 + this.body.width *this.anchor.x ||
            Math.abs(this.y-this.target.y) > game.height/2 + this.body.height *this.anchor.y) {
            this.targetdying = false;
            this.sfx_tracking.stop();
            
                if(game.shifted) {
                        this.frame = 5;
                        waitTime = this.LOW_DELAY;
                } else {
                        this.frame = 0;
                }
                return;
        }

        // The first thing to do when updating the turret is to raytrace to 
        // the target to see if the turret can shoot them.
        //For this, we need a line between the target and the turret.
        var ray = new Phaser.Line(this.target.x, this.target.y, this.x, this.y);
        // Call the raytracing method, and store the result
        var intersect = this.findTarget(ray, this.obstacles);
        
        // If there was no intersection (i.e. there isn't a wall in the way
        // and we are able to shoot

        if (!intersect) {
                // If this is the first time the target has been traced to,
                // set a new time since the last shot and set a boolean value
                // to make sure we don't constantly reset this time value
                if(!this.targetdying) {
                        this.targetdying = true;
                        this.lastShotTime = game.time.now;
                }

                // SOUND EFFECTS
                // If the game is in high-res with a not-yet-dead target,
                // and the sound effect has not yet been started
                if(!game.shifted && 
                   !this.sfx_tracking.isPlaying &&
                   this.target.health >= this.target.MAX_HEALTH) {
                        // start the sound effect
                        this.sfx_tracking.startTime = 
                                game.time.now - this.lastShotTime;
                        this.sfx_tracking.play();

                // Otherwise, if the sound effect has been started
                // if the game has been shifted to low-res, kill the sound 
                // effect
                } else if (game.shifted) {
                        this.sfx_tracking.stop();
                }
                   
                // TRACKING
                // Regardless of sound, if we are in low-res, set the animation
                // to use the low-res frame
                // set the wait time before the next shot to the low-res delay
                if(game.shifted) {
                        this.frame = 5;
                        waitTime = this.LOW_DELAY;

                // If we are in high res, do a lot more because we want to draw
                // a bitmap and animate the turret
                } else {
                        this.frame = 0;
                        this.bmd.context.lineWidth = 1;

                        // Turret Animations
                        // Measure the angle between the turret and the target, 
                        // and add 180 to it to get it in the range of 
                        // 0-90 degrees
                        // (Optional read) Math explanation:
                        // We need to solve for the angle between the turret and
                        // its target, so we take the arctangent of the 
                        // distances between them.
                        // The Math.atan2 function returns an angle in radians
                        // given a y and an x. We add 180 and multiply by ~57
                        // to convert the angle to our 0 to 90 degree range.
                        // For the y, we simply take the distance between the
                        // turret and its target. For the x, we do this and then
                        // multiply it by the x-scale because we want turrets 
                        // facing backwards (x-scale = -1) to fire backwards.
                        var angle = 180 + 
                                    Math.atan2(this.position.y -
                                               this.target.position.y, 
                                               (this.position.x - 
                                               this.target.position.x)
                                               * this.scale.x) 
                                    * -57.2957795;
             
                        // Convert the angle to a number 0 to 4, and then 
                        // set it as the current frame. 
                        var frame = Math.round(angle / 90 * 4);
                        // There 
                        if (frame > 4 || frame < 0) 
                                frame = 0;
                        this.frame = frame;
 
                       // Clear whatever was on the bitmap before, so we don't
                       // end up with a million red lines on the screen
                       this.bmd.context.clearRect(0, 0, this.game.world.width,
                                                        this.game.world.height);
                       // Draw a red line from the turret to the target
                       this.bmd.context.beginPath();
                       this.bmd.context.strokeStyle = 'rgb(255, 0, 0)';
                       this.bmd.context.fillStyle = 'rgb(255, 0, 0)';
                       this.bmd.context.moveTo(this.position.x, 
                                               this.position.y);
                       // Store the fraction of the wait time that has passed 
                       // thus far
                        var fraction = 1 - (game.time.now 
                                                - this.lastShotTime) / waitTime; 

                        // Draw a line between the target and the turret
                        // but only draw a given fraction of it. So if 50%
                        // of the time has passed between the start and the
                        // bullet being fired, the line will stretch 50%
                        // of the distance between the objects.
                        this.bmd.context.lineTo(this.target.position.x - 
                                        (fraction * (this.target.x - this.x)),
                                        this.target.position.y - 
                                        (fraction * (this.target.y - this.y)));
                        this.bmd.context.stroke();
        
                        // This just tells the engine it should update the 
                        // texture cache so the bitmap can be redrawn
                        this.bmd.dirty = true;
                }
             
                // If this is not the first time the target has entered the 
                // turret's sights, and the bullet is ready to be fired 
                // fired, play a sound effect and create a new bullet.
                if (this.targetdying && 
                                game.time.now - this.lastShotTime >= waitTime) {

                        if (game.shifted)
                                this.sfx_fire_lr.play();
                        else
                                this.sfx_fire_hr.play();
                    
                        var bullet = new Bullet(game, this.target, 
                                                          this, this.playstate);

                        // Update time of the most recent bullet firing, to 
                        // reset this cycle.
                        this.lastShotTime = game.time.now;
                }
        } else {
                // If the target is no longer dying, reset the shot
                // timer and stop firing bullets. 
                this.targetdying = false;
                this.bmd.clear();
                this.sfx_tracking.stop();

                // Reset the turret animation.
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
// Code based on work at: 
//      http://gamemechanicexplorer.com/#raycasting-1
Turret.prototype.findTarget = function(ray) {

        // Don't shoot the player if they are  behind the turret. The function
        // returns a valid intersection point if a collision occurred, and 
        // therefore no turret firing occurs — there is a wall in the way. We
        // want the same result of an inactive turret, so we return 
        // a valid value. Scale is either 1 or -1, which sets the direction
        // of 'behind the turret'
        if (this.x * this.scale.x > this.target.x * this.scale.x) {
                return 1;
        }

        var currentIntersection;
        var closestIntersection = null;
        // Set the distance between the turret and the wall to be the 
        // maximum possible: the width of the game level.
    
        // Check for an intersection between the ray and every obstacle
        this.obstacles.forEach(function(wall) {
                // To save space, store this operation. See below for 
                // explanation.
                var ayi = 1 - wall.anchor.y;
                var axi = 1 - wall.anchor.x;
                // Create an array of lines to represent the four edges of 
                // each wall. Basically, each line has four coordinates, 
                // the x and y of each endpoint. We make those endpoints 
                // equal to the four corners of the platform by starting with
                // the x and y coordinates of the platform sprite, and 
                // either adding or subtracting the width of the platform.
                // We multiply by the anchor or 1 - the anchor because
                // some of our sprites do not have an anchor of (0, 0), so 
                // this scales the amount we add to get to the next wall by the
                // offset built into wall.x and wall.y.
                var lines = [
                        new Phaser.Line(wall.x - (wall.anchor.x * wall.width), 
                                        wall.y - (wall.anchor.y * wall.height),
                                        wall.x - (wall.anchor.x * wall.width),
                                        wall.y + (ayi * wall.height)),
                        new Phaser.Line(wall.x - (wall.anchor.x * wall.width),
                                        wall.y - (wall.anchor.y * wall.height),
                                        wall.x + (axi * wall.width), 
                                        wall.y - (wall.anchor.y * wall.height)),

                        new Phaser.Line(wall.x + (axi * wall.width),
                                        wall.y - (wall.anchor.y * wall.height),
                                        wall.x + (axi * wall.width),
                                        wall.y + (ayi * wall.height)),

                        new Phaser.Line(wall.x - (wall.anchor.x * wall.width),
                                        wall.y + (ayi * wall.height), 
                                        wall.x + (axi * wall.width), 
                                        wall.y + (ayi * wall.height))
                ];

                // Max distance is the width the player is able to see.
                // Turrets are only deadly if they are in the camera's view.
                distanceToWall = game.width;
        
                // Test each of the edges in this wall against the ray.
                // If the ray intersects any of the edges then the wall must 
                // be in the way.
                for(var i = 0; i < lines.length; i++) {

                        // Use phaser library method for finding intersections.
                        currentIntersection = 
                                        Phaser.Line.intersects(ray, lines[i]);
                        if (currentIntersection) {
                                // Find the closest intersection using another
                                // phaser line method.
                                var distance = 
                                        this.game.math.distance(ray.start.x, 
                                                        ray.start.y, 
                                                        currentIntersection.x, 
                                                        currentIntersection.y);

                                // If this distance is too big, we don't want 
                                // to show it (we don't want the player to be
                                // sniped from across the map).
                                if (distance < distanceToWall) {
                                        distanceToWall = distance;
                                        closestIntersection = 
                                                        currentIntersection;
                                }
                        }
                }
        
        }, this);

        // Repeath this for slopes, with minor modifications for the special
        // behavior of slopes. Slopes have only three walls, and need a scale
        // to be considered because of their implementation (see slopes class).
        this.slopes.forEach(function(wall) {
                // Create an array of lines to represent the four 
                // edges of each wall
                var xs = wall.scale.x;
                var w = wall.width;
                var h = wall.height;
                var lines = [
                        new Phaser.Line(wall.x + xs * (wall.anchor.x * w),
                                        wall.y - (wall.anchor.y* h),
                                        wall.x + xs * (wall.anchor.x * w),
                                        wall.y + ((1-wall.anchor.y) * h)),

                        new Phaser.Line(wall.x - xs * (wall.anchor.x * w),
                                        wall.y - (wall.anchor.y * h), 
                                        wall.x + xs * (wall.anchor.x * w), 
                                        wall.y - (wall.anchor.y * h)),

                        new Phaser.Line(wall.x - xs * (wall.anchor.x * w), 
                                        wall.y - (wall.anchor.y * h), 
                                        wall.x + xs * (wall.anchor.x * w), 
                                        wall.y + (wall.anchor.y * h))
                ];

                // Max distance is the width the player is able to see.
                // Turrets are only deadly if they are in the camera's view.
                distanceToWall = game.width;
        
                // Test each of the edges in this wall against the ray.
                // If the ray intersects any of the edges then the wall must 
                // be in the way.
                for(var i = 0; i < lines.length; i++) {

                        currentIntersection = 
                                        Phaser.Line.intersects(ray, lines[i]);
                        //If there was an intersection...
                        if (currentIntersection) {
                                // Find the distance of the given line
                                var distance = 
                                        this.game.math.distance(ray.start.x, 
                                                                ray.start.y, 
                                                         currentIntersection.x, 
                                                         currentIntersection.y);
                                // If the distance of the line is larger
                                // than the maximum we're looking for, do 
                                // nothing. Otherwise use this intersection.
                                if (distance < distanceToWall) {
                                        distanceToWall = distance;
                                        closestIntersection = 
                                                currentIntersection;
                                }
                        }
                }
        
        }, this);
    
        return closestIntersection;
};
