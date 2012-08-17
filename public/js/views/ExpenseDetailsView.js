define([
	'jquery',
	'underscore',
	'backbone',
	'models/Expense',
	'template!templates/expense-details-view.html',
	'utils'
], function($, _, Backbone, Expense, viewTemplate, utils) {

	var ExpenseDetailsView = Backbone.View.extend({

		tagName: 'div',

		attributes: {
			id: 'expenseDetails',
			class: 'modal hide fade in'
			//style: 'display:none'
		},

		initialize: function () {
			this.template = _.template(viewTemplate);
		},

		initializeTemplate: function(){

		},

		render: function () {
			var self = this;

			!this.$el.html() && this.initializeTemplate();

			$(this.el).html(this.template(this.model.toJSON()));


			return this;
		},

		events: {
			'click .save'   :		'saveExpense',
        	'click .delete' :		'deleteExpense'
		},

		saveExpense: function(event){
			var self = this;
	        this.model.save(null, {
	            success: function (model) {
	                self.render();
	                
	            },
	            error: function () {
	                
	            }
	        });
			
		},

		deleteExpense: function(event){
			
			
		}
	});

	return ExpenseDetailsView;

});
