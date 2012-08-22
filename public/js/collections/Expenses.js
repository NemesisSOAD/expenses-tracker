define([
	'jquery',
	'underscore',
	'backbone',
	'models/Expense',
	'utils'
], function($, _, Backbone, Expense, utils){
	
	var Expenses = Backbone.Collection.extend({
		model: Expense,
		url: 'api/expenses'
	})

	return Expenses;
});
