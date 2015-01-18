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
					scope.currentFocusedProject;//needs containing object for faster bindings
					$window.addEventListener('scroll', highlightCurrentProject.bind(this));
					
					function highlightCurrentProject(){
						var projects = scope.projects,
							t = projects.length,
							i = 0,
							project,
							projectY,
							midPoint = $window.innerHeight / 2,
							_winY = $window.pageYOffset;

						for(i; i<t; i++){
							project = projects[i];
							projectY = project.element.offsetTop;

							if(scope.currentFocusedProject !== project.data && midPoint > projectY - _winY && midPoint < projectY + parseInt(project.element.offsetHeight, 10) - _winY){
								if(scope.currentFocusedProject) {
									//angular.element(currentFocusedProject).removeClass('selected');
								}
								scope.currentFocusedProject = project.data;
								//angular.element(currentFocusedProject).addClass('selected');								
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
				link:function(scope, element, attrs, controller){
					controller.addProject({element:element[0], data:scope.project});
				}
			}
		}]);

}(angular));