$(document).ready(function(){
	
	init();
	console.log('ciao');
	// ________ variables
	dragons = ['dragon-a','dragon-b','dragon-c','dragon-d','dragon-e'];
	var startingTime, randomDragonNumber, randomDragon, positionDragon, positionBullet;
	var again = 0;
	var lifes = 0;
	var fly = "fly"
	
	// ________castle var animation
	var level = ['knight', 'baron', 'marquees', 'duke', 'king'];
	var index = 0 ;
	function levelup(){
		//console.log('up');
		index = index+1;
		//console.log( 'lindex dell array che cerca:' + index);
		var next = level[index];
		$("svg").attr('class', next + '-' );
		if ( index == 4 ) {
			again = 0 ;
			setTimeout(function() {
				$('.you-won').addClass('visible');
				$('.fire-button').css('display','none');
			}, 1300);
		}
	}
	function leveldown(){
		//console.log('down');
		if ( index != 0 ) {
			index = index-1;
		}
		var next = level[index];
		$("svg").attr('class', next + '-' );
			// se vai sotto il livello zero
	}

	
	// ________ functions
	
	function init(){
		$('.ui').addClass("visible");
		$('.fire-button').css('display','none');
	}
	
	
	function fire(){
		$('#bullet').attr('class','fire');
		$('#bullet-scia').attr('class','fire');
		$('.fire-button').css('pointer-events','none');	
		$('.fire-button').addClass('pressed');	
		//azzero l'animazione
		setTimeout(function() {
      $('#bullet').attr('class','');
			$('#bullet-scia').attr('class','');
		}, 1600);
		setTimeout(function() {
			$('.fire-button').removeClass('pressed');	
			$('.fire-button').css('pointer-events','auto');
		}, 2000);
	}
	
	
	function score(){
		$('#bullet').css('animation-play-state','paused');
		$('#bullet-scia').css('animation-play-state','paused');
		$('#' + randomDragon).css('animation-play-state','paused');
		$('#' + randomDragon + '-scia').css('animation-play-state','paused');
		
		$('#bullet').attr('class','');
		$('#bullet-scia').attr('class','');
		$('#bullet').css('animation-play-state','initial');
		$('#bullet-scia').css('animation-play-state','initial');
		$('#' + randomDragon).attr('class','');
		$('#' + randomDragon + '-scia').attr('class','');
		$('.dragon-explosion').addClass('go');
		setTimeout(function() {
			$('.dragon-explosion').removeClass('go');
		},1100);
		setTimeout(function() {
			$('#' + randomDragon).css('animation-play-state','initial');
			$('#' + randomDragon + '-scia').css('animation-play-state','initial');
			// triggero l'avanzamento di livello
			again = 1 ;
			levelup();
		}, 500);
// other dragon start after 1 score
	}
	
	
	function lifeLose(){
		$('#' + randomDragon).attr('class','');
		$('#' + randomDragon + '-scia').attr('class','');
		lifes = lifes + 1;
		$('#tower-explosion').addClass('go');
		leveldown();
		setTimeout(function() {
			$('#tower-explosion').removeClass('go');
			if( lifes == 3 ) {
				setTimeout(function() {
					$('.game-over').addClass('visible');
					$('.fire-button').css('display','none');
				}, 2000);
			} else {
				again = 1 ;
			}
		}, 1000);
		$('#heart-' + lifes ).attr('class','go');
		setTimeout(function() {
			$('#heart-' + lifes ).css('display','none');
		}, 2500);
		
		// va aumentato il counter delle vite ( a 3 game over e trigger modale)
	// other dragon start after 1 life lost
	}
	
	function startGame(){
	
// set the difficulty
		var diffN = $('#output').text();
		//console.log(diffN);
		if( diffN == 1 ){
			//console.log('facile');
			fly = 'fly-facile';
		} else if ( diffN == 3 ) {
			//console.log('difficile');
			fly = 'fly-difficile';
		}
// hide the hoverlays
		$('.ui').removeClass("visible");
		$('.game-over').removeClass('visible');
// show the fire button
		$('.fire-button').css('display','block');
// random dragon in random time, go!
		startingTime = Math.floor((Math.random() * 3000) + 1000);
		randomDragonNumber = Math.floor(Math.random() * 5);
			//randomDragonNumber = 4;
		setTimeout(function() {
			randomDragon = dragons[randomDragonNumber];
			$('#' + randomDragon).attr("class",fly);
			$('#' + randomDragon + '-scia').attr('class',fly);
// check if a dragon is killed
			setInterval(function() {
				positionDragon = parseInt($('#' + randomDragon).css('stroke-dashoffset'));
				positionBullet = parseInt($('#bullet').css('stroke-dashoffset'));
	// check dragon-a
				if( randomDragonNumber == 0 ) {
					if( ( positionBullet < '-444' && positionBullet > '-464' && positionDragon > '366' && positionDragon < '406') || 
						 ( positionBullet < '-210' && positionBullet > '-230' && positionDragon > '508' && positionDragon < '548' )
					) {
						score();
					}
					if( positionDragon < 20 ) {
						lifeLose();
					}
				}
	// check dragon-b
				if( randomDragonNumber == 1 ) {
					if( (positionBullet < '-492' && positionBullet > '-512' && positionDragon > '172' && positionDragon < '212') ||
					(positionBullet < '-240' && positionBullet > '-260' && positionDragon > '344' && positionDragon < '384')
					) {
						score();
					}
					if( positionDragon < 20 ) {
						lifeLose();
					}
				}
	// check dragon-c
				if( randomDragonNumber == 2 ) {
					if( (positionBullet < '-360' && positionBullet > '-380' && positionDragon > '372' && positionDragon < '412') ||
					(positionBullet < '-300' && positionBullet > '-320' && positionDragon > '422' && positionDragon < '462')
					) {
						score();
					}
					if( positionDragon < 20 ) {
						lifeLose();
					}
				}
	// check dragon-d
				if( randomDragonNumber == 3 ) {
					if( (positionBullet < '-550' && positionBullet > '-570' && positionDragon > '320' && positionDragon < '360') ||
					(positionBullet < '-34' && positionBullet > '-54' && positionDragon > '582' && positionDragon < '622')
					) {
						score();
					}
					if( positionDragon < 20 ) {
						lifeLose();
					}
				}
	// check dragon-e
				if( randomDragonNumber == 4 ) {
					if( (positionBullet < '-448' && positionBullet > '-468' && positionDragon > '250' && positionDragon < '290') ||
					(positionBullet < '-134' && positionBullet > '-154' && positionDragon > '636' && positionDragon < '676')
					) {
						score();
					}
					if( positionDragon < 20 ) {
						lifeLose();
					}
				}

			}, 5);
				
		}, startingTime);
	}
	
	
	function restartGame(){
		// show the heart
		lifes = 0;
		$('#heart-1').attr('class','');
		$('#heart-1').css('display','block');
		$('#heart-2').attr('class','');
		$('#heart-2').css('display','block');
		$('#heart-3').attr('class','');
		$('#heart-3').css('display','block');
		//console.log('restart!');
		startGame();
	}

	
	// ________ interactions
	
	$(".start-game").click(function () {
		startGame();
		setInterval(function() {
			if( again == 1 ) {
					startGame();
					again = 0 ;
			}
		}, 100);
	});

	$(".restart-game").click(function () {
		restartGame();
	});
	
	$(".fire-button").click(function () {
		fire();
	});

	
	
	
});