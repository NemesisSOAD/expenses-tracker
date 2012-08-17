define([
	'jquery',
	'underscore',
	'backbone',
	'template!templates/header.html'
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

		events: {
			'click ul.nav li a':          'selectMenuItem'
		},

		selectMenuItem: function (event) {
			var parent = this.$(event.srcElement).closest('li');
			
			if (!parent.hasClass('dropdown')){
				this.$('.nav li').removeClass('active');
				parent.addClass('active');
			}
		}

	});

	return HeaderView;

});
