define([
	'jquery',
	'underscore',
	'backbone',
	'template!templates/about-page.html'
], function($, _, Backbone, viewTemplate) {

	var AboutPage = Backbone.View.extend({

		tagName: 'div',

		attributes: {
			id: 'aboutPage'
		},

		initialize: function () {
			this.template = _.template(viewTemplate);
			this.render();
		},

		render: function () {
			$(this.el).html(this.template());
			return this;
		}
		
	});

	return AboutPage;

});
