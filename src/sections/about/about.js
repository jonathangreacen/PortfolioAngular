(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'about';
		

		module.directive('about', ['AppContent', 'Constants', function(AppContent, Constants){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){					
					AppContent.getContentForView(VIEW_NAME).then(bindViewData);

					function bindViewData(data){
						$scope.projectsData = data;
					}
				},
				link:function(scope, element, attrs){

				}
			}
		}]);
}(angular));