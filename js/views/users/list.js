// Filename: views/projects/list
define(['jQuery', 'Underscore', 'Backbone', 'collections/list', 'models/item', 'views/users/item', 'text!templates/users/list.html' ], function($, _, Backbone, listCollection, itemModel, itemView, userListTemplate){
	'use strict';
	
	var UserListView = Backbone.View.extend({
    
	    el: "#page",
	    
	    events: {
	    	"click button#add": "addItem"	
	    },
	    
	    temp : null,
	    
	    stooge : null,
	    
	    initialize : function(){	
	    	_.bindAll(this, 'render', 'addItem', 'appendItem');
	    	
	    	this.collection = new listCollection();
	    	this.collection.bind('add', this.appendItem);
	    	
	    	this.counter = 0;
	    	
	    	this.temp = ['1', '2', '3'];
	    	this.stooge = {
		    	flight : 1,
		    	nickName : 'Moe',
		    	firstName : 'Harry'
		    }
	    },
	            
	    render : function(){
	    	var self = this;
	    	this.$el.html(userListTemplate);
	    	this.$el.append('<ul></ul>');
	    	_.each(this.collection.models, function(item){
	    		console.log(item);
	    		self.appendItem(item);
	    	}, this);
	    	
	    	console.log(this.collection.models);
	    },
	    
	    addItem : function(){
	    	var newone = this.$('#name-field').val(), self = this, item = new itemModel(); 
	    	this.counter++;
	    	
	    	item.set({
	    		part2 : item.get('part2') + this.counter
	    	});
	    	this.collection.add(item);
	    	/*
	    	this.$('#triggerAddEvent').addClass('disabled');
    		this.temp.push(newone);	// import the new data
    		
    		this.$("#container").html(newone);
	    	this.$('#user-form').find(':input').val("");	//remove input value
	    	this.applyInvocFunc();
	    	//$.log(this.stooge);
	    	*/
	    }, 
	    
	    appendItem : function(item) {
	    	var itemView = new itemView({
	    		model : item
	    	});
	    	$('ul', this.el).append(itemView.render().el);
	    	
	    },  	 
	    
	    enumerFunc : function(){
	    	var name;
	    	for(name in this.stooge){
	    		if(this.stooge.hasOwnProperty(name)){
	    			$.log(name + ": " + this.stooge[name]);
	    		}
	    		if(typeof this.stooge[name] ==='number') {
	    			$.log(name + ": " + this.stooge[name]);
	    		}
	    		if(typeof this.stooge[name] ==='string') {
	    			$.log(name + ": " + this.stooge[name]);
	    		}
	    	}
	    	this.$('#triggerAddEvent').removeClass('disabled');
		},
		
		functionTest : function(args) {
			var anonymous = function (a, b) {
				return a + b;
			}, nonAnonymous = function test (a , b) {
				return a + b;
			}, test = this.methodInvocFunc(1, 3);
			
			$.log('function invocation: ' + test);	//non=anonymous
			$.log(anonymous);
			$.log(nonAnonymous);
			
			this.$('#triggerAddEvent').removeClass('disabled');
		},
		
		methodInvocFunc : function methodInvocFunc(a, b) {
			//執行遞增計算的方法, 如果引數不是數值，則使用預設值1 
			var myObject = {
				value: 0,
				increment: function (inc) {
					$.log(this);
					this.value += typeof inc === 'number' ? inc : 1;
				}
			};
			
			myObject.increment(3);
			$.log('value : ' + myObject.value);
			this.$('#triggerAddEvent').removeClass('disabled');
			
			return a+b;
		},
		
		functionInvocFunc : function() {
			
			this.$('#triggerAddEvent').removeClass('disabled');
		},
		
		constructorInvocFunc : function() {
			// 物件可以直接繼承其他物件的特性
			var Quo = function (string) {
				this.status = string;
			};
			
			Quo.prototype.get_status = function () {
				$.log(this);
				return this.status;
			};
			
			var myQuo = new Quo("confused");
			$.log(myQuo.get_status());
			
			this.$('#triggerAddEvent').removeClass('disabled');
		},
		
		applyInvocFunc : function() {
			//引數陣列：制作一個包含兩個數字的陣列,將其相加
			var array = [3, 4], add = function(a, b) {
				return a + b;
			}, sum;
			
			sum = add.apply(null, array);
			$.log(sum);
			
			this.$('#triggerAddEvent').removeClass('disabled');
		},
		
		removeDisabled : function() {
			this.$('#triggerAddEvent').removeClass('disabled');
		}
		
		
    
  });  
  
  
  return new UserListView();
});
