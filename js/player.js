//player.js
//contains code for player actions and sprite
var Bitshift = Bitshift || {};

Bitshift.Player = function(){};

Bitshift.Player.prototype = {

var DEFAULT_SPEED = 150;
var JUMP_SPEED = 450;
var UP_DECAY_FACTOR = .8;
var UP_DECAY_THRESH = -100;
var SIDE_DECAY_NUM = 5;
var DOWN_SPEED = 400;
var VTEST_SPEED = 300;
var shifted = false;
    
preload: function() {
    this.game.load.spritesheet('dude','assets/dude.png',32,48);
}

create: function(int x, int y) { 
    this.player = this.game.add.sprite(x, y, 'dude');
    this.game.camera.follow(player);
    
    this.player.anchor.setTo(.5,.5);
    this.game.physics.arcade.enable(player);
    this.player.body.gravity.y  = 500;
    this.player.body.collideWorldBounds = true;
    
    this.player.animations.add('lowrez', [5], 10, true);
    this.player.animations.add('highrez', [6], 10, true);
    this.player.animations.play('highrez');

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.cursors.up.onDown.add(jump, this);
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.vkey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.vkey.onDown.add(vtest, this);
}

update: function() {
    //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity if not going too fast (movement)
    if (Math.abs(this.player.body.velocity.x) <= DEFAULT_SPEED) 
        this.player.body.velocity.x = 0;

    //  If player is being a smartass do nothing
    if (this.cursors.right.isDown && this.cursors.left.isDown) {}
    // Handles right arrow input
    else if (this.cursors.right.isDown) {
        //face right
        if (this.player.scale.x < 0)
            this.player.scale.x *= -1;
        
        //if going too fast to the left, slide to stop. Otherwise, go right
        if (this.player.body.velocity.x < -1*DEFAULT_SPEED)
            this.player.body.velocity.x += SIDE_DECAY_NUM;
        else if (this.player.body.velocity.x <= DEFAULT_SPEED)
            this.player.body.velocity.x = DEFAULT_SPEED;
    }
    // Handles left arrow input
    else if (this.cursors.left.isDown) {
        //face left
        if (this.player.scale.x > 0)
            this.player.scale.x *= -1;
        
        //if going too fast to the right, slide to stop. Otherwise, go left
        if (this.player.body.velocity.x > DEFAULT_SPEED)
            this.player.body.velocity.x -= SIDE_DECAY_NUM;
        else if (this.player.body.velocity.x >= -1*DEFAULT_SPEED)
            this.player.body.velocity.x = -1*DEFAULT_SPEED;
    }
    
    //  Decays upward momentum if player is not holding up key
    if (this.cursors.up.isDown && this.player.body.touching.down)
        this.player.body.velocity.y = JUMP_SPEED;
    else if (!this.cursors.up.isDown && this.player.body.velocity.y <= UP_DECAY_THRESH) 
    {
        this.player.body.velocity.y *= UP_DECAY_FACTOR;
    }  
    
    //  Allows player to rapidly descend if airborne
    if (this.cursors.down.isDown && !this.player.body.touching.down)
    {
        if (this.player.body.velocity.y < DOWN_SPEED)
            this.player.body.velocity.y = DOWN_SPEED;
    }

}

bitshift: function() {
    shifted = !shifted;
    this.player.scale.y *= -1;
    if (!shifted) {
        this.player.animations.play('highrez');
    }
    else {
        this.player.animations.play('lowrez');
    }
};

vtest: function() {
    this.player.body.velocity.x += player.scale.x * VTEST_SPEED;
}

}