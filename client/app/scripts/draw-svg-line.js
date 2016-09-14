/**
 * Constructor for svgLineDrawer object.
 * Creates an svg element inside a container and exposes methods
 * for drawing and erasing svg lines in a generated svg element.
 *
 * Dependencies: jQuery
 * 
 * @param {jQuery} $svgContainerElement - jQuery element which will contain svg element to be drawn into
 * @param {string} [svgElementId] - sets the name of the generated svg element
 */
function createSvgLineDrawer($svgContainerElement, svgElementId){

	if (!($svgContainerElement instanceof jQuery)){
		throw new Error('No JQuery object passed to SvgLineDrawer constructor');
	}
	if (svgElementId === undefined){
		svgElementId = '';
	}
	
	var svgLineDrawer = {};

	/**
	 * Initializes svg element
	 * Side effects: generates svg element and appends it to container in DOM
	 */
	svgLineDrawer.init = function(){
		svgLineDrawer.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgLineDrawer.svg.setAttributeNS(null, 'id', svgElementId);
		$svgContainerElement.append(svgLineDrawer.svg);
	};

	/**
	 * @param  {jQuery} $element
	 * @param  {string} [origin='top-left'] - sets origin point on element from which to begin line. Values must be ['top-left','top-right','mid-left','mid-right','bottom-left','bottom-right']
	 * @returns {object} object with two properties, x and y, specifying coordinates of origin point
	 */
	svgLineDrawer.getPosition = function($element, origin){

		if (!($element instanceof jQuery)){
			throw new Error('No jQuery object passed to getPosition() method');
		}

		if (origin === undefined){
			origin = 'top-left';
		}
		
		var position = {
			x: $element.position().left,
			y: $element.position().top,
		};

		switch(origin){
			case 'top-left':
				// do nothing, coordinates are accurate
			break;
			case 'top-right':
				position.x += $element.innerWidth();
			break;
			case 'bottom-left':
				position.y += $element.outerHeight(true);
				break;
			case 'bottom-right':
				position.x += $element.innerWidth();
				position.y += $element.outerHeight(true);
			break;
			case 'mid-left':
				position.y += ($element.outerHeight(true) / 2);
				break;
			case 'mid-right':
				position.x += $element.innerWidth();
				position.y += ($element.outerHeight(true) / 2);
			break;
		}

		return position;
	};

	/**
	 * Draws svg line connecting two points, with optional id and class to be applied to
	 * line element
	 * @param  {string[]} startPointInfo
		 * @param  {jQuery} startPointInfo[0] - jQuery element to start drawing from
		 * @param  {string} startPointInfo[1] - point on element to begin drawing from, one of ['top-left','top-right','mid-left','mid-right','bottom-left','bottom-right']
	 * @param  {string[]} endPointInfo
		 * @param  {jQuery} endPointInfo[0] - jQuery element to end drawing at
		 * @param  {string} endPointInfo[1] - point on element to end drawing at, one of ['top-left','top-right','mid-left','mid-right','bottom-left','bottom-right']
	 * @param  {string} [lineId] - id to be applied to line element
	 * @param  {string} [lineClass] - class(es) to be applied to line element. Separate multiple classes with a space.
	 */
	svgLineDrawer.drawLine = function(startPointInfo, endPointInfo, lineId, lineClass){

		var $startElement = startPointInfo[0];
		var $endElement = endPointInfo[0];
		var startOrientation = startPointInfo[1];
		var endOrientation = endPointInfo[1];

		var startElementPosition = svgLineDrawer.getPosition($startElement, startOrientation);
		var endElementPosition = svgLineDrawer.getPosition($endElement, endOrientation);

		var svgLine = document.createElementNS('http://www.w3.org/2000/svg','line');

		svgLine.setAttributeNS(null, 'id', lineId);
		svgLine.setAttributeNS(null, 'class', lineClass);
		svgLine.setAttributeNS(null, 'stroke-width','1px');

		svgLine.setAttributeNS(null, 'x1', startElementPosition.x);
		svgLine.setAttributeNS(null, 'y1', startElementPosition.y);
		svgLine.setAttributeNS(null, 'x2', endElementPosition.x);
		svgLine.setAttributeNS(null, 'y2', endElementPosition.y);

		svgLineDrawer.svg.appendChild(svgLine);
	};

	/**
	 * Removes everything in svg element.
	 */
	svgLineDrawer.eraseAll = function(){
		$svgContainerElement.empty();
	};

	svgLineDrawer.reinitialize = function(){
		svgLineDrawer.eraseAll();
		svgLineDrawer.init();
	};

	// initialize svg element and store reference to its jQuery obj
	svgLineDrawer.init();
	return svgLineDrawer;
}