(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.service('GFXContentManager', ['Brownian', 'LogarithmicUniverse', 'PerlinBlocks', GFXContentManager]);

	function GFXContentManager(Brownian, LogarithmicUniverse, PerlinBlocks){/*, Brownian, ColorCycle*/
		this.visualizations = { 'logarithmic-universe':LogarithmicUniverse,
								'perlin-blocks':PerlinBlocks,
								'brownian':Brownian/*,
								'color-cycle':ColorCycle*/
							}; 
		this.currentVisualization = this.visualizations['logarithmic-universe'];
		this.requestVisualization = function(_name){
			var vis = this.visualizations[_name];
			if(vis){
				this.currentVisualization = vis;
			}
		}
	};
						
}(angular));