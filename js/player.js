//player.js
//contains code for player actions and sprite

var DEFAULT_SPEED = 150;
var JUMP_SPEED = 450;
var UP_DECAY_FACTOR = .8;
var UP_DECAY_THRESH = -100;
var SIDE_DECAY_NUM = 5;
var DOWN_SPEED = 400;
var VTEST_SPEED = 300;

var shifted;
var N_DEFAULT_SPEED = -1*DEFAULT_SPEED;

preload: function() {
    game.load.spritesheet('dude','assets/dude.png',32,48);
}

create: function(int x, int y) { 
    player = game.add.sprite(x, y, 'dude');
    
    player.anchor.setTo(.5,.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y  = 500;
    player.body.collideWorldBounds = true;
    
    player.animations.add('lowrez', [5], 10, true);
    player.animations.add('highrez', [6], 10, true);
    player.animations.play('highrez');

    cursors = game.input.keyboard.createCursorKeys();
    cursors.up.onDown.add(jump, this);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(bitshift, this);
    vkey = game.input.keyboard.addKey(Phaser.Keyboard.V);
    vkey.onDown.add(vtest, this);
}

update: function() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);

    //  Reset the players velocity if not going too fast (movement)
    if (player.body.velocity.x <= DEFAULT_SPEED && player.body.velocity.x >= N_DEFAULT_SPEED) 
        player.body.velocity.x = 0;

    //  If player is being a smartass do nothing
    if (cursors.right.isDown && cursors.left.isDown) {}
    // Handles right arrow input
    else if (cursors.right.isDown) {
        //face right
        if (player.scale.x < 0)
            player.scale.x *= -1;
        
        //if going too fast to the left, slide to stop. Otherwise, go right
        if (player.body.velocity.x < N_DEFAULT_SPEED)
            player.body.velocity.x += SIDE_DECAY_NUM;
        else if (player.body.velocity.x <= DEFAULT_SPEED)
            player.body.velocity.x = DEFAULT_SPEED;
    }
    // Handles left arrow input
    else if (cursors.left.isDown) {
        //face left
        if (player.scale.x > 0)
            player.scale.x *= -1;
        
        //if going too fast to the right, slide to stop. Otherwise, go left
        if (player.body.velocity.x > DEFAULT_SPEED)
            player.body.velocity.x -= SIDE_DECAY_NUM;
        else if (player.body.velocity.x >= N_DEFAULT_SPEED)
            player.body.velocity.x = N_DEFAULT_SPEED;
    }
    
    //  Decays upward momentum if player is not holding up key
    if (cursors.up.isDown && player.body.touching.down)
        player.body.velocity.y = JUMP_SPEED;
    else if (!cursors.up.isDown && player.body.velocity.y <= UP_DECAY_THRESH) 
    {
        player.body.velocity.y *= UP_DECAY_FACTOR;
    }  
    
    //  Allows player to rapidly descend if airborne
    if (cursors.down.isDown && !player.body.touching.down)
    {
        if (player.body.velocity.y < DOWN_SPEED)
            player.body.velocity.y = DOWN_SPEED;
    }

}

function jump() {
    if (player.body.touching.down)
        player.body.velocity.y = JUMP_SPEED;
}

function bitshift() {
    shifted = !shifted;
    player.scale.y *= -1;
    if (!shifted) {
        player.animations.play('highrez');
    }
    else {
        player.animations.play('lowrez');
    }
};

function vtest() {
    player.body.velocity.x += player.scale.x * VTEST_SPEED;
}