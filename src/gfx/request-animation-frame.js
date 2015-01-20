(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.factory('requestAnimationFrame', [RAF]);

	function RAF(){		
		return window.requestAnimationFrame    ||
		    window.webkitRequestAnimationFrame ||
		    window.mozRequestAnimationFrame    ||
		    window.oRequestAnimationFrame      ||
		    window.msRequestAnimationFrame     ||
		    function(callback, element){
		      window.setTimeout(callback, 1000 / 60);
		    };
	}

}(angular));