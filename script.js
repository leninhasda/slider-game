var LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
var pieces = Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
var SPi = 2, SPj = 2;
var pieceW = 100;
var moveCount = 0;

var game = {
	debug: function() {
		var o='', x=1;
		for(i=0;i<pieces.length;i++) {			
			o+= pieces[i]+' ';
			if(x%3 == 0) o+= '| ';
			x++;
		}
		console.log(o);
	},
	init: function() {
		// randomize the pieces
		pieces = this.randomizePiece(pieces);
		// place the pieces
		this.makeMap();
	//	this.debug();	
	},
	makeMap: function() {
		var index=0;
		for(i=0;i<3;i++) {
			for(j=0;j<3;j++) {
				if(pieces[index] == 9) {
					SPi = i; SPj = j;
					//continue;					
				} else {
					$('.slide-'+(pieces[index])).css({
					/*	"marginTop"	: "0px",*/
						"marginLeft": (j*pieceW)+"px",
						"top"		: (i*pieceW)+"px"
					});
				}
				index++;
			}
		}
	},
	randomizePiece: function(thePieces) {
		var rand_array = new Array();
		var rand_indx;
		do{
			var rand_indx = Math.floor(Math.random() * thePieces.length);	
			if(rand_array.indexOf(thePieces[rand_indx]) == -1) {
				rand_array.push(thePieces[rand_indx]);
			}
		} while(rand_array.length < thePieces.length);
		return rand_array;		
	},
	movePiece: function(theKey) {
		var key = theKey;		
		if(key == RIGHT && (SPj-1) >= 0) {
			this.swap(SPi, SPj-1);			
			var index = (SPi*3)+SPj;
			//game.debug();
			$('.slide-'+pieces[index]).animate({"marginLeft": "+="+pieceW+"px"}, 'fast');
			SPj--;
			moveCount++;
			this.check();
		} else if(key == LEFT && (SPj+1) < 3) {
			this.swap(SPi, SPj+1);			
			var index = (SPi*3)+SPj;
			//game.debug();
			$('.slide-'+pieces[index]).animate({"marginLeft": "-="+pieceW+"px"}, 'fast');
			SPj++;
			moveCount++;
			this.check();
		} else if(key == DOWN && (SPi-1) >= 0) {
			this.swap(SPi-1, SPj);			
			var index = (SPi*3)+SPj;
			//game.debug();
			$('.slide-'+pieces[index]).animate({"top": "+="+pieceW+"px"}, 'fast');
			SPi--;
			moveCount++;
			this.check();
		} else if(key == UP && (SPi+1) < 3) {
			this.swap(SPi+1, SPj);			
			var index = (SPi*3)+SPj;
			//game.debug();
			$('.slide-'+pieces[index]).animate({"top": "-="+pieceW+"px"}, 'fast');
			SPi++;
			moveCount++;
			this.check();
		}
		//this.debug();
	},	
	swap: function(r, c) {
		var i = (SPi*3)+SPj;
		var j = (r*3)+c;
		var tmp = pieces[i];
		pieces[i] = pieces[j];
		pieces[j] = tmp;
	},
	check: function() {
		var i;
		for(i=0; i<pieces.length; i++) {
			if((i+1) != pieces[i]) {
				break;
			}
		}
		if(i >= 9) {
			console.log("solved");
			this.solved(1);			
		}
	},
	solved: function(v) {
		if(v == 1) {
			$('.solved').fadeIn('normal', function(){
				$('.shade').fadeIn();
				$('.move').text(moveCount+' moves').show();
			});
		} else if(v == 0) {
			$('.solved').hide();
			$('.shade').hide();
			$('.move').hide();
		}
	},
	restart: function() {
		game.init();
	}
};

$(document).ready(function(){

	moveCount = 0;
	game.init();

	$(document).keydown(function(e){
		e.preventDefault();			
		game.movePiece(e.which);
	});

	$(".restart-btn").click(function(){
		moveCount = 0;
		game.restart();
		game.solved(0)
		return false;
	});
});