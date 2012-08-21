define([
	'jquery',
	'underscore',
	'backbone',
	'template!templates/Expenses/list-header.html',
	'utils'
], function($, _, Backbone, viewTemplate, utils) {

	var ListHeaderView = Backbone.View.extend({

		tagName: 'div',

		attributes: {
			class: 'row'
		},

		initialize: function () {
			this.template = _.template(viewTemplate);

			this.paidFilters = ['Unpaid', 'Pain/Unpaid', 'Paid'];
			this.activePaidFilter = 1;
			this.activeSearchWord = '';

			this.render();
		},

		initializeTemplate: function(){
			$(this.el).html(this.template({
				paidFilters: this.paidFilters, 
				activeFilter: this.activePaidFilter,
				activeSearchWord: this.activeSearchWord
			}));

			this.$tableHeader = this.$('#tableHeader');
		},

		render: function () {
			var self = this;

			!this.$el.html() && this.initializeTemplate();

			this.delegateEvents();
			return this;
		},

		events: {
			'click #paidFilter .btn':		'paidFilterChanged',
			'click .sort':          		'sortTable',
			'keyup .fuzzy-search':			'searchInitiated'
		},


		paidFilterChanged: function(event){
			var target = event.srcElement || event.target;
			this.activePaidFilter = $(target).data('filter-id');
			this.trigger('paidFilterChanged', {target: target, filterId: this.activePaidFilter});
		},

		sortTable: function(event){
			
			var $rootElement = utils.ui.getRootElementByClassName(event, 'sort');

			var sortDirection = $rootElement.hasClass('asc');

			this.$tableHeader.find('i').removeClass();
			$rootElement.find('i').attr('class', 'icon-white ' + (sortDirection ? 'icon-chevron-down' : 'icon-chevron-up'));
		},

		searchInitiated: function(event){
			var target = event.srcElement ? event.srcElement : event.target;
			this.activeSearchWord = $(target).val();
			this.trigger('searchInitiated', {target: target, searchWord: this.activeSearchWord});
		}
		
	});

	return ListHeaderView;

});
