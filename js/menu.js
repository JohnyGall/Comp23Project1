// This file contains the playstate for the main menu

var menuState = {

	preload: function(){
		// load menu images
		game.load.spritesheet('menu', 'assets/menu_spritesheet.png', 800, 600, 3);
        	game.load.audio('typing', ['assets/music/default/menuaudio2.wav', 'assets/music/menuaudio.ogg']);
	},

	create: function(){

		// display menu images
		menu = game.add.sprite(0, 0, 'menu');
                this.music = game.add.audio('typing');
                this.music.volume = 0.25;
                this.controls = game.input.keyboard.createCursorKeys();
                this.controls.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},

	update: function(){
                if (!this.music.isPlaying)
                this.music.play();

		var select = 'neutral';

		// if player is still being a jackass
		if(this.controls.right.isDown && this.controls.left.isDown){
			menu.frame = 0;
		}
		// if player presses right
		else if(this.controls.right.isDown){
			menu.frame = 2;
			select = 'right';
		}
		// if player presses left
		else if(this.controls.left.isDown){
			menu.frame = 1;
			select = 'left';		}

		// what happens when enter is pressed
		if(this.controls.enter.isDown){
			if(menu.frame === 1){
                                this.music.stop();
				game.state.start('play');
			}
			else if(menu.frame === 2){
                                this.music.stop();
				game.state.start('loadmap');
			}
		}

		if(this.controls.up.isDown && this.controls.down.isDown) {
			this.music.stop();
			game.state.start('play2');
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
