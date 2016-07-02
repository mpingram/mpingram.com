// TODO: add reset and move function and call them from click
// and swipe event handlers
(function($, window, document){

	$(document).ready(function init(){

		// variable delcaration
		// --------------------
		var icons = $('#icons');
		var centerpiece = $('#centerpiece');

		// stores local variables which track
		// the page's state
		var locals = {};
		// stores active popin box
		locals.activeBox = undefined;
		// stores active location
		locals.iconsLocation = undefined;


		var boxLocationTable = {
			'#projects-box':'left',
			'#about-box':'right',
			'#music-box':'up',
			'#websites-box':'down'
		};


		// hammerjs initialization
		// ----------------------
		var body = document.getElementById('body-wrapper');
		var hammer = new Hammer(body);
		var hammerManager = new Hammer.Manager(body,{
			recognizers: [
				[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
			]
		});
		
		var swipeTable = {
			2:{ // right swipe
				 'opens': '#projects-box',
				 'closes': '#about-box'
				},
			4:{ // left swipe
					'opens': '#about-box',
					'closes': '#projects-box'
				},
			8:{ // downward swipe
					'opens': '#music-box',
					'closes': '#websites-box'
				},
			16:{ // upward swipe
					'opens': '#websites-box',
					'closes':'#music-box'
				}
		};




		// helper functions
		// --------------------

		// move centerpiece and popin boxes back to neutral
		function reset(){
			locals.iconsLocation = undefined;
			locals.activeBox = undefined;
			centerpiece.removeClass('collapsed');
			icons.removeClass();
			$('.active').removeClass('active');
		}

		// move centerpiece, icons, and popin boxes
		function move(){
			locals.iconsLocation = boxLocationTable[locals.activeBox.selector];
			centerpiece.addClass('collapsed');
			icons.removeClass().addClass(locals.iconsLocation);
			locals.activeBox.addClass('active').siblings().removeClass('active');
		}



		// hammer.js touch event handler
		hammerManager.on('swipe', function(event){
			if(event.direction !== 1){

				var swipe = swipeTable[event.direction];

				if (!locals.activeBox){
					locals.activeBox = $(swipe.opens);
					move();
				} else if (locals.activeBox.selector === swipe.closes){
					reset();
				}

			}
		});


		// click event handler for four central icons
		$(document).on('click', '#about, #music, #websites, #projects',
			function iconClickHandler(event){
				var id = event.currentTarget.id;
				// identify popin box associated with icon id
				locals.activeBox = $('#'+id+'-box'); 
				// if box is already open, close it and move the center back to neutral
				if(locals.activeBox.hasClass('active')){
					reset();
				// else move the center and slide in the box
				} else {
					move();
				}
			}
		);

	// end document.ready
	});

// end IIFE
// pass in global objects
})(window.jQuery, window, document);
