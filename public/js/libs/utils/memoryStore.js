define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var memoryStore = {

		initialize : function(){
			// The in-memory Store. Encapsulates logic to access wine data.
			var store = {

				expenses: {},

				populate: function () {

					this.expenses[1] = {
						id: 1,
						name: "CHATEAU DE SAINT COSME",
						dateCreated: "2009",
						category: "Grenache / Syrah",
						description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
						cost: 678,
						paid: true
					};
					this.expenses[2] = {
						id: 2,
						name: "LAN RIOJA CRIANZA",
						dateCreated: "2006",
						category: "Tempranillo",
						description: "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.",
						cost: 345,
						paid: true
					};
					this.expenses[3] = {
						id: 3,
						name: "MARGERUM SYBARITE",
						dateCreated: "2010",
						category: "Sauvignon Blanc",
						description: "The cache of a fine Cabernet in ones wine cellar can now be replaced with a childishly playful wine bubbling over with tempting tastes of black cherry and licorice. This is a taste sure to transport you back in time.",
						cost: 2345,
						paid: true
					};
					this.expenses[4] = {
						id: 4,
						name: "OWEN ROE \"EX UMBRIS\"",
						dateCreated: "2009",
						category: "Syrah",
						description: "A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss this award-winning taste sensation.",
						cost: 345,
						paid: true
					};
					this.expenses[5] = {
						id: 5,
						name: "REX HILL",
						dateCreated: "2009",
						category: "Pinot Noir",
						description: "One cannot doubt that this will be the wine served at the Hollywood award shows, because it has undeniable star power. Be the first to catch the debut that everyone will be talking about tomorrow.",
						cost: 46,
						paid: true
					};
					this.expenses[6] = {
						id: 6,
						name: "VITICCIO CLASSICO RISERVA",
						dateCreated: "2007",
						category: "Sangiovese Merlot",
						description: "Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
						cost: 456,
						paid: true
					};
					this.expenses[7] = {
						id: 7,
						name: "CHATEAU LE DOYENNE",
						dateCreated: "2005",
						category: "Merlot",
						description: "Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
						cost: 456,
						paid: false
					};
					this.expenses[8] = {
						id: 8,
						name: "DOMAINE DU BOUSCAT",
						dateCreated: "2009",
						category: "Merlot",
						description: "The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.",
						cost: 56,
						paid: true
					};
					this.expenses[9] = {
						id: 9,
						name: "BLOCK NINE",
						dateCreated: "2009",
						category: "Pinot Noir",
						description: "With hints of ginger and spice, this wine makes an excellent complement to light appetizer and dessert fare for a holiday gathering.",
						cost: 56,
						paid: false
					};
					this.expenses[10] = {
						id: 10,
						name: "DOMAINE SERENE",
						dateCreated: "2007",
						category: "Pinot Noir",
						description: "Though subtle in its complexities, this wine is sure to please a wide range of enthusiasts. Notes of pomegranate will delight as the nutty finish completes the picture of a fine sipping experience.",
						cost: 56,
						paid: true
					};
					this.expenses[11] = {
						id: 11,
						name: "BODEGA LURTON",
						dateCreated: "2011",
						category: "Pinot Gris",
						description: "Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.",
						cost: 456,
						paid: false
					};
					this.expenses[12] = {
						id: 12,
						name: "LES MORIZOTTES",
						dateCreated: "2009",
						category: "Chardonnay",
						description: "Breaking the mold of the classics, this offering will surprise and undoubtedly get tongues wagging with the hints of coffee and tobacco in perfect alignment with more traditional notes. Sure to please the late-night crowd with the slight jolt of adrenaline it brings.",
						cost: 5,
						paid: true
					};
					this.expenses[13] = {
						id: 13,
						name: "ARGIANO NON CONFUNDITUR",
						dateCreated: "2009",
						category: "Cabernet Sauvignon",
						description: "Like a symphony, this cabernet has a wide range of notes that will delight the taste buds and linger in the mind.",
						cost: 456,
						paid: true
					};
					this.expenses[14] = {
						id: 14,
						name: "DINASTIA VIVANCO ",
						dateCreated: "2008",
						category: "Tempranillo",
						description: "Whether enjoying a fine cigar or a nicotine patch, don't pass up a taste of this hearty Rioja, both smooth and robust.",
						cost: 67,
						paid: false
					};
					this.expenses[15] = {
						id: 15,
						name: "PETALOS BIERZO",
						dateCreated: "2009",
						category: "Mencia",
						description: "For the first time, a blend of category from two different regions have been combined in an outrageous explosion of flavor that cannot be missed.",
						cost: 565,
						paid: true
					};
					this.expenses[16] = {
						id: 16,
						name: "SHAFER RED SHOULDER RANCH",
						dateCreated: "2009",
						category: "Chardonnay",
						description: "Keep an eye out for this winery in coming years, as their chardonnays have reached the peak of perfection.",
						cost: 546,
						paid: true
					};
					this.expenses[17] = {
						id: 17,
						name: "PONZI",
						dateCreated: "2010",
						category: "Pinot Gris",
						description: "For those who appreciate the simpler pleasures in life, this light pinot grigio will blend perfectly with a light meal or as an after dinner drink.",
						cost: 2,
						paid: false
					};
					this.expenses[18] = {
						id: 18,
						name: "HUGEL",
						dateCreated: "2010",
						category: "Pinot Gris",
						description: "Fresh as new buds on a spring vine, this dewy offering is the finest of the new generation of pinot grigios.  Enjoy it with a friend and a crown of flowers for the ultimate wine tasting experience.",
						cost: 4,
						paid: true
					};
					this.expenses[19] = {
						id: 19,
						name: "FOUR VINES MAVERICK",
						dateCreated: "2011",
						category: "Zinfandel",
						description: "o yourself a favor and have a bottle (or two) of this fine zinfandel on hand for your next romantic outing.  The only thing that can make this fine choice better is the company you share it with.",
						cost: 5,
						paid: true
					};
					this.expenses[20] = {
						id: 20,
						name: "QUIVIRA DRY CREEK VALLEY",
						dateCreated: "2009",
						category: "Zinfandel",
						description: "Rarely do you find a zinfandel this oakey from the Sonoma region. The vintners have gone to extremes to duplicate the classic flavors that brought high praise in the early '90s.",
						cost: 7,
						paid: true
					};
					this.expenses[21] = {
						id: 21,
						name: "CALERA 35TH ANNIVERSARY",
						dateCreated: "2010",
						category: "Pinot Noir",
						description: "Fruity and bouncy, with a hint of spice, this pinot noir is an excellent candidate for best newcomer from Napa this year.",
						cost: 7,
						paid: false
					};
					this.expenses[22] = {
						id: 22,
						name: "CHATEAU CARONNE STE GEMME",
						dateCreated: "2010",
						category: "Cabernet Sauvignon",
						description: "Find a sommelier with a taste for chocolate and he's guaranteed to have this cabernet on his must-have list.",
						cost: 6,
						paid: true
					};
					this.expenses[23] = {
						id: 23,
						name: "MOMO MARLBOROUGH",
						dateCreated: "2010",
						category: "Sauvignon Blanc",
						description: "Best served chilled with melon or a nice salty prosciutto, this sauvignon blanc is a staple in every Italian kitchen, if not on their wine list.  Request the best, and you just may get it.",
						cost: 7,
						paid: false
					};
					this.expenses[24] = {
						id: 24,
						name: "WATERBROOK",
						dateCreated: "2009",
						category: "Merlot",
						description: "Legend has it the gods didn't share their ambrosia with mere mortals.  This merlot may be the closest we've ever come to a taste of heaven.",
						cost: 5,
						paid: true
					};

					this.lastId = 24;
				},

				find: function (model) {
					return this.expenses[model.id];
				},

				findAll: function () {
					return _.values(this.expenses);
				},

				create: function (model) {
					this.lastId++;
					model.set('id', this.lastId);
					this.expenses[this.lastId] = model;
					return model;
				},

				update: function (model) {
					this.expenses[model.id] = model;
					return model;
				},

				destroy: function (model) {
					delete this.expenses[model.id];
					return model;
				}

			};

			store.populate();

			// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
			// with a simple in-memory approach.
			Backbone.sync = function (method, model, options) {

				var resp;

				switch (method) {
					case "read":
						resp = model.id ? store.find(model) : store.findAll();
						break;
					case "create":
						resp = store.create(model);
						break;
					case "update":
						resp = store.update(model);
						break;
					case "delete":
						resp = store.destroy(model);
						break;
				}

				if (resp) {
					options.success(resp);
				} else {
					options.error("Record not found");
				}
			};
		}
	};

	memoryStore.initialize();

});