var menuState = {

	preload: function(){
		// load menu images
		game.load.spritesheet('menu', 'assets/menu_spritesheet.png', 800, 600, 3);
        game.load.audio('typing', ['assets/music/menuaudio2.wav', 'assets/music/menuaudio.ogg']);

	},

	create: function(){

//		var controls = game.input.keyboard.createCursorKeys();
//		controls.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		// display menu images
		menu = game.add.sprite(0, 0, 'menu');
        this.music = game.add.audio('typing');

	},

	update: function(){
        if (!this.music.isPlaying)
            this.music.play();

		// creates menu controls
		// I know it's not efficient, but this won't work in create function
		var controls = game.input.keyboard.createCursorKeys();
		controls.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		var select = 'neutral';

		// if player is still being a jackass
		if(controls.right.isDown && controls.left.isDown){
			menu.frame = 0;
		}
		// if player presses right
		else if(controls.right.isDown){
			menu.frame = 2;
			select = 'right';
		}
		// if player presses left
		else if(controls.left.isDown){
			menu.frame = 1;
			select = 'left';		}

		// what happens when enter is pressed
		if(controls.enter.isDown){
			if(menu.frame === 1){
				console.log("LEFT");
				game.state.start('play');
			}
			else if(menu.frame === 2){
				console.log("RIGHT");
				game.state.start('loadmap');
			}
		}
	},

	/*// when correctly prompted,
	// call the function that starts the game
	start: function (){
		
	},
	// when correctly prompted,
	// call the function that loads a JSON file
	maps: function(){
		
	},*/
};