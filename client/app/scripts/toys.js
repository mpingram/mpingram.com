// resets boxes and icons to neutral
function resetPage(boxId){

}

// moves boxes and icons according
// to which corner of the screen they're in
function moveBoxes(boxId){

}


// click event handler for all four icons
$(document).on('click touchend', '#about, #music, #websites, #projects',
	function(event){
		var id = event.currentTarget.id;
		console.log(event.currentTarget.id);
		var box = $('#'+id+'-box'); 
		// if box is already open, close it
		if(box.hasClass('active')){
			box.removeClass('active');
		// else close any open boxes and open the selected box
		} else {
			box.addClass('active').siblings().removeClass('active');
		}
	}
);




