define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
	'use strict';
  var todoModel = Backbone.Model.extend({
    defaults: {
		list: 'N/A',
      	remaining: '0',
      	completed:'0'
    },
    initialize: function(){
    },

  });
  return todoModel;

});
