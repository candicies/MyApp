define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
	'use strict';
  var projectsModel = Backbone.Model.extend({
  	rootUrl : '/share',
    defaults: {
      score: 10
    },
    initialize: function(){
    }

  });
  return projectsModel;

});
