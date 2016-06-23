// IDEA: wrap in IIFE for local scope, then
// store location in js so that can act without
// having to interact with the dom?
// TODO: add reset and move function and call them from click
// and swipe event handlers
(function($, window, document){

	$(document).ready(function init(){

		var toybox = $('#toybox');
		var centerpiece = $('#centerpiece');
		var location;

		function reset(){
			centerpiece.removeClass('collapsed');
			toybox.removeClass();
			$('.active').removeClass('active');
		}

		function moveCenterpiece(direction){
		}


		// hammer.js touch event handler
		var body = document.getElementById('body-wrapper');
		var hammer = new Hammer(body);
		var hammerManager = new Hammer.Manager(body,{
			recognizers: [
				[Hammer.Swipe, {directon: Hammer.DIRECTION_ALL}]
			]
		});
		hammerManager.on('swipe', function(ev){
			// TODO: remove this ridiculous testing hack
			reset();
		});

		// click event handler for all four icons
		$(document).on('click', '#about, #music, #websites, #projects',
			function iconHandler(event){
				var id = event.currentTarget.id;
				var box = $('#'+id+'-box'); 

				// where center should move
				switch(id){
					case 'about':
						location='right';
						break;
					case 'music':
						location='top';
						break;
					case 'websites':
						location='bottom';
						break;
					case 'projects':
						location='left';
						break;
				}

				// if box is already open, close it and move the center back to neutral
				if(box.hasClass('active')){
					reset();
					/*
					centerpiece.removeClass('collapsed');
					toybox.removeClass();
					box.removeClass('active');
					*/
				// else move the center and slide in the box
				} else {
					centerpiece.addClass('collapsed');
					toybox.removeClass().addClass(location);
					box.addClass('active').siblings().removeClass('active');
				}
			}
		);

	// end document.ready
	});
// end IIFE
})(window.jQuery, window, document);
