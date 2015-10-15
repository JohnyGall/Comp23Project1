var menuState = {

	create: function(){

		var controls = game.input.keyboard.createCursorKeys();
		var setting = "neutral";

		// all the shit that goes in the menu
		game.load.image('neutral', 'assets/Menu1', 600, 800);
		game.load.image('leftbutton', 'assets/Menu2', 600, 800);
		game.load.image('rightbutton', 'assets/Menu3', 600, 800);

		game.add.sprite(0, 0, 'neutral');

		if(controls.right.isDown && controls.left.isDown){
			break;
		}
		else if(controls.right.isDown){
			setting = "right";
		}
		else if(controls.left.isDown){
			setting = "left";
		}
	},

	// when correctly prompted,
	// call the function that starts the game
	start: function (){
		game.state.start('play');
	},

	maps: function(){
		game.state.start('loadmap')
	// when correctly prompted,
	// call the function that loads a JSON file
};