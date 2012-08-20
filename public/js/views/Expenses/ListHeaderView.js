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

			paidFilters = ['Unpaid', 'Pain/Unpaid', 'Paid'];
			activePaidFilter = 1;

			this.render();
		},

		initializeTemplate: function(){
			$(this.el).html(this.template({
				paidFilters: paidFilters, 
				activeFilter: activePaidFilter
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
			this.trigger('paidFilterChanged', {target: target, filterId: $(target).data('filter-id')});
		},

		sortTable: function(event){
			
			var $rootElement = utils.ui.getRootElementByClassName(event, 'sort');

			var sortDirection = $rootElement.hasClass('asc');

			this.$tableHeader.find('i').removeClass();
			$rootElement.find('i').attr('class', 'icon-white ' + (sortDirection ? 'icon-chevron-down' : 'icon-chevron-up'));
		},

		searchInitiated: function(event){
			var target = event.srcElement ? event.srcElement : event.target;
			this.trigger('searchInitiated', {target: target, searchWord: $(target).val()});
		}
		
	});

	return ListHeaderView;

});
