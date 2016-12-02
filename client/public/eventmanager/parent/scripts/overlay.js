$(document).ready( function(){

	
	// commentary helper functions
	// =================================
	function showCommentary(){

	}
	
	function hideCommentary(){

	}




	// click handlers
	// ===================================
	var $commentaryToggleButton = $('#commentary-toggle-button');

	$commentaryToggleButton.on( 'click', function(){

		if ( $(this).hasClass( 'on' ) ){
			$(this).removeClass( 'on' ).addClass( 'off' );
			hideCommentary();
		} else {
			$(this).removeClass( 'off' ).addClass( 'on' );
			showCommentary();
		}

	});





















});