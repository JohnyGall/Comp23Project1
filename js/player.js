//js
//contains code for player actions and sprite
//requires preloading: this.game.load.spritesheet('dude','assets/dude.png',32,48);

player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;

var DEFAULT_SPEED = 150;
var JUMP_SPEED = 450;
var UP_DECAY_FACTOR = .8;
var UP_DECAY_THRESH = -100;
var SIDE_DECAY_NUM = 5;
var DOWN_SPEED = 400;
var VTEST_SPEED = 300;
var shifted = false;
var cursors;
var spacebar;
var vkey;

//Creates a player at x and y
function player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'dude');
    game.camera.follow(this);
    this.anchor.setTo(.5,.5);
    
    game.physics.arcade.enable(this);
    this.body.gravity.y  = 500;
    this.body.collideWorldBounds = true;
    
    this.animations.add('lowrez', [5], 10, true);
    this.animations.add('highrez', [6], 10, true);
    this.animations.play('highrez');

    cursors = game.input.keyboard.createCursorKeys();
    cursors.up.onDown.add(jump, this);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    vkey = game.input.keyboard.addKey(Phaser.Keyboard.V);
    vkey.onDown.add(vtest, this);
}

//function for updating the player's actions. returns whether or not world is shifted.
player.prototype.update = function() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(this, platforms);

    //  Reset the players velocity if not going too fast (movement)
    if (Math.abs(this.body.velocity.x) <= DEFAULT_SPEED) 
        this.body.velocity.x = 0;

    //  If player is being a smartass do nothing
    if (cursors.right.isDown && cursors.left.isDown) {}
    // Handles right arrow input
    else if (cursors.right.isDown) {
        //face right
        if (this.scale.x < 0)
            this.scale.x *= -1;
        
        //if going too fast to the left, slide to stop. Otherwise, go right
        if (this.body.velocity.x < -1*DEFAULT_SPEED)
            this.body.velocity.x += SIDE_DECAY_NUM;
        else if (this.body.velocity.x <= DEFAULT_SPEED)
            this.body.velocity.x = DEFAULT_SPEED;
    }
    // Handles left arrow input
    else if (this.cursors.left.isDown) {
        //face left
        if (this.scale.x > 0)
            this.scale.x *= -1;
        
        //if going too fast to the right, slide to stop. Otherwise, go left
        if (this.body.velocity.x > DEFAULT_SPEED)
            this.body.velocity.x -= SIDE_DECAY_NUM;
        else if (this.body.velocity.x >= -1*DEFAULT_SPEED)
            this.body.velocity.x = -1*DEFAULT_SPEED;
    }
    
    //  Decays upward momentum if player is not holding up key
    if (cursors.up.isDown && this.body.touching.down)
        this.body.velocity.y = JUMP_SPEED;
    else if (!cursors.up.isDown && this.body.velocity.y <= UP_DECAY_THRESH) 
    {
        this.body.velocity.y *= UP_DECAY_FACTOR;
    }  
    
    //  Allows player to rapidly descend if airborne
    if (cursors.down.isDown && !this.body.touching.down)
    {
        if (this.body.velocity.y < DOWN_SPEED)
            this.body.velocity.y = DOWN_SPEED;
    }
    
    return shifted;
}

function bitshift() {
    shifted = !shifted;
    this.scale.y *= -1;
    if (!shifted) {
        this.animations.play('highrez');
    }
    else {
        this.animations.play('lowrez');
    }
};

function vtest() {
    this.body.velocity.x += this.scale.x * VTEST_SPEED;
}

}