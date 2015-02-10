(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('ColorGrade', ['$window', 'Drawing', ColorGrade]);

	function ColorGrade($window, Drawing){
		var canvas,
			context,
			colors,
			rows,
			cols,
			w,
			h,
			animationID,
			endpoints,
			drawing,
			running,
			alpha=0,
			drawFrame = true,
			count = 0;

		this.initialized = false;
		this.running = false;

		this.init = function(_canvas){
			var fragments;
			if(this.initialized === false){
				canvas = _canvas;
				canvas.width = 161;
				canvas.height = document.height;
				context = canvas.getContext('2d');
				canvas.style.cursor = 'auto';
				rows = 11;
				cols = 3;
				w = canvas.width / cols;
				h = canvas.height / rows;
				
				fragments = (rows + cols)*4;
				if(!colors){
					endpoints = [0x80B6CC, 0xD22B0D, 0xFFFF99, 0x287961 ];
					colors = Drawing.colorGrade(endpoints[0], endpoints[1], fragments);
					colors = Drawing.colorGrade(endpoints[1], endpoints[2], fragments, colors);
					colors = Drawing.colorGrade(endpoints[2], endpoints[3], fragments, colors);
					colors = Drawing.colorGrade(endpoints[3], endpoints[2], fragments, colors);
					colors = Drawing.colorGrade(endpoints[2], endpoints[1], fragments, colors);
					colors = Drawing.colorGrade(endpoints[1], endpoints[0], fragments, colors);
				}
			}
			this.resize();
			running = true;
		};
		this.update = function(){
			drawFrame = count/3 === Math.floor(count/3);
			count++;
		}
		this.draw = function(){
			var i = 0, j, x, y, color;
			if(drawFrame){
				context.strokeStyle = 'rgba(0,0,0,.044)';
				context.lineWidth = 1;
				context.globalAlpha = alpha;
				alpha += .08;
				alpha = (alpha < 1) ? alpha : 1;
				for(i; i<cols; i++){		
					x = i * w;
					for(j=0; j<rows; j++){
						y = j * h;
						color = '#' + colors[i + j].toString(16);
						
						context.fillStyle = color;
						context.beginPath();
						context.rect(x, y, w, h);
						context.closePath();
						context.stroke();
						context.fill();
					}
				}
				colors.unshift( colors.pop() );
			}
		};
		this.resize = function(){
			w = canvas.width / cols;
			h = canvas.height / rows;
		};		
		this.interact = function(){

		};
		this.destroy = function(){
			context.globalAlpha = 1;
			running = false;
		};
	};

}(angular));