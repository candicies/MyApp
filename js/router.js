// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/home/main',
  'views/projects/list',
  'views/users/list',
  'views/test/test',
  'views/todolist/todolist'
], function($, _, Backbone, mainHomeView, projectListView, userListView,  testView, todolistView){
	'use strict';
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showUsers',
	  'test': 'showTest',
	  'todolist': 'showTodolist',
      // Default
      '*actions': 'defaultAction'
    },
    showProjects: function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      projectListView.render();
    },
      // As above, call render on our loaded module
      // 'views/users/list'
    showUsers: function(){
      userListView.render();
    },
    showTest: function(){
      testView.render();
    },
    showTodolist: function(){
      todolistView.render();
    },
    
    defaultAction: function(actions){
      // We have no matching route, lets display the home page
      mainHomeView.render();
    }
  }), 
  
  	initialize = function(){
    	var app_router = new AppRouter();
    	Backbone.history.start();
    };
    
  return {
    initialize: initialize
  };
  
});
