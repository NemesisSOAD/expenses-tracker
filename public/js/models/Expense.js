define([
	'jquery',
	'underscore',
	'backbone',
	'utils'
], function($, _, Backbone, utils) {
	
	var Expense = Backbone.Model.extend({
		url: 'api/expenses',

		defaults: {
			id: 				null,
			name: 				'',
			dateCreated: 		new Date(),
			category: 			'',
			description: 		'',
			paid:				false,
			cost:				0
	}
	});

	return Expense;
});