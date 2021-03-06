define([
	'jquery',
	'underscore',
	'backbone',
	'utils'
], function($, _, Backbone, utils) {
	
	var Expense = Backbone.Model.extend({

		idAttribute: '_id',

		urlRoot : 'api/expenses',

		defaults: {
			id: 				null,
			_id: 				null,
			name: 				'',
			dateCreated: 		new Date(),
			dateCreatedFormat:	'',
			categoryId:			utils.categoriesList[0].id,
			categoryName:		'',
			description: 		'',
			paid:				false,
			cost:				0,
			number:				0
		},

		parse: function(response, xhr) {
			return utils.data.parseExpense(response, xhr);
		},

		validation: {
			name: {
				required: true
			},
			dateCreated:{ 
				fn: function(value, attr, computedState) {
					if(isNaN(Date.parse(value))) {
						return 'Please enter correct date';
					}
				}
			},
			description: {
				minLength: 10,
				msg: 'Please provide description (10 symbols at least)'
			},
			cost: [{
					required: true,
					msg: 'Expense cost is required'
				},
				{
					pattern: 'number',
					msg: 'Cost must be a valid sum ($)'
				},
				{
					min: 0,
					msg: 'Money sum must be grater or equal to $0'
				}]
		}
	});

	return Expense;
});