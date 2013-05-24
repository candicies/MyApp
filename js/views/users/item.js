// Filename: views/projects/list
define([ 'jQuery', 'Underscore', 'Backbone', 'models/item'], function($, _, Backbone, itemModel){
	'use strict';
	var ItemView = Backbone.View.extend({
		
		tagName: 'li',	//name of root tag in this.el
    
	    initialize: function(){
	    	_.bindAll(this, 'render');
	    	this.model = new itemModel();
	    },
	    
	    render: function(){
	      this.$el.html('<span>'+ this.model.get('part1') + ' ' + this.model.get('part2') +'</span>');
	      return this;	//for chainable calls, like .render().el
	    }
  });
  //return new ItemView();
});
