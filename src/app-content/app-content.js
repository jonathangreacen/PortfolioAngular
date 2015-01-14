(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('AppContent', ['$http', '$q', 'Constants', AppContent]);

	function AppContent($http, $q, Constants){
		var deferredAppContent = {};

		function loadContentFeed(view){
			var contentPath = Constants.API_PATH + '/' + view + '/feed.' + Constants.API_TYPE;

			if(!deferredAppContent[view]){
				deferredAppContent[view] = $q.defer();
			}

			$http.get(contentPath).success(angular.bind(this, onContentLoaded, view));
		};

		function onContentLoaded(view, data){
			deferredAppContent[view].resolve(data);
		};

		this.getContentForView = function(view){
			if(!deferredAppContent[view]){
				loadContentFeed(view);
			}
			return deferredAppContent[view].promise;
		};

	};

}(angular));