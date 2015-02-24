(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.service('GFXContentManager', ['$injector', GFXContentManager]);

	function GFXContentManager($injector){
		
		this.currentVisualization;
		this.requestVisualization = function(_name){
			var vis = $injector.get(_name);//this.visualizations[_name];
			if(typeof vis !== 'undefined'){
				this.currentVisualization = vis;
			}
		}
	};
						
}(angular));