$(document).ready( function init(){

	// TODO (consider): You don't really need jquery here!
	// consider removing when optimizing site

	// stores local variables which track
	// the page's state
	var locals = {};
	// stores active popin box
	locals.activeBox = undefined;
	// stores active location
	locals.iconsLocation = undefined;
	// stores whether about-skills svg lines have been drawn
	locals.svgLinesDrawn = false;
	// stores whether bandcamp iframe has been loaded
	locals.musicPlayerLoaded = false;



	// I: HELPER FUNCTIONS for drawing svg lines in about-box
	// and async loading bandcamp player in music box.
	// ================================================
	function drawSVG(){


		// draws SVG lines connecting element in
		// the skill list with elements in the tech list

		// store skills and technology jQuery elements
		var skillItems = {};
		var techItems = {};
		var svgContainer = $('#svg-container');

		// if the svgs are already on the page, delete them
		if (locals.svgLinesDrawn){
			svgContainer.empty();
		}

		// match skills to technologies via IDs
		// TODO: brittle, is there a smarter way?
		var skillTechTable = {
			'webApps': [
				'javascript',
				'angularJS',
				'jQuery',
				'html',
				'css'
			],
			'restApi': [
				'javascript',
				'nodeJS',
				'expressJS'
			],
			'server': [
				'javascript',
				'nodeJS',
				'expressJS'
			],
			'databaseManagement': [
				'mongoDB',
				'mongoose',
				'mySQL'
			],
			'webDeployment': [
				'git',
				'AWS'
			],
			'webDesign': [
				'html',
				'css',
				'illustrator', 
				'jQuery'
			] 
		};

		// create svg object and append it to DOM
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttributeNS(null, 'class','about-skills-svg');
		svgContainer.append(svg);

		var drawLine = function(positionObj){


			var svgLine = document.createElementNS('http://www.w3.org/2000/svg','line');
			svgLine.setAttributeNS(null, 'class','about-skills-line');
			svgLine.setAttributeNS(null, 'stroke-width','1px');
			svgLine.setAttributeNS(null, 'stroke','#B7B7B7');

			svgLine.setAttributeNS(null, 'x1', positionObj.x1);
			svgLine.setAttributeNS(null, 'y1', positionObj.y1);
			svgLine.setAttributeNS(null, 'x2', positionObj.x2);
			svgLine.setAttributeNS(null, 'y2', positionObj.y2);
			svg.appendChild(svgLine);

		};


		// stick tech jQuery element into container object, we'll need it soon.
		$('#about-tech-column').find('.about-tech-item').each(function(index, elem){
			techItems[elem.id] = $(this);
		});
		// iterate over skill items and draw the svgs we need.
		$('#about-skills-column').find('.about-skills-item').each(function(){
			var skillItem = $(this);

			// stick skill jQuery element into container object, we'll need it to
			// efficiently update the svg lines on window.resize events.
			skillItems[skillItem[0].id] = skillItem;
			var skillPosition =  skillItem.position();


			// get the array of tech item IDs associated with this skill
			var technologies = skillTechTable[skillItem[0].id];

			var positionObj = {
				// todo: this sucks, i want the mid right
				// can use clientHeight/clientWidth jquery obj props to fix
				'x1':skillPosition.left + skillItem[0].clientWidth,
				'y1':skillPosition.top + skillItem[0].clientHeight/2
			};
			for (var i=0;i<technologies.length;i++){

				// get position of this tech element
				var techItem = techItems[technologies[i]];
				var techPosition = techItem.position();
				positionObj.x2 = techPosition.left;
				positionObj.y2 = techPosition.top + techItem[0].clientHeight/2;

				// draw svg line connecting skill element to tech element
				drawLine(positionObj);
			}
		});

		locals.svgLinesDrawn = true;
	// end drawSvg()
	}

	function loadBandcampPlayer(){
		// DEBUG: does this block?

		// grab container
		var musicPlayerContainer = $('#music-player-container');

		// generate bandcamp player iframe
		var player = document.createElement('iframe');
		player.src = 'https://bandcamp.com/EmbeddedPlayer/album=2571936169/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/';
		player.setAttribute('seamless','');
		player.classList.add('music-player');

		// add link to bandcamp page to iframe
		var bcLink = document.createElement('a');
		bcLink.href = 'http://nominal.bandcamp.com/album/apartments-ep';
		player.appendChild(bcLink);

		// put iframe in container element,
		musicPlayerContainer.append(player);
		// remove loading.gif background
		musicPlayerContainer.css('background', 'none');

		// update local variable, we've loaded the player
		// locals.musicPlayerLoaded = true;
	}

	// II. EVENT HANDLERS
	// ====================

	// --------------------
	var icons = $('#icons');
	var centerpiece = $('#centerpiece');
	var contactBox = $('#contact-box');



		var boxLocationTable = {
			'#projects-box':'left',
			'#about-box':'right',
			'#music-box':'up',
			'#websites-box':'down'
		};


		// hammerjs initialization
		// ----------------------
		// TODO: figure out how to manage touch events without
		// interfering with browsers' touch scrolling.
		//var body = document.getElementById('body-wrapper');
		var center = document.getElementById('center-container');
		var hammer = new Hammer(center);
		var hammerManager = new Hammer.Manager(center,{
			recognizers: [
				[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
			]
		});
		
		var swipeTable = {
			2:{ // right swipe
				 'opens': '#projects',
				 'closes': '#about-box'
				},
			4:{ // left swipe
				'opens': '#about',
				'closes': '#projects-box'
				},
			8:{ // downward swipe
				'opens': '#music',
				'closes': '#websites-box'
				},
			16:{ // upward swipe
				'opens': '#websites',
				'closes':'#music-box'
				}
		};




		// helper functions
		// --------------------

		// move centerpiece, icons, and popin boxes
		var move = function(){
			locals.iconsLocation = boxLocationTable[locals.activeBox.selector];
			centerpiece.addClass('collapsed');
			icons.removeClass().addClass(locals.iconsLocation);
			locals.activeBox.addClass('active').siblings().removeClass('active');
		};

		// move centerpiece and popin boxes back to neutral
		var reset = function(){
			locals.iconsLocation = undefined;
			locals.activeBox = undefined;
			centerpiece.removeClass('collapsed');
			icons.removeClass();
			$('.active').removeClass('active');
		};

		var iconClickHandler = function(event){
			var id = event.currentTarget.id;
			// identify popin box associated with icon id
			locals.activeBox = $('#'+id+'-box'); 
			// if box is already open, close it and move the center back to neutral
			if(locals.activeBox.hasClass('active')){
				reset();
			// else move the center and slide in the box
			} else {
				move();
			}
		};

		var contactBoxClickHandler = function(event){
			reset();
			contactBox.toggleClass('hidden');
			icons.addClass('down');
		};

		// click event handler for four central icons
		$(document).on('click', '.contact-button', contactBoxClickHandler );
		$(document).on('click', '#websites, #projects', iconClickHandler );
		$('#music').on('click', function(event){
			iconClickHandler(event);
			/*if (!locals.musicPlayerLoaded){
				loadBandcampPlayer();
			}*/
		});
		$('#about').on('click', function(event){
			iconClickHandler(event);
			if (!locals.svgLinesDrawn){
				drawSVG();
			}
		});


		// redraw about-skill svg lines on window resize
		$(window).resize( drawSVG );

		// hammer.js touch event handler
		hammerManager.on('swipe', function hammerSwipeHandler(event){

			// if event direction is not 'no direction'
			if(event.direction !== 1){

				// match swipe value to direction ('left','right','up','down')
				var swipe = swipeTable[event.direction];

				if (!locals.activeBox){
					$(swipe.opens).trigger('click');
				} else if (locals.activeBox.selector === swipe.closes){
					reset();
				}

			}
		});



	// end EVENT HANDLERS
	// ======================


	window.onload = loadBandcampPlayer();

// end document.ready
});
