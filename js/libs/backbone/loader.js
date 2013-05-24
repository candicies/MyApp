define([ 'order!libs/jquery/jquery-1.7.2.min',
		'order!libs/underscore/underscore-min',
		'order!libs/backbone/backbone-min',
		'order!libs/backbone/backbone.super',
		'order!libs/backbone/backbone.validations',
		'order!libs/backbone/backbone.filter',
		'order!libs/underscore/underscore.string.min',
		'order!libs/jquery/loader',
		'order!libs/bootstrap/loader'],
		function() {
			
			// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
			_.str = require('underscore.string');
		
			// Mix in non-conflict functions to Underscore namespace if you want
			_.mixin(_.str.exports());
		
			// All functions, include conflict, will be available through _.str object
			_.str.include('Underscore.string', 'string'); // => true
			return {
				Backbone : Backbone.noConflict(),
				_ : _.noConflict(),
				$ : jQuery.noConflict()
			};
		});