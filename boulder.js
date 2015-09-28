Boulder.prototype = Object.create(Phaser.Sprite.prototype);

Boulder.prototype.constructor = Boulder;

Boulder.prototype.force = {x:0.0, y:0.0}; 


function Boulder(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'boulder');
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
    game.physics.arcade.collide(player, this);

}
Boulder.prototype.update = function() {
        if (game.physics.arcade.collide(this, player)) {
                this.angle += 5;
        }
}