var skillItems = {};
var techItems = {};

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

$('#about-skills-column').find('.about-skills-item').each(function(index, elem){
	skillItems[elem.id] = $(this);
});

$('#about-tech-column.').find('.about-tech-item').each(function(index, elem){
	techItems[elem.id] = $(this);
});

console.log(techItems);
