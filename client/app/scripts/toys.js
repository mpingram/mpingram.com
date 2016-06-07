$(document).on('click touchend', 
	'#about, #music, #websites, #projects',
	function(event){
		var id = event.currentTarget.id;
		// identify id of popin box
		var box = $('#box-'+id); 
		if(box.hasClass('active')){
			box.removeClass('active');
		} else {
			box.addClass('active').siblings().removeClass('active');
		}
	}
);