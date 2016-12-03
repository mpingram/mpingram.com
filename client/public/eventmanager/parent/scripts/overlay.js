$(document).ready( function(){



	// commentary
	// ===============================
	
	// commentary configuration
	// -------------------------------------
	var commentaryArray = [
		{
			'element': 'em-event-list',
			'message': 'Test',
			'link': 'http://google.com',
			'offset': {
				'top': -20,
				'left': 10
			}
		},
	];
	

	// helper jquery method
	$.fn.exists = function(){
		return this.length !== 0;
	};

	// commentary creation functions
	// ----------------------------------
	var $overlayCommentaryContainer = $('#overlay-commentary-container');

	function createCommentaryBubble( options ){

		var message = options.message;
		var link = options.link;

		var $elem = $(options.element);
		if ( $elem.exists() === false ){
			throw new Error( 'Element not found: ' + options.element );
		}
		var position = $elem.offset();
		var adjustment = options.offset;

		var location = {
			left: ( position.left + adjustment.left ) + 'px',
			top: 	( position.top + adjustment.top ) + 'px'
		};

		// commentary bubble creation
		var $commentaryBubbleTemplate = $('<div/>', {
			'class': 'commentary-bubble',

		}).css({ 
			'top': location.top, 
			'left': location.left 
		});

		var $commentaryMessage = $('<div/>', {
			'class': 'commentary-message'
		}).text( message );

		var $commentaryLink = $('<div/>', {
			'class': 'commentary-link'
		}).text( link );

		var $commentaryBubble = $commentaryBubbleTemplate.append( $commentaryMessage, $commentaryLink );

		$overlayCommentaryContainer.append( $commentaryBubble );

	}


	// commentary display functions
	// ------------------------------------
	function showCommentary(){
		$('.commentary-bubble').show();
	}

	function hideCommentary(){
		$('.commentary-bubble').hide();
	}


	
	
	// commentary initialization functions
	// ------------------------------------
	function writeCommentary( commentaryArray ){

		for( var i=0; i < commentaryArray.length; i++){
			try {
				createCommentaryBubble( commentaryArray[i] );
			} catch( error ){
				console.warn( error.message );
			}
		}

	}


	


	/////////////////////
	// commentary init //
	/////////////////////
	// ----------------------------------- 
	
	// TODO: call after angular initialized somehow
	// or try catch try again?
	setTimeout( function(){
		writeCommentary( commentaryArray );
	}, 1000);





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

	var $returnParentButton = $('#return-parent-button');
	$returnParentButton.on( 'click', function(){
		// ohhh boy
	});




















});