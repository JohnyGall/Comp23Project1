var winState = {

	preload: function(){
		// load menu images
		game.load.spritesheet('dialogue', 'assets/ending.png', 257, 165, 18);
		game.load.spritesheet('player', 'assets/art/default/protag_spritesheet.png', 37, 65);
		//game.load.spritesheet('sky', 'assets/art/ice/ice_bg_spritesheet.png', 1920, 1080, 2);
		//game.load.spritesheet('hgrass', 'assets/art/ice/ice_h_spritesheet.png', 252, 48, 2);

	},

	create: function(){

		// display menu images
		sky = game.add.sprite(0,0, 'sky');
		grass1 = game.add.sprite(0, 500, 'hgrass');
		player = game.add.sprite(100, 450, 'player');
		player.frame = 9;
		dialogue = game.add.sprite(200, 250, 'dialogue');
		frame = 0;
		frames = 11;
		shifted = false;

		// creates menu controls
		controls = game.input.keyboard.createCursorKeys();
		controls.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		controls.left.onDown.add(this.toLow);
		controls.right.onDown.add(this.toHigh);
		controls.space.onDown.add(this.shift);

	},

	update: function(){
	},

	shift: function(){
		// if things are already shifted
		if(dialogue.frame === (frames-1)){
			shifted = false;
			dialogue.frame = frame;
			sky.frame = 0;
			grass1.frame = 0;
			player.frame = 9;
		}
		// if things aren't shifted yet
		else{
			shifted = true;
			dialogue.frame = (frames-1);
			sky.frame = 1;
			grass1.frame = 1;
			player.frame = 26;
		} 
	},

	toHigh: function(){
		if(shifted){
		}
		else{
			dialogue.frame = frame + 1;
			frame++;
			// if on the last dialogue box and user advances
			if(frame === (frames-1)){
				game.state.start('menu');
			}
		}
	},

	toLow: function(){
		if(shifted || dialogue.frame === 0){
		}
		else{
			dialogue.frame = frame - 1;
			frame--;
		}
	},
};