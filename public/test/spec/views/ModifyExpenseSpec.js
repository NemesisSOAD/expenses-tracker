describe('View :: ExpenseDetailsView', function() {

	window.app = {
		backToPrevPage: function(){ }
	};

	beforeEach(function() {
		var done = false,
			isDone = function(){return done},
			self = this;

		require([
			'models/Expense',
			'models/Expenses',
			'views/ExpenseDetailsView',
			'backboneValidation',
			'bootstrap',
			'backboneValidationBootstrap',
			'memoryStorage'
		], function(Expense, Expenses, ExpenseDetailsView) {
			
			self.expenses = new Expenses();

			self.expenses.fetch({
				success: function(model, response){
					self.expense = self.expenses.first();
					self.detailsView = new ExpenseDetailsView({model: self.expense});
					
					$('#sandbox').append(self.detailsView.render().el);
					self.detailsView.showDialog();

					done = true;
				}
			});
		});

		waitsFor(isDone);
	});

	afterEach(function() {
		this.detailsView.remove(); 
	});

	describe('when save existing expense', function() {
		it('should display correct expense', function() {
			expect(this.detailsView.$('#name').val()).toEqual(this.expense.get('name'));
			expect(this.detailsView.$('#description').val()).toEqual(this.expense.get('description'));
			expect(parseInt(this.detailsView.$('#expenseId').val())).toEqual(this.expense.get('id'));
		});

		it('should modify expense', function() {
			var id = this.expense.id,
				newName = "XXX expense",
				newDescription = "XXXYYYY description";

			this.detailsView.$('#name')[0].value = newName;
			this.detailsView.$('#name').trigger('change');
			this.detailsView.$('#description')[0].value = newDescription;
			this.detailsView.$('#description').trigger('change');

			this.detailsView.$('.btn.save').trigger('click');

			var savedExpense = this.expenses.get(id);
			expect(savedExpense).toBeDefined();
			expect(savedExpense.get('name')).toEqual(newName);
			expect(savedExpense.get('description')).toEqual(newDescription);
		});

		it('should discard changes after clicking "close"', function() {
			var id = this.expense.id,
				newName = "YYY expense",
				newDescription = "XXXX description",
				oldName = this.expense.get('name'),
				oldDescription = this.expense.get('description');

			this.detailsView.$('#name')[0].value = newName;
			this.detailsView.$('#name').trigger('change');
			this.detailsView.$('#description')[0].value = newDescription;
			this.detailsView.$('#description').trigger('change');

			this.detailsView.$('button.close').trigger('click');

			var savedExpense = this.expenses.get(id);
			expect(savedExpense).toBeDefined();
			expect(savedExpense.get('name')).not.toEqual(newName);
			expect(savedExpense.get('name')).toEqual(oldName);
			expect(savedExpense.get('description')).not.toEqual(newDescription);
			expect(savedExpense.get('description')).toEqual(oldDescription);
		});
		
	});


});

