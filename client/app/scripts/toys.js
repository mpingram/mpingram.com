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
			toybox.removeClass(location);
			box.removeClass('active');
		// else move the center and slide in the box
		} else {
			centerpiece.addClass('collapsed');
			toybox.removeClass().addClass(location);
			box.addClass('active').siblings().removeClass('active');
		}
	}
);




