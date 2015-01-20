(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'projects';
 
		module.directive('projects', ['$window', 'AppContent', 'Constants', function($window, AppContent, Constants){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					
					$scope.projects = [];

					AppContent.getContentForView(VIEW_NAME).then(bindProjectData);

					function bindProjectData(data){
						$scope.projectsData = data;
					};

					this.addProject = function(project){
						$scope.projects.push(project);
					};
					
				},
				link:function(scope, $element){
					scope.state = {};
					scope.state.currentFocusedProject;
					angular.element($window).on('scroll', highlightCurrentProject.bind(this));

					function highlightCurrentProject(){
						var projects = scope.projects,
							t = projects.length,
							i = 0,
							project,
							projectY,
							midPoint = $window.innerHeight / 2,
							_winY = $window.pageYOffset,
							currentFocusedProject = scope.state.currentFocusedProject;

						for(i; i<t; i++){
							project = projects[i];
							projectY = project.element.offsetTop;

							if(currentFocusedProject !== project && midPoint > projectY - _winY && midPoint < projectY + parseInt(project.element.offsetHeight, 10) - _winY){
								if(currentFocusedProject) {
									angular.element(currentFocusedProject.element).scope().stopImagePreview();
								}
								scope.state.currentFocusedProject = project;
								angular.element(project.element).scope().startImagePreview();
								scope.$apply();
								break;
							}
						}
					}
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
				controller:function($scope){
					this.setImagePreview = function(imagePreview){
						$scope.imagePreview = imagePreview;
					}
				},
				link:function(scope, $element, attrs, controller){
					controller.addProject({element:$element[0], data:scope.project});
				}
			}
		}]);

}(angular));