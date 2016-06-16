// click event handler for all four icons
$(document).on('click touchend', '#about, #music, #websites, #projects',
	function(event){
		var id = event.currentTarget.id;
		var box = $('#'+id+'-box'); 
		var toybox = $('#toybox');

		// stores where center should move
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
			toybox.removeClass(location);
			box.removeClass('active');
		// else move the center and slide in the box
		} else {
			toybox.removeClass().addClass(location);
			box.addClass('active').siblings().removeClass('active');
		}
	}
);




