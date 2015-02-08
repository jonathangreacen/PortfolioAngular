(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('Brownian', ['$window', Brownian]);

	function Brownian($window){
		var movers 	= [],
			_w, _h, c,
			context,
			center,
			animationID,
			clearID,
			centerID,
			total_movers = 400,
			drawFrame = true,
			count = 0;

		this.initialized = false;
		this.running = false;

		this.update = function(){
			drawFrame = count/2 === Math.floor(count/2);
			count++;

			if(0 === count % 85){
				recenter();
			}
		}
		this.draw = function(){
			if(drawFrame === true){
				context.strokeStyle = '#beebba';
				context.lineWidth = 1;
				context.beginPath();
				for(var i=0;i<movers.length; i++){
					var m = movers[i];
						m.move();				   
						context.moveTo(m.lastX, m.lastY);
						context.lineTo(m.x, m.y);
						m.lastX = m.x;
						m.lastY = m.y;
						if(m.x > _w || m.y > _h || m.x < 0 || m.y < 0){
							removeMover( m );
							buildMovers(1);
						}
				}
				context.closePath();
				context.stroke();			
				whiteOut();
			}
		};		
		this.interact = function(){
			
		};		
		this.resize = function(){
			_h = c.height;
		};
		this.init = function(_canvas){
			if(this.initialized === false){
				c = _canvas;
				c.style.cursor = 'auto';
				_w = c.width;
				_h = c.height;
				context = c.getContext('2d');
				center = {x:_w/2, y:_h, vx:0, vy:0};
				run();
				this.initialized = true;
			}
		};
		this.destroy = function(){

		};
		function run(){
			buildMovers(total_movers);
		};
		function whiteOut(){				
			context.fillStyle ='rgba(' + 0xf2 + ',' + 0xfe + ',' + 0xf1 + ',.05)';					
			context.beginPath();
			context.fillRect(0,0,_w,_h);
			context.closePath();
			context.fill();
		};		
		function recenter(){
			center.x = Math.random() * _w;
			center.y = Math.random() * _h;
		};
		function getMouseXY(evt){
			center.x = evt.pageX;
			center.y = evt.pageY;
		};
		function buildMovers(n){
			for(var i=0; i<n; i++){
				var m = new Mover();				
					m.x = center.x
					m.y = center.y
					m.lastX = m.x;
					m.lastY = m.y;
					m.power = Math.random() * 5 + .5;
					m.color = Math.round(Math.random() * 0xFFFFFF);					
					m.vx = 0;
					m.vy = 0;
					movers.push( m );
			}
		};
		function removeMover( m ){
			var i = 0,
				m2;
			for(i; i<movers.length; i++){
				m2 = movers[i];
				if(m === m2){
					movers.splice(i,1);
					break;
				}
			}
		};
		function Mover(){
			this.x;
			this.y;
			this.vx;
			this.vy;
			this.lastX;
			this.lastY;
			this.power;
			this.color;
			this.move = function(){                        
				this.vx += (Math.random() - Math.random())*this.power;
				this.vy += (Math.random() - Math.random())*this.power;
				
				this.x += this.vx;
				this.y += this.vy;
			}
		};

	};

}(angular));