define([
	'jquery',
	'underscore',
	'backbone',
	'collections/Expenses',
	'views/Expenses/ListHeaderView',
	'template!templates/Expenses/expense-item.html',
	'template!templates/Expenses/expenses-page.html',
	'utils'
], function($, _, Backbone, Expenses, ListHeaderView, expenseTemplate, viewTemplate, utils) {

	var ExpensesPage = Backbone.View.extend({

		tagName: 'div',

		attributes: {
			id: 'expensesPage'
		},

		isCacheable: true,

		initialize: function () {
			this.template = _.template(viewTemplate);

			this.expenses = new Expenses();

			this.listHeaderView = new ListHeaderView();

			this.listHeaderView.bind('paidFilterChanged', this.runPaidfilter, this);
			this.listHeaderView.bind('searchInitiated', this.runFuzzySearch, this);
		},

		initializeTemplate: function(){
			$(this.el).html(this.template({
				paidFilters: paidFilters, 
				activeFilter: activePaidFilter
			}));

			$expensesTable = this.$('#expenses');
			$expenses = $expensesTable.find('.list');
			$totalCost = this.$('#totalCost');

			//draw header with filters
			$expensesTable.prepend(this.listHeaderView.render().el);
		},

		render: function () {
			var self = this;

			!this.$el.html() && this.initializeTemplate();

			!this.expenses.models.length && this.expenses.fetch({
				success: function(model, response){
					
					setTimeout(function(){
						self.renderList(model.models);
					},0);
				}
			});

			this.listHeaderView.delegateEvents();
			this.delegateEvents();

			return this;
		},

		renderList: function(models){
			var self = this;
			
			var listValues = _(models).map(function(item, index){ return item.toJSON(); });

			if (!this.sortedList){
				var pagingOptions = {
					name: "paging",
					innerWindow: 2,
					outerWindow: 2
				};

				var fuzzyOptions = {
					searchClass: "fuzzy-search",
					location: 0,
					distance: 100,
					threshold: 0.4,
					multiSearch: true
				};

				var options = {
					item: expenseTemplate,
					page: 10,
					asc: true,
					plugins: [
						['paging', pagingOptions],
						['fuzzySearch', fuzzyOptions]
					]
				};

				this.sortedList = new List($expensesTable[0], options, listValues);
			}
			else{
				this.sortedList.clear();
				this.sortedList.add(listValues);
				this.sortedList.update();
			}

			this.calculateTotalCost();
			this.sortedList.on('updated', function() { self.calculateTotalCost()});
		},

		events: {
			'click .list input:checkbox':	'handlePaidClick'
		},

		handlePaidClick: function(){
			return false;
		},

		runPaidfilter: function(args){

			switch(args.filterId){
				case 0:
					this.sortedList.filter(function(item){ return !JSON.parse(item.values().paid)});
					break;
				case 1:
				default:
					this.sortedList.filter();
					break;
				case 2:
					this.sortedList.filter(function(item){ return JSON.parse(item.values().paid)});
					break;
			}

		},

		runFuzzySearch: function(args){
			this.sortedList.fuzzySearch(args.searchWord);
		},

		calculateTotalCost: function(){
			var totalCost =  _(this.sortedList.matchingItems).reduce(reduceFunc, 0);
			$totalCost.text('$' + totalCost);

			function reduceFunc(sum, item){ 
				return sum + item.values().cost 
			};
		}
		
	});

	return ExpensesPage;

});
