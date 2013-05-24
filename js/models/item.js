define([ 'Underscore', 'Backbone'], function(_, Backbone) {
	'use strict';
  
  var usersModel = Backbone.Model.extend({  
    defaults:{
	    part1: 'hello',
     	part2: 'world'
    }
  });	
  return usersModel;

});
