// Filename: views/projects/list
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'collections/projects', 
	'text!templates/projects/list.html'], 
function($, _, Backbone, projectsCollection, projectListTemplate) {
	
	'use strict';
	
	var ProjectListView = Backbone.View.extend({
		el : "#page",
		initialize : function() {
			this.collection = projectsCollection;
			this.collection.bind("add", this.exampleBind);
			this.collection = projectsCollection.add({
				name : "Twitter"
			});
			this.collection = projectsCollection.add({
				name : "Facebook"
			});
			this.collection = projectsCollection.add({
				name : "Myspace",
				score : 20
			});
		},
		exampleBind : function(model) {
			//console.log(model);
		},
		render : function() {
			var data = {
				projects : this.collection.models,
				_ : _
			}, compiledTemplate = _.template(projectListTemplate, data);
			this.$el.html(compiledTemplate);
		}
	});
	return new ProjectListView();
});
