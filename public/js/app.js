define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'router',
	'backboneValidation',
	'bootstrap',
	'list',
	'listPaging',
	'listFuzzySearch'
], function($, _, Backbone, utils, Router){
	
	var initialize = function(){
		
		Router.initialize();

	}
	return {
		initialize: initialize
	};
});
