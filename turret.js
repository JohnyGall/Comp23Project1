Turret.prototype = Object.create(Phaser.Sprite.prototype);

Turret.prototype.constructor = Turret;

var KILL_DELAY = 1000; //milliseconds

var bmd, bmdimg;
var trace;
var killtime;
var dying;

function Turret(game, target, obstacles, x, y) {
        // Store variables
        this.game = game;
        this.target = target;
        this.obstacles = obstacles;
        // Used for counting down to player death
        this.timeEnteredRange = 0;
        // Is the target in the respawn countdown?
        target.dying = false;

        // Store constants
        // Position
        this.INIT_X = x;
        this.INIT_Y = y;
        // Time to wait before the turret kills the target, in milliseconds
        this.KILL_DELAY = 1000;

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

}

<<<<<<< HEAD
Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;
=======
Turret.prototype.update = function() {
        var ray = new Phaser.Line(player.x, player.y, this.x, this.y);
        var intersect = getWallIntersection(ray, this);

        player.tint = 0xffffff;

        if (this.inWorld && !intersect) {
            // add kill command to queue
            if (game.time.events.length  < 1)
                killcommand = game.time.events.add(KILL_DELAY, hrturretkill, this, this)
            
            // This player can see the ball so change their color
            player.tint = 0xffaaaa*(0.001*Math.random()+.9995);
            var angle = 180 + Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x) * -57.2957795;
            this.animations.play('rotate', 0);
            
            var frame = Math.round(angle / 90 * 4);
            this.animations.currentAnim.setFrame(frame, true);
            if (angle > 180 || angle < 0) {
                this.animations.currentAnim.setFrame(0, true);
        }

    // Draw each of the rays on the rayBitmap
        bmd.context.clearRect(0, 0, game.world.getBounds().width, game.world.getBounds().height);
        bmd.context.beginPath();
        bmd.context.strokeStyle = 'rgb(255, 0, 0)';
        bmd.context.fillStyle = 'rgb(255, 0, 0)';
        bmd.context.moveTo(this.position.x, this.position.y);
        bmd.context.lineTo(player.position.x, player.position.y);
        bmd.context.stroke();
>>>>>>> parent of 62765d9... First Puzzle

Turret.prototype.update = function() {
        // The first thing to do when updating the turret is to raytrace to the target to
        // see if the turret can kill them.
        //For this, we need a line between the target and the turret.
        var ray = new Phaser.Line(this.target.x, this.target.y, this.x, this.y);
        // Call the raytracing method, and store the result
        var intersect = this.findTarget(ray, this.obstacles);

        // If there was an intersection and the target is not behind the turret
        if (!intersect && this.target.position.x > this.position.x) {

                // target Stuff
                // Shuffle the tint of the target to show they are being hurt        
                this.target.tint = 0xffaaaa * (0.001 * Math.random() + 0.9995);
                // If the target is not yet dying (i.e. this is the first time the turret
                // has found the target) and the target's health says they have not been
                // hit yet, update 'dying' to show they are under fire and start the timer
                // that will lead to their death.
                if (!this.target.dying && this.target.health >= 2) {
                        this.timeEnteredRange = Date.now();
                        this.target.dying = true;
                }

                // Turret Animations
                // Measure the angle between the turret and the target, and add 180 to it to get it in the range of 0-90 degrees
                var angle = 180 + Math.atan2(this.position.y - this.target.position.y, this.position.x - this.target.position.x) * -57.2957795;
                // Play the rotation animation at an FPS of 0 (not playing, just set to the first frame)
                this.animations.play('rotate', 0);
                // Convert the angle to a number 0 to 4, and then set it as the current frame
                var frame = Math.round(angle / 90 * 4);
                this.animations.currentAnim.setFrame(frame, true);
                // For extra security, if the frame is outside the allowable range, we manually set it to 0 
                if (angle > 91 || angle < 0)
                        this.animations.currentAnim.setFrame(0, true);

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
                this.target.dying = false;
                this.bmd.clear();
                this.target.tint = 0xffffff;
        }
<<<<<<< HEAD
=======
        else {
            // Remove the killcommand when player no longer visible 
            game.time.events.remove(killcommand); 
            bmd.clear();
        }
}
>>>>>>> parent of 62765d9... First Puzzle

        // if the player is being hit, check if enough time has passed for the player to die. If so, kill them
        // and make sure the turret won't shoot at them anymore by resetting dying (if it does, a stack overflow 
        // will follow).
        if (this.target.dying && Date.now() - this.timeEnteredRange >= this.KILL_DELAY) {
                this.target.kill();
                this.target.dying = false;
        }
};

// Method to find the intersection of the turret and its target via raycasting.
// Most of the code is for removing intersections with any obstacles.
Turret.prototype.findTarget = function(ray) {

        if (this.position.x > this.target.position.x) {
                return 1;
        }

        var currentIntersection;
        var closestIntersection = null;
        // Set the distance between the turret and the wall to be the maximum possible:
        // the width of the game level.
        var distanceToWall = this.game.world.width;

        // Check for an intersection between the ray and every wall
        this.obstacles.forEach(function(wall) {
                // Create an array of lines to represent the four edges of each wall
                var lines = [
                        new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
                        new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
                        new Phaser.Line(wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height),
                        new Phaser.Line(wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)
                ];
        
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
<<<<<<< HEAD
=======

//If player is in sight of given turret, kill the player.
function hrturretkill(turret) {
    var ray = new Phaser.Line(player.x, player.y, this.x, this.y);
    var intersect = getWallIntersection(ray, this);    
    
    if (this.inWorld && !intersect) {
        playerKill();
    }
}
>>>>>>> parent of 62765d9... First Puzzle
