(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('LogarithmicUniverse', ['$window', 'Constants', LogarithmicUniverse]);

	function LogarithmicUniverse($window, Constants){
		var ctx,
			canvas,
			width,
			height,
			animationTimer,
			launchTimer,
			releaseTimer,
			dim,
			dim_log,
			xOff,
			yOff,			
			arrow_data,
			loader,
			arrows = [];

		this.initialized = false;
		this.running = false;
		this.resize = resize;
		this.interact = launchArrows.bind(this);
		this.update = update;
		this.draw = draw;
		this.init = init;

		function init(_c){
			if(this.initialized === false){
				canvas = _c;
				ctx = canvas.getContext('2d');
				resize();
				canvas.style.backgroundColor = '#F2FEF1';
				dim = 1000;
				dim_log = Math.log(dim);
				this.running = false;
				xOff = width+10;
				yOff = 200;
				arrows = [];
				
				arrow_data = new Image();
				arrow_data.onload = onArrowDataLoaded.bind(this);
				arrow_data.src = Constants.API_PATH + '/vis/logarithmic-arrow_3.png';
				this.initialized = true;
			}
		};

		function onArrowDataLoaded(e){
			if(arrow_data){
				arrow_data.onload = null;
				this.initialized = true;
				this.interact();
			}
		};
		
		function resize(){
			width = canvas.width;
			height = canvas.height;
		};
		
		function pauseArrowLaunch(){
			clearInterval(launchTimer);
			clearInterval(releaseTimer);
			
			canvas.style.cursor='pointer';
			this.running = false;
		};

		function launchArrows(){
			if(this.initialized === true && this.running === false){
				this.running = true;
				if(launchTimer)  clearInterval(launchTimer);
				if(releaseTimer) clearInterval(releaseTimer);
				launchTimer = setTimeout(pauseArrowLaunch.bind(this), Math.random()*1550 + 2000);
				releaseTimer = setInterval(release.bind(this) , 6);
			}
		};

		function release(){
			var s = 1+4*(dim_log - Math.log(1+Math.random()*dim));
			var arrow = new Arrow();
				arrow.x = Math.round(xOff + Math.random()*20 - Math.random()*20);
				arrow.y = Math.round(yOff + Math.random()*20 - Math.random()*20);
				arrow.scale = s;
				arrow.speed = s;
				arrow.width = arrow.height = s * 5;
				arrow.rotation = Math.random()*Math.PI + Math.PI/2;
				arrow.resetVelocity();
			arrows.push(arrow);
		};
		
		function update(){
			var t = arrows.length,
				i = 0,
				arrow,
				removeIndex,
				arrowsToRemove = [];
				
			for(; i<t; i++){
				arrow = arrows[i];
				arrow.x += arrow.vx;
				arrow.y += arrow.vy;
				if(this.running === false){
					arrow.power *= .977;		
					arrow.vx *= arrow.power;
					arrow.vy *= arrow.power;		
				}else if(arrow.power < 1){
					arrow.power += .08;
					arrow.resetVelocity();
				}
					
				if(arrow.x < 0 || arrow.y < 0 || arrow.x > width+20 || arrow.y > height){
					arrowsToRemove.push(arrow);
				}
			}
			
			t = arrowsToRemove.length;
			for(i=0; i<t; i++){
				arrow = arrowsToRemove[i];
				removeIndex = arrows.indexOf(arrow);
				arrows.splice(removeIndex,1);
			}
		};
		
		function draw(){
			canvas.height = canvas.height;
			var t = arrows.length,
				i = 0,
				w = arrow_data.width,
				h = arrow_data.height,
				arrow;
				
			for(; i<t; i++){
				arrow = arrows[i];
				ctx.translate(arrow.x,arrow.y);
				ctx.rotate(arrow.rotation);
				ctx.drawImage(arrow_data, 0, 0, w, h, 0, 0, arrow.width, arrow.height);
				ctx.rotate(-arrow.rotation);
				ctx.translate(-arrow.x, -arrow.y);
			}		
		};
		function destroy(){
			this.running = false;
			arrow_data = null;
			arrows = null;
			cancelAnimationFrame(animationTimer);
			clearInterval(launchTimer);
			clearInterval(releaseTimer);
			if(canvas) canvas.onclick = null;
		};
		function Arrow(){
			this.x;
			this.y;
			this.angle;
			this.scale;
			this.speed;
			this.rotation;
			this.vx;
			this.vy;
			this.power = 1;
			
			this.resetVelocity = function(){
				this.vx = (Math.cos(this.rotation) * this.speed) * this.power;
				this.vy = (Math.sin(this.rotation) * this.speed) * this.power;
			};
		};
	};

}(angular));