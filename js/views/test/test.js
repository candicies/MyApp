 // Filename: views/projects/list
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/test',
  'text!templates/test/test.html'
], function($, _, Backbone, TestModel, testTemplate){
	'use strict';
  var UserListView = Backbone.View.extend({
  	
    el: "#page",
    events : {
			"click input#update" : "updateData",
			"click input#restore" : "restoreData"
	},
    initialize: function(){
    	this.model = new TestModel();
    },
    render: function(){
      this.$el.html( testTemplate );
      this.initView();
      this.bindView();
    },
    initView:function(){
    	$('span#action').html('action : Initialized');
    	$('span#rootUrl').html('rootUrl : '+this.model.rootUrl);
    	$('span#score').html('score : '+this.model.get('score'));
    },
    bindView:function(){
    	$('#bindtest').off();
    	
    	$('#bindtest').on('click', function(){
    		alert('Hello World!');
    	});
    },
    updateData:function(){
    	console.log('update data!');
    	this.model.rootUrl = "/public/photos";
    	this.model.set('score', 76);
    	$('span#action').html('action : Update Data');
    	//$('span#rootUrl').html('rootUrl : '+this.model.get('rootUrl'));
    	$('span#rootUrl').html('rootUrl : '+this.model.rootUrl);
    	$('span#score').html('score : '+this.model.get('score'));
    },
    restoreData:function(){
    	console.log('restore data!');
    	this.model.rootUrl = "/share";
    	this.model.set('score', 10);
    	$('span#action').html('action : Restore Data');
    	$('span#rootUrl').html('rootUrl : '+this.model.rootUrl);
    	$('span#score').html('score : '+this.model.get('score'));
    }
  });
  return new UserListView();
});
