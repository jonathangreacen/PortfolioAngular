(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.directive('gfx', ['Constants', GFX]);

	function GFX(Constants){
		return {
			restrict:'A',
			scope:{},
			replace:true,
			link:function(scope, element, attributes){
				
			}
		}
	};

}(angular));