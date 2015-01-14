//Base application
(function(angular){
	var module = angular.module('workshop.portfolio');	
		module.directive('ImagePreview', ImagePreview);

	function ImagePreview(){
		return {
			restrict:'A',
			require:'^project',
			link:function(scope, element, attributes){
				
			}
		};
	};

}(angular));