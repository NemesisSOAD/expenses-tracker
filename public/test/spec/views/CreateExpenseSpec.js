describe('View :: ExpenseDetailsView', function() {

	window.app = {
		backToPrevPage: function(){ }
	};

	beforeEach(function() {
		var done = false,
			isDone = function(){return done},
			that = this;

		require([
			'models/Expense',
			'views/ExpenseDetailsView', 
			'backboneValidation',
			'bootstrap',
			'backboneValidationBootstrap',
			'memoryStorage'
		], function(Expense, View) {
			that.expense = new Expense();
			that.view = new View({model: that.expense});
			
			$('#sandbox').html(that.view.render().el);
			that.view.showDialog();

			done = true;
		});

		waitsFor(isDone);
	});

	afterEach(function() {
		this.view.remove(); 
	});

	describe('Events Handler', function() {
		it('should fail to create empty expense', function() {
			var storeCount = store.findAll().length;

			this.view.$('.btn.save').trigger('click');

			expect(store.findAll().length).toEqual(storeCount);
		});

		it('should create expense on click "save"', function() {
			expect(this.view.model.get('id')).toEqual(null);

			var storeCount = store.findAll().length;

			this.view.$('#name')[0].value = "New expense";
			this.view.$('#name').trigger('change');
			this.view.$('#description')[0].value = "New description";
			this.view.$('#description').trigger('change');
			
			this.view.$('.btn.save').trigger('click');

			expect(this.view.model.get('id')).toEqual(jasmine.any(Number));
			expect(store.findAll().length).toEqual(storeCount + 1);
		});
		
	});


});

