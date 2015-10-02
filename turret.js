Turret.prototype = Object.create(Phaser.Sprite.prototype);

Turret.prototype.constructor = Turret;

var KILL_DELAY = 1000; //milliseconds

var bmd, bmdimg;
var trace;

function Turret(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'turret');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.animations.add('rotate');

        bmd = game.add.bitmapData(game.world.getBounds().width, game.world.getBounds().height);
        bmd.context.fillStyle = 'rgb(255, 255, 255)';
        bmd.context.strokeStyle = 'rgb(255, 255, 255)';
        bmdimg = game.add.bitmapData(game.world.getBounds().width, game.world.getBounds().height);
        bmdimg = game.add.image(0, 0, bmd);
        bmdimg.visible = true;

}

Turret.prototype.update = function() {
        var ray = new Phaser.Line(player.x, player.y, this.x, this.y);
        var intersect = getWallIntersection(ray, this);

        player.tint = 0xffffff;

        if (this.inWorld && !intersect) {
            //add kill command to queue
            if (game.time.events.length  < 1)
                game.time.events.add(KILL_DELAY, hrturretkill, this, this)
            
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

        // This just tells the engine it should update the texture cache
        bmd.dirty = true;

        }
        else {
            //game.time.events.destroy();
            bmd.clear();
        }
}



// Given a ray, this function iterates through all of the walls and
// returns the closest wall intersection from the start of the ray
// or null if the ray does not intersect any walls.
function getWallIntersection (ray, turret) {
    var distanceToWall = game.width;
    var closestIntersection = null;

    if (turret.position.x > player.position.x) {
        return 1;
    }
    
    platforms.forEach(function(wall) {
        // Create an array of lines that represent the four edges of each wall
        var lines = [
            new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
            new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
            new Phaser.Line(wall.x + wall.width, wall.y,
                wall.x + wall.width, wall.y + wall.height),
            new Phaser.Line(wall.x, wall.y + wall.height,
                wall.x + wall.width, wall.y + wall.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        for(var i = 0; i < lines.length; i++) {
            var intersect = Phaser.Line.intersects(ray, lines[i]);
            if (intersect) {
                // Find the closest intersection
                distance =
                    game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                if (distance < distanceToWall) {
                    distanceToWall = distance;
                    closestIntersection = intersect;
                }
            }
        }
    }, this);

    return closestIntersection;
};

function hrturretkill(turret) {
    var ray = new Phaser.Line(player.x, player.y, this.x, this.y);
    var intersect = getWallIntersection(ray, this);    
    
    if (this.inWorld && !intersect) {
        playerKill();
    }
}
