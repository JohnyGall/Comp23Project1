// This file contains the playstate for the main menu

var menuState = {

	preload: function(){
		// load menu images
		game.load.spritesheet('menu', 'assets/menu_spritesheet.png', 800, 600, 3);
        	game.load.audio('typing', ['assets/music/default/menuaudio2.wav', 'assets/music/menuaudio.ogg']);
        	game.load.audio('fart', ['assets/music/default/menu_fart.wav', 'assets/music/menu_fart.ogg']);
	},

	create: function(){

		// display menu images
		menu = game.add.sprite(0, 0, 'menu');
                this.music = game.add.audio('typing');
                this.music.volume = 0.25;
                this.fart = game.add.audio('fart');
                this.fart.volume = 0.25;
                this.controls = game.input.keyboard.createCursorKeys();
                this.controls.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                this.controls.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function(){
                if (!this.music.isPlaying)
                this.music.play();

		// if player is still being a jackass
		if(this.controls.right.isDown && this.controls.left.isDown){
			menu.frame = 0;
		}
		// if player presses right
		else if(this.controls.right.isDown){
			menu.frame = 2;
		}
		// if player presses left
		else if(this.controls.left.isDown){
			menu.frame = 1;
		}

		// what happens when enter or space is pressed
		if(this.controls.enter.isDown || this.controls.space.isDown){
			if(menu.frame === 1){
                                this.music.stop();
				game.state.start('pre1');
			}
			else if(menu.frame === 2){
				var currentArtSet = window.prompt("What art set would you like to use?","default");
				var currentSoundSet = window.prompt("What sound set would you like to use?","default");
				localStorage.setItem('currentArtSetStorage', JSON.stringify(currentArtSet));
				localStorage.setItem('currentSoundSetStorage', JSON.stringify(currentSoundSet));
				this.music.stop();
				game.state.start('pre1');
			}
		}

		if(this.controls.up.isDown && this.controls.down.isDown) {
			this.music.stop();
			game.state.start('pre2');
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
