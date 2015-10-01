//js
//contains code for player actions and sprite
//requires preloading: this.game.load.spritesheet('player','assets/dude.png',32,48);

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

var DEFAULT_SPEED = 150;
var JUMP_SPEED = -450;
var UP_DECAY_FACTOR = .8;
var UP_DECAY_THRESH = -100;
var SIDE_DECAY_NUM = 5;
var DOWN_SPEED = 400;
var VTEST_SPEED = 300;
var shifted = false;

//Creates a player at x and y
function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(.5,.5);
    game.physics.arcade.enable(this);

    game.add.existing(this);
    this.body.gravity.y  = 500;
    this.body.collideWorldBounds = true;
    game.camera.follow(this);

    //  walking left and right animations
    this.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, ], 10, true);
    this.animations.add('right', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);

//    this.animations.add('lowrez', [5], 10, true);
//    this.animations.add('highrez', [6], 10, true);
//    this.animations.play('highrez');

}

//function for updating the player's actions. returns whether or not world is shifted.
Player.prototype.update = function() {
    //  Reset the players velocity if not going too fast (movement)
    if (Math.abs(this.body.velocity.x) <= DEFAULT_SPEED) 
        this.body.velocity.x = 0;
    if (this.body.touching.down) {
        this.body.velocity.y = 0;
    }
    
    //  If player is being a smartass do nothing
    if (cursors.right.isDown && cursors.left.isDown) {
        player.animations.stop();
        player.frame = 9;
    }
    // Handles right arrow input
    else if (cursors.right.isDown) {
        player.animations.play('right');
        
        //if going too fast to the left, slide to stop. Otherwise, go right
        if (this.body.velocity.x < -1*DEFAULT_SPEED)
            this.body.velocity.x += SIDE_DECAY_NUM;
        else if (this.body.velocity.x <= DEFAULT_SPEED)
            this.body.velocity.x = DEFAULT_SPEED;
    }
    // Handles left arrow input
    else if (cursors.left.isDown) {
        player.animations.play('left');
        
        //if going too fast to the right, slide to stop. Otherwise, go left
        if (this.body.velocity.x > DEFAULT_SPEED)
            this.body.velocity.x -= SIDE_DECAY_NUM;
        else if (this.body.velocity.x >= -1*DEFAULT_SPEED)
            this.body.velocity.x = -1*DEFAULT_SPEED;
    }

    // so player doesn't moonwalk when idle
    if (!cursors.left.isDown && !cursors.right.isDown && player.animations.currentAnim != null) {
        if(player.animations.currentAnim === player.animations.getAnimation('left'))
            player.frame = 8;
        else
            player.frame = 9;
    }
    
    //  Decays upward momentum if player is not holding up key
    if (cursors.up.isDown && (this.body.touching.down || this.body.blocked.down)) {
        this.body.velocity.y = JUMP_SPEED; 
    }
    else if (!cursors.up.isDown && this.body.velocity.y <= UP_DECAY_THRESH) 
    {
        this.body.velocity.y *= UP_DECAY_FACTOR;
    }  
    
    //  Allows player to rapidly descend if airborne
    if (cursors.down.isDown && !this.body.touching.down)
    {
        if (this.body.velocity.y < DOWN_SPEED)
            this.body.velocity.y = DOWN_SPEED;

        if (this.body.touching.down) {
            this.body.velocity.y = 0;
        }
    }
}

function bitshift() {
    shifted = !shifted;
    player.scale.y *= -1;
    if (!shifted) {
//        this.animations.play('highrez');
    }
    else {
//        this.animations.play('lowrez');
    }
}

function vtest(p) {
    player.body.velocity.x += 2*player.scale.x * VTEST_SPEED;
}
