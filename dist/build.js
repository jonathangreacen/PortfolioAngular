//Base application
(function(angular){
	var module = angular.module('workshop.portfolio', ['ngRoute']);	
	console.log("module:", module)
}(angular));(function(angular){
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

}(angular));;(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio');

		module.directive('projects', [function(){
			return {
				restrict:'EA',
				scope:true,
				controller:function($scope){
					$scope.projectsData = [1,2,3,4];

					this.addProject = function(ele){
						console.log('addProject()', ele);
					};
				},
				link:function(scope, element, attrs){

				}
			}
		}]);

		module.directive("project", [function(){
			return{
				restrict:'EA',
				scope:true,
				transclude:true,
				replace:true,
				templateUrl:'../src/work/project.tpl.html',
				require:'^projects',
				link:function(scope, element, attrs, controller){
					controller.addProject(element);
				}
			}
		}])
}(angular))