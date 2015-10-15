var menuState = {

	create: function(){

		// creates a group for all menu displays
		var displays;

		var controls = game.input.keyboard.createCursorKeys();
		controls.P = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		// all the shit that goes in the menu
		game.load.image('neutral', 'assets/Menu1', 600, 800);
		game.load.image('displayL', 'assets/Menu2', 600, 800);
		game.load.image('displayR', 'assets/Menu3', 600, 800);

		displays = game.add.group();
		displays.create(0, 0, 'displayL');
		displays.create(0, 0, 'displayR');
		displays.create(0, 0, 'neutral');

		// set selected options screens to invisible
		displayR.visible = false;
		displayL.visible = false;

		// if player is still being a jackass
		if(controls.right.isDown && controls.left.isDown){
			break;
		}
		// if player presses right
		else if(controls.right.isDown){
			displayR.visible = true;
			displayL.visible = false;
			neutral.visible = false;
		}
		// if player presses left
		else if(controls.left.isDown){
			displayL.visible = true;
			displayR.visible = false;
			neutral.visible = false;
		}

		// what happens when enter is pressed
		if(controls.enter.isDown){
			if(displayL){
				enter.onDown.addOnce(this.start, this);
			}
			else if(displayR){
				enter.onDown.addOnce(this.maps, this);
			}
		}
	},

	// when correctly prompted,
	// call the function that starts the game
	start: function (){
		game.state.start('play');
	},
	// when correctly prompted,
	// call the function that loads a JSON file
	maps: function(){
		game.state.start('loadmap')	
};