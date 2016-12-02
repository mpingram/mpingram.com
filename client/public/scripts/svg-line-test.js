var $svgContainer = $('#svg-container'); 

var $start = $('#webDesign');
var $end = $('#html');

var svgLineDrawer = SvgLineDrawer($svgContainer, 'about-skills-svg');


$(window).load(function(){
	svgLineDrawer.draw([$start, 'mid-right'], [$end, 'mid-left'], null, 'about-skills-line');
});