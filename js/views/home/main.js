// Filename: views/home/main
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/home/main.html'
], function($, _, Backbone, mainHomeTemplate){
	'use strict';
  var MainHomeView = Backbone.View.extend({
    el: "#page",
    render: function(){
      this.$el.html(mainHomeTemplate);
      this.bindView();
      this.test();
    },
    test:function(){
    	var str = '/share/Multimedia/TV/Record/201209032000_DiMo.ts', ary, path="";
    	ary = str.split('/');
    	if(ary[1]==='share'){
    		ary.shift();
    		ary.shift();
    	}
    	_.each(ary, function(cell){
    		path +="/"+cell;
    	});
    	console.log('ary[0] : '+ary[0]);
    	console.log('ary[1] : '+ary[1]);
    	console.log('ary[2] : '+ary[2]);
    	console.log('path : '+path);
    },
    bindView:function(){
    	$('#localimg').off();
    	$('#remoteimg').off();
    	
    	$('#localimg').on('click', function(){
    		var path = 'img/test_and_meas.gif';
    		$('img#testimg').attr('src', path);
    		$('img#testimg').off();
    		$('img#testimg').load(function() {
				        	console.log('image loaded.');
				   		});
			$('img#testimg').error(function() { 
							console.log("error loading image"); 
						});
    	});
    	
    	$('#remoteimg').on('click', function(){
    		var path = $('#srcpath').val().trim();
    		$('img#testimg').attr('src', path);
    		$('img#testimg').off();
    		$('img#testimg').load(function() {
				        	console.log('image loaded.');
				   		});
			$('img#testimg').error(function() { 
							console.log("error loading image"); 
						});
    	});
    }
  });
  return new MainHomeView();
});
