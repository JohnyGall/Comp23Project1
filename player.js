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
var RESPAWN_TIME = 1000; //milliseconds
var shifted = false;
var faceright = true;

//Creates a player at x and y
function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(.5,.5);
    game.physics.arcade.enable(this);

    game.add.existing(this);
    this.body.gravity.y  = 500;
    this.body.collideWorldBounds = true;
    game.camera.follow(this);

    this.health = 2;
    
    //  adding animations
    this.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add('right', [10, 11, 12, 13, 14, 15, 16, 17], 10, true);
    //this.animations.add('jright', [18, 19, 20], 4, false);
    //this.animations.add('jleft', [21, 22, 23], 4, false);

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
        /*if(player.animations.currentAnim === player.animations.getAnimation('jleft'){
            player.animations.stop();
            player.frame = 8;
        }
        else if(player.animations.currentAnim === player.animations.getAnimation('jright'){
            player.animations.stop();
            player.frame = 9;
        }
        else*/
            player.animations.stop();
            player.frame = 9;
    }
    // Handles right arrow input
    else if (cursors.right.isDown) {
        faceright = true;
        player.animations.play('right');
        
        //if going too fast to the left, slide to stop. Otherwise, go right
        if (this.body.velocity.x < -1*DEFAULT_SPEED)
            this.body.velocity.x += SIDE_DECAY_NUM;
        else if (this.body.velocity.x <= DEFAULT_SPEED)
            this.body.velocity.x = DEFAULT_SPEED;
    }
    // Handles left arrow input
    else if (cursors.left.isDown) {
        faceright = false;
        this.animations.play('left');
        
        //if going too fast to the right, slide to stop. Otherwise, go left
        if (this.body.velocity.x > DEFAULT_SPEED)
            this.body.velocity.x -= SIDE_DECAY_NUM;
        else if (this.body.velocity.x >= -1*DEFAULT_SPEED)
            this.body.velocity.x = -1*DEFAULT_SPEED;
    }

    // so player doesn't keep animating when idle
    if (!cursors.left.isDown && !cursors.right.isDown && this.body.touching.down && this.animations.currentAnim != null) {
        if(this.body.velocity.x < 0){
            player.frame = 8;
        }
        else
            player.frame = 9;

    }
    
    //  Decays upward momentum if player is not holding up key
    if (cursors.up.isDown && (this.body.touching.down || this.body.blocked.down)) {
        this.body.velocity.y = JUMP_SPEED;

    // plays jump animations
        if (this.body.velocity.x < 0){
        player.animations.play('jleft');
        }
        else 
            player.animations.play('jright');
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
    player.body.velocity.x += (2*faceright-1) * VTEST_SPEED;
}

function playerKill() {
        player.health -= 1;
        respawn();
}

function respawn() {
        timecheck = Date.now();
        while(Date.now() - timecheck < RESPAWN_TIME) {};
    
        player.kill();

        console.log(' restarting....\n');
        //game.paused = false;
        shifted = false;
        player.health = 2;
        game.state.start(game.state.current);
}