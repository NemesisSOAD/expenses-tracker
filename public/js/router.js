define([
	'jquery',
	'underscore',
	'backbone',
	'models/Expense',
	'views/HeaderView',
	'views/Expenses/ExpensesPage',
	'views/ExpenseDetailsView',
	'views/AboutPage',
	'utils'
], function($, _, Backbone, Expense, HeaderView, ExpensesPage, ExpenseDetailsView, AboutPage, utils){

	var AppRouter = Backbone.Router.extend({

		routes:{
			'':                             'goToDashboard',
			'login':                        'goToLogin',
			'dashboard':                    'goToDashboard',
			'expenses/add':					'addExpense',
			'expenses/:id':					'expenseDetails',
			'about':	                    'goToAbout'
		},

		//initialize data
		initialize: function() {
			this.headerView = new HeaderView();
			utils.ui.$elems.header.html(this.headerView.el);
		},

		//login page
		goToLogin: function () {

			
		},

		//dashboard
		goToDashboard: function(){
			this.expensesPage = this.expensesPage || new ExpensesPage();
			this.slidePage(this.expensesPage);
		},

		expenseDetails: function(id){
			var expense = this.expensesPage.expenses.get(id);
			this.createExpenseDetailsView(expense);
			
			//add hidden dialog content
			this.slidePage(this.expenseDetailsPage);
		},

		addExpense: function(){
			this.createExpenseDetailsView(new Expense());
			
			//add hidden dialog content
			this.slidePage(this.expenseDetailsPage);
		},

		goToAbout: function(){
			this.aboutPage = this.aboutPage || new AboutPage();
			this.slidePage(this.aboutPage);
		},

		//sliding pages
		slidePage: function(page, modalClosedCallback) {
			if (this.currentPage){
				Backbone.Validation.unbind(this.currentPage);
				if(!this.currentPage.isCacheable)
					$('#' + this.currentPage.attributes.id).remove();
			}

			this.currentPage = page;

			var renderedPage = $('#' + page.attributes.id);
			
			//hide other pages
			if (!page.isModalDialog)
				utils.ui.$elems.content.children().hide();

			if (renderedPage[0]){
				//make needed DOM manipulations
				page.render();
			}
			else{
				//insert page to DOM
				utils.ui.$elems.content.append(page.render().el);
			}

			//show rendered page
			if (page.isModalDialog){
				page.showDialog();
			}
			else renderedPage.show();
		},

		backToPrevPage: function(){
			window.history.back();
		},

		createExpenseDetailsView: function(model){
			this.expenseDetailsPage = this.expenseDetailsPage || new ExpenseDetailsView();
			this.expenseDetailsPage.model = model;
			this.expenseDetailsPage.options = {expensesPage: this.expensesPage};
		}

	});

	var initialize = function(){
		window.app = new AppRouter;
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});
