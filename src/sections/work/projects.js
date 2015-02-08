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
					angular.element($window).on('scroll', highlightCurrentProject);

					highlightCurrentProject();
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
							projectY = project.$element[0].offsetTop;

							if(currentFocusedProject !== project && midPoint > projectY - _winY && 
									midPoint < projectY + parseInt(project.$element[0].offsetHeight, 10) - _winY){

								if(currentFocusedProject) {
									currentFocusedProject.deactivate();
								}
								scope.state.currentFocusedProject = project;
								project.activate();
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
				controller:function($scope, $element){
					$scope.imagePreview;

					this.setImagePreview = function(imagePreview){
						$scope.imagePreview = imagePreview;
					}

					$scope.activate = function(){
						$element.addClass('active')
						this.imagePreview.start();
					}
					$scope.deactivate = function(){
						$element.removeClass('active')
						this.imagePreview.stop();
					}

				},
				link:function(scope, $element, attrs, controller){
					scope.$element = $element;
					controller.addProject(scope);
				}
			}
		}]);

}(angular));