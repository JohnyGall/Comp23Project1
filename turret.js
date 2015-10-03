Turret.prototype = Object.create(Phaser.Sprite.prototype);

Turret.prototype.constructor = Turret;

var KILL_DELAY = 1000; //milliseconds

var bmd, bmdimg;
var trace;
var killtime;
var dying;

function Turret(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'turret');
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        game.add.existing(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.animations.add('rotate');

        bmd = game.add.bitmapData(game.world.getBounds().width, game.world.getBounds().height);
        bmdimg = game.add.bitmapData(game.world.getBounds().width, game.world.getBounds().height);
        bmdimg = game.add.image(0, 0, bmd);
        bmdimg.visible = true;

}

Turret.prototype.update = function() {
    var ray = new Phaser.Line(player.x, player.y, this.x, this.y);
    var intersect = this.findTarget(ray);
    if (!intersect && player.position.x > this.position.x) {
        
        // This player can see the ball so change their color
        player.tint = 0xffaaaa*(0.001*Math.random()+.9995);
            var angle = 180 + Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x) * -57.2957795;
        this.animations.play('rotate', 0);
            
        var frame = Math.round(angle / 90 * 4);
        this.animations.currentAnim.setFrame(frame, true);
        if (angle > 180 || angle < 0)
            this.animations.currentAnim.setFrame(0, true);

        bmd.context.clearRect(0, 0, game.world.getBounds().width, game.world.getBounds().height);
        bmd.context.beginPath();
        bmd.context.strokeStyle = 'rgb(255, 0, 0)';
        bmd.context.fillStyle = 'rgb(255, 0, 0)';
        bmd.context.moveTo(this.position.x, this.position.y);
        bmd.context.lineTo(player.position.x, player.position.y);
        bmd.context.stroke();

        // This just tells the engine it should update the texture cache
        bmd.dirty = true;
    } else {
        dying = false;
        bmd.clear();
        player.tint = 0xffffff;
    }

    if (dying && Date.now() - killtime >= KILL_DELAY) {
        //player.kill();
        dying = false;
    }

}


Turret.prototype.findTarget = function(ray) {
    var intersect;

    var distanceToWall = game.world.width;
    var closestIntersection = null;

    if (this.position.x > player.position.x) {
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
            intersect = Phaser.Line.intersects(ray, lines[i]);
            if (intersect) {
                // Find the closest intersection
                distance = game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                if (distance < distanceToWall) {
                    distanceToWall = distance;
                    closestIntersection = intersect;
                }
            }
        }
    }, this);

    if (!dying && this.inWorld && !intersect && player.health >= 2) {
        killtime = Date.now();
        dying = true;
    }

    return closestIntersection;
};
