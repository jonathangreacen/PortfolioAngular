(function(angular){
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