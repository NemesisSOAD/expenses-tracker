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
			var self = this;
			var expense = this.expensesPage.expenses.get(id);
	        
	        new ExpenseDetailsView({model: expense}).render().$el.modal('show').on('hide', function(){
	        	//self.goToDashboard();
	        });
		},

		addExpense: function(){
			var self = this;
			new ExpenseDetailsView({model: new Expense()}).render().$el.modal('show').on('hide', function(){
	        	//self.goToDashboard();
	        });
		},

		goToAbout: function(){
			this.aboutPage = this.aboutPage || new AboutPage();
			this.slidePage(this.aboutPage);
		},

		//sliding pages
		slidePage: function(page) {
			if (this.currentPage && !this.currentPage.isCacheable){
				$('#' + this.currentPage.attributes.id).remove();
			}

			this.currentPage = page;

			var renderedPage = $('#' + page.attributes.id);
			
			//hide other pages
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
			renderedPage.show();
		},

	});

	var initialize = function(){
		window.app = new AppRouter;
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});
