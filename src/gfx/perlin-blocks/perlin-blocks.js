(function(angular){
	//'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('PerlinBlocks', ['$window', 'Perlin', PerlinBlocks]);

	function PerlinBlocks($window, Perlin){
		var canvas,
			ctx,
			area={width:0,height:0,x:0,y:0,z:0},
			colors,
			imageData,
			P,
			Prng,
			fScl,
			running=true,
			pauseID,
			pauseInterval = 5500,
			animationCountTotal = 123*2,
			animationCount=0,
			mutation=0,
			alpha=0,
			swatch={x:0,y:0,z:0,width:15,height:66,depth:100},
			me={},
			animationID;

		this.initialized = false;
		this.running = false;		

		this.draw = function(){
			drawGrid(3,10);
		};
		
		this.interact = function(){
			animationCount = 0;
			running = true;
			resetPauseInterval();
		};

		this.update = function(){
			if(running && animationCount < animationCountTotal && animationCount/2 == Math.floor(animationCount/2)){				
				generatePerlinSwatch(swatch.width,swatch.height);
			}
			animationCount++;
		};
		this.resize = function(){
			this.interact();
		}
		this.init = function(_canvas){
			if(this.initialized === false){
				canvas = _canvas;
				ctx = canvas.getContext('2d');
				canvas.style.cursor='pointer';
				imageData = ctx.createImageData(swatch.width, swatch.height);
				P = Perlin;//Simplex;
				Prng = Math;
				Prng.seed = 282;
				P.setRng(Prng);
				P.noiseDetail(2,.5);
				
				colors =  getColors(0xFF);
				fScl = .02345;
				animationID = setInterval(this.update, 33);
				resetPauseInterval();
				this.initialized = true;
			}
			alpha = 0;
		}

		function resetPauseInterval(){
			clearInterval( pauseID );
			pauseID	= setInterval(toggleRunning, pauseInterval);
		}

		function getColors(noOfColors) {
			var html = "",r,g,b,
				frequency = 5 / noOfColors,
				colors = [];
			for (var i = 0; i < noOfColors;++i) {
				r = Math.sin(frequency * i + .1) * (127) + 128;
				g = Math.sin(frequency * i + 3.5) * (127) + 128;
				b = Math.sin(frequency * i + 4) * (127) + 128;
				
				colors.push( 'rgba(' + ~~r +',' + ~~g + ',' + ~~b + ',' ); 
			}				
			return colors;
		}

		function generatePerlinSwatch(cols,rows){		
			var w = 1,
				h = 1,
				x, y,
				str = '',
				i = 0,
				j = 0;
			Prng.seed += 5;
			mutation += .0123;
			for(i; i<cols; i++){
				for(j=0; j<rows; j++){
					x = i*w;
					y = j*h;
					var n = P.noise(x*fScl,y*fScl,mutation);
					
					var r = g = b = n * 0xFF;
					var index = (x + y * imageData.width) * 4;
					imageData.data[index + 0] = r;
					imageData.data[index + 1] = g;
					imageData.data[index + 2] = b;
					imageData.data[index + 3] = 255;						
				}	
			}
		}

		function drawGrid(cols,rows){
			var colSize = Math.ceil(canvas.width / cols),
				rowSize = Math.ceil(canvas.height / rows),
				swatchPoint,grade,
				i,j,
				x,y,t = colors.length;
				ctx.strokeStyle = (alpha < 1) ? 'rgba(0,0,0,'+alpha/40+')' : 'rgba(0,0,0,.056)';
			for(i=0; i<cols; i++){
				for(j=0; j<rows; j++){
					x = i;
					y = j;					
					swatchPoint = {x:(Math.floor(i*(swatch.width/cols))),y:(Math.floor(j*(swatch.height/rows)))};
					grade = imageData.data[(swatchPoint.x + swatchPoint.y * imageData.width) * 4];
					var c = colors[Math.floor(((grade / 255)) * t)] ; 
					ctx.fillStyle = c + alpha + ')';
					ctx.beginPath();
					
					ctx.rect(~~(i*colSize),~~(j*rowSize),colSize,rowSize);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
				}
			}
			if(alpha < 1){
				alpha += .05;
			}else{
				alpha = 1;
			}
		}

		this.destroy = function(){
			running = false;
			clearInterval(animationID);
			clearInterval(pauseID);
		}

		function toggleRunning (){
			running = !running;
			animationCount = 0;
		}

	};

}(angular));