function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

var paths = merge_options(requireConfig.paths, {
		jasmine: '../test/lib/jasmine-1.2.0/jasmine',
		'jasmine-html': '../test/lib/jasmine-1.2.0/jasmine-html',
		spec: '../test/spec/',
		memoryStorage: 'libs/utils/memoryStore'
	});

require.config({
	baseUrl: '../js/',
	paths: paths,
	shim: {
		jasmine: {
			exports: 'jasmine'
		},
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'jasmine'
		}
	},
	waightSeconds: 30
});

var specs = ['spec/models/ExpenseSpec'];

require(['jquery',
	'memoryStorage',
	'jasmine-html'
], function($, storage, jasmine){

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};
	

	jQuery(function() {
		require(specs, function(){
			jasmineEnv.execute();
		});
	});

});
