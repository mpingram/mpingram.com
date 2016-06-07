(function(){

var active;

$('#about').on('click', function(){
	var box = $('#box-about');
	if (active === 'about'){
		box.removeClass('active');
	} else {
 		box.addClass('active');
	}
});

$('#music').on('click', function(){
	var box = $('#box-music');
	if (active === 'music'){
		box.removeClass('active');
	} else {
 		box.addClass('active');
 		active = 'music';
	}
});

$('#websites').on('click', function(){
	var box = $('#box-websites');
	if (active === 'music'){
		box.removeClass('active');
	} else {
 		box.addClass('active');
	}
});

$('#projects').on('click', function(){
	var box = $('#box-projects');
	if (active === 'music'){
		box.removeClass('active');
	} else {
 		box.addClass('active');
	}
});


})();
