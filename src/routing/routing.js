(function(angular){
	'use strict';
	angular.module('workshop.portfolio').config(Routes);

	function Routes($locationProvider, $routeProvider){
		$routeProvider.when('/work', {
			templateUrl:'projects.tpl.html'
		})
		.when('/about', {
			templateUrl:'about.tpl.html'
		})
		.when('/code', {
			templateUrl:'code.tpl.html'
		})		
		.when('/contact', {
			templateUrl:'contact.tpl.html'
		})
		.otherwise({redirectTo:'/work'}); 
	};

}(angular));