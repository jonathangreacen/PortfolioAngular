(function(angular){
	'use strict';
	angular.module('workshop.portfolio').config(Routes);

	function Routes($locationProvider, $routeProvider){
		$routeProvider.when('/work', {
			templateUrl:'src/work/projects.tpl.html'
		})
		.when('/about', {
			templateUrl:'src/about/about.tpl.html'
		})
		.when('/', {
			templateUrl:'src/work/projects.tpl.html'
		})
		.otherwise({redirectTo:'/'});
	};

}(angular));