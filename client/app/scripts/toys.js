// click event handler for all four icons
$(document).on('click', '#about, #music, #websites, #projects',
	function(event){
		var id = event.currentTarget.id;
		var box = $('#'+id+'-box'); 
		var toybox = $('#toybox');
		var centerpiece = $('#centerpiece');

		// where center should move
		var location;
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
			centerpiece.removeClass('collapsed');
			toybox.removeClass();
			box.removeClass('active');
		// else move the center and slide in the box
		} else {
			centerpiece.addClass('collapsed');
			toybox.removeClass().addClass(location);
			box.addClass('active').siblings().removeClass('active');
		}
	}
);

// hammer.js touch event handler
var body = document.getElementById('body-wrapper');
var hammer = new Hammer(body);
var hammerManager = new Hammer.Manager(body,{
	recognizers: [
		[Hammer.Swipe, {directon: Hammer.DIRECTION_ALL}]
	]
});
hammerManager.on('swipe', function(ev){
	console.log(ev);
});
