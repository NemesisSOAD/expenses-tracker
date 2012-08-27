define([
	'jquery',
	'underscore',
	'backbone',
	'template!templates/header-view.html'
], function($, _, Backbone, viewTemplate) {

	var HeaderView = Backbone.View.extend({

		initialize: function () {
			this.template = _.template(viewTemplate);
			this.render();
		},

		render: function () {
			$(this.el).html(this.template());
			return this;
		},

		selectMenuItem: function (menuItem) {
			this.$('.nav li').removeClass('active');
			if (menuItem) {
				$('.' + menuItem).addClass('active');
			}
		}

	});

	return HeaderView;

});
