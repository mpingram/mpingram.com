$(document).on('click touchend', 
	'#about, #music, #websites, #projects',
	function(event){
		var id = event.currentTarget.id;
		var box = $('#box-'+id); 
		if(box.hasClass('active')){
			box.removeClass('active');
		} else {
			// removeClass from all four boxes
			// add class to box.
			box.addClass('active').siblings().removeClass('active');
		}
	}
);