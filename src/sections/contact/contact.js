(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'contact';
		
		module.directive(VIEW_NAME, ['AppContent', 'Constants', 'GFXContentManager', Contact]);

		function Contact(AppContent, Constants, GFXContentManager){
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

				}
			}
		};
}(angular));