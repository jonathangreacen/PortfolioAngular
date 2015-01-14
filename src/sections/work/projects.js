(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'projects';
 
		module.directive('projects', ['$window', 'AppContent', 'Constants', function($window, AppContent, Constants){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					AppContent.getContentForView(VIEW_NAME).then(bindProjectData);

					function bindProjectData(data){
						$scope.projectsData = data;
					};

					this.addProject = function(ele){
						//console.log('addProject()', ele);
					};
				},
				link:function(scope, element, attrs){

				}
			}
		}]);

		module.directive("project", [function(){
			return{
				restrict:'A',
				scope:true,
				transclude:true,
				replace:true,
				templateUrl:'../src/sections/work/project.tpl.html',
				require:'^projects',
				link:function(scope, element, attrs, controller){
					controller.addProject(element);
				}
			}
		}]);

}(angular));