define(['jQuery', 'Underscore', 'Backbone', 'models/item'], function($, _, Backbone, itemModel){
	'use strict';
	
  var ListCollection = Backbone.Collection.extend({
  	model: itemModel
  });

  return ListCollection;
});
