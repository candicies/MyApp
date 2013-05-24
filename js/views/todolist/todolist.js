// Filename: views/projects/list
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/todo',
  'text!templates/todolist/todolist.html',
  'text!templates/todolist/list.html',
  'text!templates/todolist/footer.html',
  'common'
], function($, _, Backbone, TodoModel, todolistTemplate, listTemplate, footerTemplate, Common){
	'use strict';
  var TodoListView = Backbone.View.extend({
    
    el: "#page",
    
    
    
    events:{
    	'keypress #new-todo':'AddItem',
    	'click .destroy':'DeleteItem',
    	'click .toggle':'ToggleCompleted',
    	'click #toggle-all':'ToggleAll',
    	'click #clear-completed':'ClearCompleted',
    	'change #todo-list input':'Completed'
    },
    
    initialize: function(){
    	console.log("TodoListView Create");
    	this.model = new TodoModel();

    },

    render: function(){
      	this.$el.html( todolistTemplate ); //load main todolist Template
      	this.input = this.$('#new-todo'); 
      	this.ul = this.$('#todo-list');
      	this.footer = this.$('footer');
    },
    
    AddItem: function( e ){		
		//enter list if enter 
		if ( e.which !== Common.ENTER_KEY || !this.input.val().trim() ) {
			return;
		}
		this.footer.html( footerTemplate );	//load footerTemplate if enter list			
		this.model.set('list',this.input.val());//get nput value and set it to model		
		this.input.val(''); //clear input value after enter it	
		//show <ul> and toggle-all checkbox
		this.ul.show();
		this.$('#toggle-all').show();  
		
		//add items to dotolist
		this.ul.append('<li><input class="toggle test" type="checkbox"><label class=" ">'+ 
			this.model.get('list') +
			'</label><button id="del_btn" class="destroy">Delete</button></li>');
			
		//count remaining unchecked items
		this.CountLength();
	
    },
    
    DeleteItem: function( e, target){
    	this.$(e.target).parent('li').remove();
    	this.CountLength(); //count items left
    	this.ToggleCompleted(); //count checked items
    },
    
    CountLength: function(){  	
		// count remaining unchecked items
		var num = (this.$('#todo-list input').length)-(this.$('#todo-list input:checked').length);
    	this.model.set('remaining',num); //set value to model
    	//show remaining numbers
    	this.$('span#todo-count strong')
    		.html(this.model.get('remaining'));
    	//hide toggle-all checkbox if no items
    	if (this.$('#todo-list li').length ===0){
    		this.$('#toggle-all').hide();
    	} 	
    	return ;
    },
    
    ToggleCompleted: function( e, target){
    	// count completed items
    	this.model.set('completed',this.$('#todo-list input:checked').length);
    	//show completed numbers
    	this.$('button#clear-completed')
    		.html("Clear completed ("+this.model.get('completed')+")");		
 		this.CountLength(); //count items left
    	return;
    },
    
    ClearCompleted: function(){
    	//clear Completed items
    	this.$('.toggle:checked').parent('li').remove();
    	this.CountLength(); //count items left
    	this.ToggleCompleted(); //count checked items
    },
    
    ToggleAll: function(){
    	//toggle all checkboxes
    	if (this.$('#toggle-all').prop('checked')) {
    		this.$('.toggle').attr('checked','checked');
    		this.$('span#todo-count strong').html(0); 	
    	}
    	else{
    		this.$('.toggle').removeAttr('checked');
    		this.$('span#todo-count strong')
    		.html(this.$('#todo-list input').length);		
    	}
    	//add completed line if checked items
    	var self = this;
 		this.$('#toggle-all').change(function(){
 			
    		self.$('.toggle').parent('li').find('label').toggleClass("completed", this.checked);
    	});
    	
    	this.ToggleCompleted(); //count checked items 	   	
    },
    
    Completed: function(e, target){
    	//add completed line if checked items
    	try{
 			$(e.target).parent('li').find('label').toggleClass("completed", this.checked);
    	}catch(err){
    		console.log(e);
    	}
    }
    
  });
  return new TodoListView();
});
