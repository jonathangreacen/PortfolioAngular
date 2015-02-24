(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.directive('gfx', ['$window', 'requestAnimationFrame', 'Constants', 'Drawing', 'GFXContentManager', GFX]);

	function GFX($window, requestAnimationFrame, Constants, Drawing, GFXContentManager){
		return {
			restrict:'A',
			scope:{},
			replace:true,
			link:function(scope, $element, attributes){
				var canvas = document.createElement('canvas'),
					vis,
					runVis = true;
					
				$element.append(canvas);
				init();

				function draw(){
					if(typeof GFXContentManager.currentVisualization !== 'undefined'){
						if(vis !== GFXContentManager.currentVisualization){
							vis = GFXContentManager.currentVisualization;
							vis.init(canvas);
							vis.interact();
						}						
						if(runVis === true){						
							vis.update();
							vis.draw();
						}
					}
					requestAnimationFrame(draw);
				}
				function resize(){
					canvas.height = $window.innerHeight;
					if(typeof vis !== 'undefined'){
						vis.resize();
					}
				}
				function interact(evt){
					vis.interact(evt);
				}
				function toggleVisRunningByMQ(mediaQueryList){
					runVis = mediaQueryList.matches;
				}				
				function init(){
					var matchingLargeFormat;
					resize();
					
					//For performance when in small/mobile format
					if(typeof $window['matchMedia'] !== 'undefined'){
						matchingLargeFormat = $window.matchMedia("(min-width : 520px)");
						matchingLargeFormat.addListener(toggleVisRunningByMQ);
					}
				}
				angular.element($window).on('resize', resize.bind(this));
				angular.element(canvas).on('click touchstart', interact.bind(this));				
				draw();
			}
		}
	};

}(angular));