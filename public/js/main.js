require.config({
	paths: {
		jquery: 'libs/jquery/jquery-1.8.0',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		bootstrap: 'libs/bootstrap/bootstrap',
		backboneValidation: 'libs/backbone/backbone.validation',
		utils: 'libs/utils/utils',
		template: 'libs/require/text',
		templates: '../templates',

		list: 'libs/list/list',
		listPaging: 'libs/list/list.paging',
		listFuzzySearch: 'libs/list/list.fuzzySearch'
	},
	waitSeconds: 30
});

require(['jquery',
	'app', 'utils'

	//comment when use real db
	, 'libs/utils/memoryStore'

], function(jQuery, App, utils){

	jQuery(function ($) {
    	
    	App.initialize();
  	});
});