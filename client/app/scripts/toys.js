// IDEA: wrap in IIFE for local scope, then
// store location in js so that can act without
// having to interact with the dom?
// TODO: add reset and move function and call them from click
// and swipe event handlers
(function($, window, document){

	$(document).ready(function init(){

		// variable delcaration
		// --------------------
		var toybox = $('#toybox');
		var centerpiece = $('#centerpiece');
		// stores active popin box
		var activeBox;
		// stores active location
		var location;

		// hammerjs initialization
		// ----------------------
		var body = document.getElementById('body-wrapper');
		var hammer = new Hammer(body);
		var hammerManager = new Hammer.Manager(body,{
			recognizers: [
				[Hammer.Swipe, {directon: Hammer.DIRECTION_ALL}]
			]
		});
		var swipes = [];
		swipes[2] = 'left';
		swipes[4] = 'right';
		swipes[8] = 'up';
		swipes[16] = 'down';



		// helper functions
		// --------------------
		function setLocation(){
			switch(activeBox.selector){
				// TODO:
				// this is a dumb data structure
				case '#about-box':
					location='right';
					break;
				case '#music-box':
					location='up';
					break;
				case '#websites-box':
					location='down';
					break;
				case '#projects-box':
					location='left';
					break;
			}
		}
		// move centerpiece and popin boxes back to neutral
		function reset(){
			location = undefined;
			centerpiece.removeClass('collapsed');
			toybox.removeClass();
			$('.active').removeClass('active');
		}
		// move centerpiece and popin boxes according to active box
		function move(){
			centerpiece.addClass('collapsed');
			toybox.removeClass().addClass(location);
			activeBox.addClass('active').siblings().removeClass('active');
		}



		// hammer.js touch event handler
		hammerManager.on('swipe', function(ev){
			if (!location){
				location = swipes[ev.direction];
				move();
			}
			// TODO: remove this ridiculous testing hack
			reset();
		});

		// click event handler for all four icons
		$(document).on('click', '#about, #music, #websites, #projects',
			function iconClickHandler(event){
				var id = event.currentTarget.id;
				activeBox = $('#'+id+'-box'); 

				// if box is already open, close it and move the center back to neutral
				if(activeBox.hasClass('active')){
					reset();
				// else move the center and slide in the box
				} else {
					setLocation(activeBox);
					move();
				}
			}
		);

	// end document.ready
	});
// end IIFE
})(window.jQuery, window, document);
