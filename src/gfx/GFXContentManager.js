(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.service('GFXContentManager', ['Brownian', 'ColorGrade', 'LogarithmicUniverse', 'PerlinBlocks', GFXContentManager]);

	function GFXContentManager(Brownian, ColorGrade, LogarithmicUniverse, PerlinBlocks){/*, Brownian, ColorCycle*/
		this.visualizations = { 'logarithmic-universe':LogarithmicUniverse,
								'perlin-blocks':PerlinBlocks,
								'brownian':Brownian,
								'color-grade':ColorGrade
							}; 
		this.currentVisualization;
		this.requestVisualization = function(_name){
			var vis = this.visualizations[_name];
			if(typeof vis !== 'undefined'){
				this.currentVisualization = vis;
			}
		}
	};
						
}(angular));