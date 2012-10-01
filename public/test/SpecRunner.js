function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

var paths = merge_options(requireConfig.paths, {
		'jasmine':				'../test/lib/jasmine-1.2.0/jasmine',
		'jasmine-html':			'../test/lib/jasmine-1.2.0/jasmine-html',
		'sinon':				'../test/lib/sinon-1.4.2',
		'jasmine-sinon':		'../test/lib/jasmine-sinon',
		'spec':					'../test/spec/',
		'memoryStorage':		'utils/memoryStore'
	});

require.config({
	baseUrl: '../js/',
	paths: paths,
	shim: {
		'jasmine': {
			exports:		'jasmine'
		},
		'jasmine-html': {
			deps:			['jasmine'],
			exports:		'jasmine'
		},
		'sinon': {
			deps:			['jasmine-html'],
			exports:		'sinon'
		},
		'jasmine-sinon': {
			deps:			['sinon'],
			exports:		'jasmine-sinon'
		}

	},
	waightSeconds: 30
});

var specs = ['spec/models/ExpenseSpec',
			'spec/views/CreateExpenseSpec',
			'spec/views/ModifyExpenseSpec'
			];

require(['jquery',
	'jasmine-html',
	'sinon',
	'jasmine-sinon'
], function($, jasmine){

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
