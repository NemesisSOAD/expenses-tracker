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
			id:			'expenseDetails',
			class:		'modal hide'
		},

		isCacheable: true,

		isModalDialog: true,

		initialize: function () {
			this.template = _.template(viewTemplate);
		},

		initializeTemplate: function(){
			this.$el.html(this.template(
				_.extend(this.model.toJSON(), 
					{categories: utils.categoriesList})
				)
			);

			this.$alerts =  this.$('.alert');
			this.$alertSuccess = this.$('.alert.alert-success');
			this.$alertError = this.$('.alert.alert-error');

			if (this.model.isNew()){
				this.$('.btn.delete').hide();
			}
		},

		render: function () {
			this.expensesList = this.options.expensesPage ? this.options.expensesPage.sortedList : undefined;
			this.oldModel = this.model.toJSON();

			this.initializeTemplate();

			Backbone.Validation.bind(this, {
				forceUpdate: true
			});

			this.model.on('validated:valid', this.valid, this);
			this.model.on('validated:invalid', this.invalid, this);

			return this;
		},

		events: {
			'change':				'updateModel',
			'click .save':			'saveExpense',
			'click .delete':		'deleteExpense',
			'click button.close':	'discardChanges'
		},

		updateModel: function (event) {
			var changed = utils.data.parseModelPropery(this.model, event);
			this.model.set(changed);
		},

		valid: function(){
			this.$alerts.hide();
			this.$alertSuccess.fadeIn();
		},

		invalid: function(){
			this.$alerts.hide();
			this.$alertError.fadeIn();
		},

		saveExpense: function(event){
			var self = this;

			this.$alerts.hide();

			var isModelNew = this.model.isNew()

			if(this.model.isValid(true)){
				this.$alertSuccess.show();
				this.model.save(null, {
					success: function(model){
						isModelNew ? self.succesCreate(model) : self.successSave(model)
					},
					error: function () {
						
					}
				});
			}
			else {
				this.$alertError.show();
			}

			return false;
		},

		successSave: function(model){
			var item = this.expensesList.get('id', model.get('id'));
			if (item)
				item.values(model.toJSON());

			this.expensesList.update();
			this.$el.modal('hide');
		},

		succesCreate: function(model){

			if (this.expensesList){
				this.expensesList.add(model.toJSON());
				this.expensesList.update();
			}

			this.hideDialog();
		},

		hideDialog: function(){
			this.$el.modal('hide');
		},

		deleteExpense: function(event){
			var self = this,
				expenseId = this.model.get('id');

			this.model.destroy({
				success: function(model, response) {
					self.expensesList.remove('id', expenseId);
					self.expensesList.update();

					self.hideDialog();
				}
			});

			return false;
		},

		discardChanges: function(){
			this.model.attributes = this.oldModel;
			this.hideDialog();
		}
	});

	return ExpenseDetailsView;

});
