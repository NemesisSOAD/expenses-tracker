describe('Model :: Expense', function() {
		
		beforeEach(function() {
			var that = this
				flag = false;

			require([
				'models/Expense',
				'utils'
			], function(Expense, utils) {
				that.expense = new Expense();
				that.utils = utils;

				flag = true;
			});

			waitsFor(function() {
				return flag;
			});
		});

		describe('when instantiated', function() {

			it('should have default attributes', function() {
				expect(this.expense.get('categoryId')).toEqual(this.utils.categoriesList[0].id);
				expect(this.expense.get('paid')).toEqual(false);
				expect(this.expense.get('cost')).toEqual(0);
				expect(this.expense.get('dateCreated').getTime()).toEqual(jasmine.any(Number));
			});

		});

});