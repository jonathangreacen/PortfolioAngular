(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'about';
		
		module.directive(VIEW_NAME, ['$window', 'AppContent', 'Constants', 'GFXContentManager', About]);

		function About($window, AppContent, Constants, GFXContentManager){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){					
					AppContent.getContentForView(VIEW_NAME).then(bindViewData);

					function bindViewData(data){
						GFXContentManager.requestVisualization(data.gfx);
						$scope[VIEW_NAME + 'Data'] = data;
					}
				},
				link:function(scope, element, attrs){
					$window.scrollTo(0,0);
				}
			}
		};
}(angular));