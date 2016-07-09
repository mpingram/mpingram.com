(function($, window, document){

	$(document).ready(function init(){


	// I. EVENT HANDLERS
	// ====================

		// variable delcaration
		// --------------------
		var icons = $('#icons');
		var centerpiece = $('#centerpiece');

		// stores local variables which track
		// the page's state
		var locals = {};
		// stores active popin box
		locals.activeBox = undefined;
		// stores active location
		locals.iconsLocation = undefined;


		var boxLocationTable = {
			'#projects-box':'left',
			'#about-box':'right',
			'#music-box':'up',
			'#websites-box':'down'
		};


		// hammerjs initialization
		// ----------------------
		var body = document.getElementById('body-wrapper');
		var hammer = new Hammer(body);
		var hammerManager = new Hammer.Manager(body,{
			recognizers: [
				[Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
			]
		});
		
		var swipeTable = {
			2:{ // right swipe
				 'opens': '#projects-box',
				 'closes': '#about-box'
				},
			4:{ // left swipe
					'opens': '#about-box',
					'closes': '#projects-box'
				},
			8:{ // downward swipe
					'opens': '#music-box',
					'closes': '#websites-box'
				},
			16:{ // upward swipe
					'opens': '#websites-box',
					'closes':'#music-box'
				}
		};




		// helper functions
		// --------------------

		// move centerpiece and popin boxes back to neutral
		function reset(){
			locals.iconsLocation = undefined;
			locals.activeBox = undefined;
			centerpiece.removeClass('collapsed');
			icons.removeClass();
			$('.active').removeClass('active');
		}

		// move centerpiece, icons, and popin boxes
		function move(){
			locals.iconsLocation = boxLocationTable[locals.activeBox.selector];
			centerpiece.addClass('collapsed');
			icons.removeClass().addClass(locals.iconsLocation);
			locals.activeBox.addClass('active').siblings().removeClass('active');
		}



		// hammer.js touch event handler
		hammerManager.on('swipe', function(event){
			if(event.direction !== 1){

				var swipe = swipeTable[event.direction];

				if (!locals.activeBox){
					locals.activeBox = $(swipe.opens);
					move();
				} else if (locals.activeBox.selector === swipe.closes){
					reset();
				}

			}
		});


		// click event handler for four central icons
		$(document).on('click', '#about, #music, #websites, #projects',
			function iconClickHandler(event){
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
			}
		);

	// end EVENT HANDLERS
	// ======================


	// II. ABOUT-SKILLS-LIST CONNECTING LINES
	// =======================
		// draws SVG lines connecting element in
		// the skill list with elements in the tech list

		// store skills and technology jQuery elements
		var skillItems = {};
		var techItems = {};
		var svgElement = $('#about-skills-svg');

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

		// TODO: define svg create function - make sure the markup is good - give it a class
		var createSVG = function(positionObj){

			var svgLine = document.createElementNS('http://www.w3.org/2000/svg','line');
			svgLine.setAttributeNS(null, 'class','about-skills-line');
			svgLine.setAttributeNS(null, 'stroke-width','2px');
			svgLine.setAttributeNS(null, 'stroke','black');

			svgLine.setAttributeNS(null, 'x1',positionObj.x1);
			svgLine.setAttributeNS(null, 'y1',positionObj.y1);
			svgLine.setAttributeNS(null, 'x2',positionObj.x2);
			svgLine.setAttributeNS(null, 'y2',positionObj.y2);

			console.log(svgLine);
			return svgLine;
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
			console.log(skillItem[0].id);
			var technologies = skillTechTable[skillItem[0].id];

			var positionObj = {
				// todo: this sucks, i want the mid right
				// can use clientHeight/clientWidth jquery obj props to fix
				'x1':skillPosition.left,
				'y1':skillPosition.top
			};
			for (var i=0;i<technologies.length;i++){

				// get position of this tech element
				var techItem = techItems[technologies[i]];
				var techPosition = techItem.position();
				positionObj.x2 = techPosition.left;
				positionObj.y2 = techPosition.top;

				// draw svg line connecting skill element to tech element
				var line = createSVG(positionObj);
				// stick the svg line into the dom
				svgElement.append(line);

			}


		});

		// TODO: handle window.resize() events with updateSVG function




	// end ABOUT-SKILLS-LIST CONNECTING LINES
	// ========================



	// end document.ready
	});

// end IIFE
// pass in global objects
})(window.jQuery, window, document);
