define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	var utils = {};
	
	//frequently used elems added to cache $elems
	utils.ui = {
		$elems: {
			header:						$('.header'),
			content: 					$('#content'),
			spinner: 					$('#loading'),
		},
		hideLoading: function(){
			this.$elems.spinner.hide();
		},
		showLoading: function(){
			this.$elems.spinner.show();
		},
		getRootElementByClassName: function(event, className){
			var $rootElement;
			function GetRootElement(el){
				$rootElement = el;
			};

			var $srcElem = event.srcElement? $(event.srcElement) : $(event.target);
			
			//detect root element
			$srcElem.hasClass(className) && GetRootElement($srcElem) ||
			$srcElem.closest('.'+className)[0] && GetRootElement($srcElem.closest('.'+className).first());

			return $rootElement;
		}
	};

	utils.messages = {

	};

	utils.consts = {
		numberOfListRows:	10,
		searchThreshold:	0.4
	};

	utils.data = {
		parseExpense: function(response, xhr){
			var isBakboneModel = response instanceof Backbone.Model,
				expense = response;

			SetProperyValue('id', GetProperyValue('_id'));

			var selectedCategory = _(utils.categoriesList).find(function(item, index){ 
				return item.id == GetProperyValue('categoryId');
			});

			if (selectedCategory)
				SetProperyValue('categoryName', selectedCategory.Title);

			SetProperyValue('dateCreated', new Date(Date.parse(GetProperyValue('dateCreated'))));
			SetProperyValue('dateCreatedFormat', new Date(Date.parse(GetProperyValue('dateCreated'))).format('l, F j, Y'));

			function SetProperyValue(propertyName, value){
				if (isBakboneModel){
					expense.set(propertyName, value)
				}
				else expense[propertyName] = value;
			};

			function GetProperyValue(propertyName){
				return isBakboneModel ? expense.get(propertyName) : expense[propertyName];
			};

			return expense;
		},

		parseExpenses: function(response, xhr){

			//add numbers to models
			for (var i = 1; i < response.length + 1; i++) {
				response[i-1]['number'] = i;
			};

			return response;
		},

		parseModelPropery: function(model, event){
			var target = event.srcElement || event.target,

				propertyName = target.name,
				propertyValue = target.value,

				modelValue = model.get(propertyName),

				result = {};

			switch(typeof modelValue){
				case 'undefined':
					break;
				case 'object':
					if (modelValue instanceof Date){
						propertyValue = new Date(Date.parse(propertyValue));
					}
					break;
				case 'boolean':
					propertyValue = target.hasOwnProperty('checked') ? target.checked : JSON.parse(propertyValue);
					break;
				case 'number':
					propertyValue = parseFloat(propertyValue);
					break;
				case 'string':
					if (!isNaN(Date.parse(modelValue))){
						propertyValue = Date.parse(propertyValue);
					}
					break;
			}

			result[propertyName] = propertyValue;

			return result;
		}
	};

	utils.categoriesList = [
			{id: 1, Title: 'Food'},
			{id: 2, Title: 'Girls'},
			{id: 3, Title: 'Moto'},
			{id: 4, Title: 'Transport'},
			{id: 5, Title: 'Cafe'},
			{id: 6, Title: 'Gifts'},
			{id: 7, Title: 'Clothing'},
			{id: 8, Title: 'Internet'},
			{id: 9, Title: 'Sport'}
			];

/*----------------------------------COMMON------------------------------------*/
	//Date formatting
	Date.prototype.format = function(format) {
		var returnStr = '';
		var replace = Date.replaceChars;
		for (var i = 0; i < format.length; i++) {       var curChar = format.charAt(i);         if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
				returnStr += curChar;
			}
			else if (replace[curChar]) {
				returnStr += replace[curChar].call(this);
			} else if (curChar != "\\"){
				returnStr += curChar;
			}
		}
		return returnStr;
	};

	Date.replaceChars = {
		shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

		// Day
		d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
		D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
		j: function() { return this.getDate(); },
		l: function() { return Date.replaceChars.longDays[this.getDay()]; },
		N: function() { return this.getDay() + 1; },
		S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
		w: function() { return this.getDay(); },
		z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
		// Week
		W: function() { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
		// Month
		F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
		m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
		M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
		n: function() { return this.getMonth() + 1; },
		t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
		// Year
		L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
		o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
		Y: function() { return this.getFullYear(); },
		y: function() { return ('' + this.getFullYear()).substr(2); },
		// Time
		a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
		A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
		B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
		g: function() { return this.getHours() % 12 || 12; },
		G: function() { return this.getHours(); },
		h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
		H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
		i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
		s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
		u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
	'0' : '')) + m; },
		// Timezone
		e: function() { return "Not Yet Supported"; },
		I: function() { return "Not Yet Supported"; },
		O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
		P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
		T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;},
		Z: function() { return -this.getTimezoneOffset() * 60; },
		// Full Date/Time
		c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
		r: function() { return this.toString(); },
		U: function() { return this.getTime() / 1000; }
	};

	return utils;
});
