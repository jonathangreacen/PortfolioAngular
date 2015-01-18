(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.directive('gfx', ['$window', 'Constants', 'Drawing', 'LogarithmicUniverse', GFX]);

	function GFX($window, Constants, Drawing, LogarithmicUniverse){
		return {
			restrict:'A',
			scope:{},
			replace:true,
			link:function(scope, $element, attributes){
			/*	var canvas = document.createElement('canvas'),
					vis = Constants.currentVisualization = LogarithmicUniverse;

				$element.append(canvas);

				function draw(){
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
				angular.element(canvas).on('click touchstart', interact.bind(this))
				window.setInterval(draw.bind(this), 30);*/
			}
		}
	};

}(angular));