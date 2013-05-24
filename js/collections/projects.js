define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/projects'
], function($, _, Backbone, projectsModel){
	'use strict';
  var ProjectsCollection = Backbone.Collection.extend({
    model: projectsModel,
    initialize: function(){

    }

  });

  return new ProjectsCollection();
});
