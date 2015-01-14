(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.directive('navigation', ['Constants', Navigation]);

	function Navigation(Constants){
		return {
			restrict:'A',
			scope:{},
			templateUrl:'../src/nav/nav.tpl.html',
			replace:true,
			link:function(scope, element, attributes){
				scope.navSections = Constants.SECTIONS;
			}
		}
	};

}(angular));