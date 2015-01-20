(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.directive('gfx', ['$window', 'requestAnimationFrame', 'Constants', 'Drawing', 'LogarithmicUniverse', GFX]);

	function GFX($window, requestAnimationFrame, Constants, Drawing, LogarithmicUniverse){
		return {
			restrict:'A',
			scope:{},
			replace:true,
			link:function(scope, $element, attributes){
				var canvas = document.createElement('canvas'),
					vis = Constants.currentVisualization = LogarithmicUniverse;

				$element.append(canvas);

				function draw(){
					requestAnimationFrame(draw);
					vis.update();
					vis.draw();
				}
				function resize(){
					vis.resize();
				}
				function interact(evt){
					vis.interact(evt);
				}
				vis.init(canvas);
				angular.element($window).on('resize', resize.bind(this));
				angular.element(canvas).on('click touchstart', interact.bind(this));				
				draw();
			}
		}
	};

}(angular));