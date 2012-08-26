describe('Model :: Expense', function() {
		
		beforeEach(function() {
			var that = this
				done = false;

			require([
				'models/Expense',
				'utils',
				'backboneValidation',
				'memoryStorage'
			], function(Expense, utils) {
				that.Expense = Expense;
				that.expense = new Expense();
				that.utils = utils;

				Backbone.Validation.configure({
					forceUpdate: true
				});
				_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

				done = true;
			});

			waitsFor(function() {
				return done;
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

		describe('when saving', function(){

			beforeEach(function() {
				this.eventSpy = sinon.spy();
				this.done = false;
				this.isDone = function(){return done};
			});

			it('should be invalid when name and description are empty', function() {

				var self = this;

				this.expense.on('validated', this.eventSpy);

				this.expense.isValid(true);

				this.expense.on('validated', function(isValid, model, errors){
					
					expect(self.eventSpy).toHaveBeenCalledOnce();
					expect(self.eventSpy).toHaveBeenCalledWith(
						false,
						self.expense,
						{
							name:			'Name is required',
							description:	'Please provide description (10 symbols at least)' 
						}
					);
					self.done = true;
				});

				waitsFor(this.isDone);
			});

			it('should be valid when name and description are not empty', function() {

				var self = this;

				this.expense.on('validated:valid', this.eventSpy);

				this.expense.set({
					name:			'Name',
					description:	'NotEmptyDescription'
				});

				this.expense.on('validated:valid', function(model){
					
					expect(self.eventSpy).toHaveBeenCalledOnce();
					expect(self.eventSpy).toHaveBeenCalledWith(self.expense);
					self.done = true;
				});

				waitsFor(this.isDone);
			});
		});

});