require.config({
	paths: requireConfig.paths,
	waitSeconds: 30
});

require(['jquery',
	'app', 'utils'

	//comment when use real db
	//, 'libs/utils/memoryStore'

], function(jQuery, App, utils){

	jQuery(function ($) {
		
		App.initialize();
	});
});