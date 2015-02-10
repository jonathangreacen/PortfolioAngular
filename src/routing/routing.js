(function(angular){
	'use strict';
	angular.module('workshop.portfolio').config(Routes);

	function Routes($locationProvider, $routeProvider){
		$routeProvider.when('/work', {
			templateUrl:'src/sections/work/projects.tpl.html'
		})
		.when('/about', {
			templateUrl:'src/sections/about/about.tpl.html'
		})
		.when('/code', {
			templateUrl:'src/sections/code/code.tpl.html'
		})		
		.when('/contact', {
			templateUrl:'src/sections/contact/contact.tpl.html'
		})		
		.when('/', {
			templateUrl:'src/sections/work/projects.tpl.html'
		})
		.otherwise({redirectTo:'/'}); 
	};

}(angular));