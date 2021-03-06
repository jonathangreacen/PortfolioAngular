//Base application
(function(angular){
	'use strict';
	setTimeout(function(){document.body.className += ' js';}, 50);
	var module = angular.module('workshop.portfolio', ['ngRoute', 'ngSanitize']);
}(angular));;// Perlin  1.0
// Ported from java (http://mrl.nyu.edu/~perlin/noise/) by Ron Valstar (http://www.sjeiti.com/)
// and some help from http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
// AS3 optimizations by Mario Klingemann http://www.quasimondo.com
// then ported to js by Ron Valstar

(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.service('Perlin', [new Perlin()]);
//console.log("trying to create perlin:", Perlin)
	function Perlin() {

		var oRng = Math;

		var p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

		var iOctaves = 1;
		var fPersistence = 0.5;
		
		var aOctFreq; // frequency per octave
		var aOctPers; // persistence per octave
		var fPersMax; // 1 / max persistence

		var iXoffset;
		var iYoffset;
		var iZoffset;
		
		// octFreqPers
		function octFreqPers() {
			var fFreq, fPers;
			aOctFreq = [];
			aOctPers = [];
			fPersMax = 0;
			for (var i=0;i<iOctaves;i++) {
				fFreq = Math.pow(2,i);
				fPers = Math.pow(fPersistence,i);
				fPersMax += fPers;
				aOctFreq.push( fFreq );
				aOctPers.push( fPers );
			}
			fPersMax = 1 / fPersMax;
		};
		// setOffset
		var setOffset = function setOffset(n) {
			iXoffset = Math.floor(oRng.random()*256);
			iYoffset = Math.floor(oRng.random()*256);
			iZoffset = Math.floor(oRng.random()*256);
		};
		// init
		setOffset();
		octFreqPers();
		//
		// return
		return {
			 noise: function(x,y,z) {

				x = x||0;
				y = y||0;
				z = z||0;

				var fResult = 0;
				var fFreq, fPers;
				var xf, yf, zf, u, v, w, xx, yy, zz;
				var x1, y1, z1;
				var X, Y, Z, A, B, AA, AB, BA, BB, hash;
				var g1, g2, g3, g4, g5, g6, g7, g8;

				x += iXoffset;
				y += iYoffset;
				z += iZoffset;

				for (var i=0;i<iOctaves;i++) {
					fFreq = aOctFreq[i];
					fPers = aOctPers[i];

					xx = x * fFreq;
					yy = y * fFreq;
					zz = z * fFreq;

					xf = Math.floor(xx);
					yf = Math.floor(yy);
					zf = Math.floor(zz);

					X = Math.floor(xf & 255);
					Y = Math.floor(yf & 255);
					Z = Math.floor(zf & 255);

					xx -= xf;
					yy -= yf;
					zz -= zf;

					u = xx * xx * xx * (xx * (xx*6 - 15) + 10);
					v = yy * yy * yy * (yy * (yy*6 - 15) + 10);
					w = zz * zz * zz * (zz * (zz*6 - 15) + 10);

					A  = Math.round(p[X]) + Y;
					AA = Math.round(p[A]) + Z;
					AB = Math.round(p[Math.round(A+1)]) + Z;
					B  = Math.round(p[Math.round(X+1)]) + Y;
					BA = Math.round(p[B]) + Z;
					BB = Math.round(p[Math.round(B+1)]) + Z;

					x1 = xx-1;
					y1 = yy-1;
					z1 = zz-1;

					hash = Math.round(p[Math.round(BB+1)]) & 15;
					g1 = ((hash&1) === 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? x1 : z1 ) : hash<4 ? -y1 : ( hash===14 ? -x1 : -z1 ));

					hash = Math.round(p[Math.round(AB+1)]) & 15;
					g2 = ((hash&1) === 0 ? (hash<8 ? xx : y1) : (hash<8 ? -xx : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? xx : z1 ) : hash<4 ? -y1 : ( hash===14 ? -xx : -z1 ));

					hash = Math.round(p[Math.round(BA+1)]) & 15;
					g3 = ((hash&1) === 0 ? (hash<8 ? x1 : yy) : (hash<8 ? -x1 : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? x1 : z1 ) : hash<4 ? -yy : ( hash===14 ? -x1 : -z1 ));

					hash = Math.round(p[Math.round(AA+1)]) & 15;
					g4 = ((hash&1) === 0 ? (hash<8 ? xx : yy) : (hash<8 ? -xx : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? xx : z1 ) : hash<4 ? -yy : ( hash===14 ? -xx : -z1 ));

					hash = Math.round(p[BB]) & 15;
					g5 = ((hash&1) === 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? x1 : zz ) : hash<4 ? -y1 : ( hash===14 ? -x1 : -zz ));

					hash = Math.round(p[AB]) & 15;
					g6 = ((hash&1) === 0 ? (hash<8 ? xx : y1) : (hash<8 ? -xx : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? xx : zz ) : hash<4 ? -y1 : ( hash===14 ? -xx : -zz ));

					hash = Math.round(p[BA]) & 15;
					g7 = ((hash&1) === 0 ? (hash<8 ? x1 : yy) : (hash<8 ? -x1 : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? x1 : zz ) : hash<4 ? -yy : ( hash===14 ? -x1 : -zz ));

					hash = Math.round(p[AA]) & 15;
					g8 = ((hash&1) === 0 ? (hash<8 ? xx : yy) : (hash<8 ? -xx : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? xx : zz ) : hash<4 ? -yy : ( hash===14 ? -xx : -zz ));

					g2 += u * (g1 - g2);
					g4 += u * (g3 - g4);
					g6 += u * (g5 - g6);
					g8 += u * (g7 - g8);

					g4 += v * (g2 - g4);
					g8 += v * (g6 - g8);

					fResult += ( (g8 + w * (g4 - g8))) * fPers;
				}

				return ( fResult * fPersMax + 1 ) * 0.5;
			},noiseDetail: function(octaves,falloff) {
				iOctaves = octaves||iOctaves;
				fPersistence = falloff||fPersistence;
				octFreqPers();
			},setRng: function(r) {
				oRng = r;
				setOffset();
				octFreqPers();
			},toString: function() {
				return "[object Perlin "+iOctaves+" "+fPersistence+"]";
			}
		};
	};

}(angular));;(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.service('Drawing', [Drawing]);

	function Drawing(){
		this.combineRGB = function(r,g,b){
			return (r<<16) | (g<<8) | b;
		}
		this.hexToRGB = function(hex){
			var r = hex >> 16,
				temp = hex ^ r << 16,
				g = temp >> 8,
				b = temp ^ g << 8;
			return [r,g,b];
		};
		this.colorGrade = function(col1, col2, fragments, arr){
			var col1RGB = this.hexToRGB(col1),
				col2RGB = this.hexToRGB(col2),
				c1 		= {r:col1RGB[0], g:col1RGB[1], b:col1RGB[2], rgb:col1RGB},
				c2 		= {r:col2RGB[0], g:col2RGB[1], b:col2RGB[2], rgb:col2RGB},
				mix 	= {r:((c2.r - c1.r)/fragments), g:((c2.g - c1.g)/fragments), b:((c2.b - c1.b)/fragments)},
				grades 	= arr || [],
				i = 0, 
				hex;
			for(; i<fragments; i++){
				grades.push( this.combineRGB(c1.r + mix.r*i, c1.g + mix.g*i, c1.b + mix.b*i) );
			}
			return grades;
		};
		return this;
	}

}(angular));;(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.factory('requestAnimationFrame', [RAF]);

	function RAF(){		
		return window.requestAnimationFrame    ||
		    window.webkitRequestAnimationFrame ||
		    window.mozRequestAnimationFrame    ||
		    window.oRequestAnimationFrame      ||
		    window.msRequestAnimationFrame     ||
		    function(callback, element){
		      window.setTimeout(callback, 1000 / 60);
		    };
	}

}(angular));;(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('AppContent', ['$http', '$q', 'Constants', AppContent]);

	function AppContent($http, $q, Constants){
		var deferredAppContent = {};

		function loadContentFeed(view){
			var contentPath = Constants.API_PATH + '/' + view + '/feed.' + Constants.API_TYPE;

			if(!deferredAppContent[view]){
				deferredAppContent[view] = $q.defer();
			}

			$http.get(contentPath).success(angular.bind(this, onContentLoaded, view));
		};

		function onContentLoaded(view, data){
			deferredAppContent[view].resolve(data);
		};

		this.getContentForView = function(view){
			if(!deferredAppContent[view]){
				loadContentFeed(view);
			}
			return deferredAppContent[view].promise;
		};

	};

}(angular));;(function(angular){
	var module = angular.module('workshop.portfolio');	
		module.service('Constants', Constants);

	function Constants(){
		this.API_PATH 		= 'content/';
		this.DEFAULT_VIEW 	= 'projects';
		this.API_TYPE 		= 'json';
		this.SECTIONS 		= [{label:'WORK',value:'projects',url:'/work'}, {label:'ABOUT',value:'about',url:'/about'}, {label:'CODE',value:'code',url:'/code'}, {label:'CONTACT',value:'contact',url:'/contact'}];
	};

}(angular));;(function(angular){
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
			_h = c.height ;
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
			this.resize();
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

}(angular));;(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('ColorGrade', ['$window', '$document', 'Drawing', ColorGrade]);

	function ColorGrade($window, $document, Drawing){
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
				context = canvas.getContext('2d');
				canvas.style.cursor = 'auto';
				rows = 11;
				cols = 3;
				
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

}(angular));;(function(angular){
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
						
}(angular));;(function(angular){
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

}(angular));;(function(angular){
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

}(angular));;(function(angular){
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

}(angular));;// Perlin  1.0
// Ported from java (http://mrl.nyu.edu/~perlin/noise/) by Ron Valstar (http://www.sjeiti.com/)
// and some help from http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
// AS3 optimizations by Mario Klingemann http://www.quasimondo.com
// then ported to js by Ron Valstar

(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.service('Perlin', [Perlin]);
		
	function Perlin() {

		var oRng = Math;

		var p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

		var iOctaves = 1;
		var fPersistence = 0.5;
		
		var aOctFreq; // frequency per octave
		var aOctPers; // persistence per octave
		var fPersMax; // 1 / max persistence

		var iXoffset;
		var iYoffset;
		var iZoffset;
		
		// octFreqPers
		function octFreqPers() {
			var fFreq, fPers;
			aOctFreq = [];
			aOctPers = [];
			fPersMax = 0;
			for (var i=0;i<iOctaves;i++) {
				fFreq = Math.pow(2,i);
				fPers = Math.pow(fPersistence,i);
				fPersMax += fPers;
				aOctFreq.push( fFreq );
				aOctPers.push( fPers );
			}
			fPersMax = 1 / fPersMax;
		};
		// setOffset
		var setOffset = function setOffset(n) {
			iXoffset = Math.floor(oRng.random()*256);
			iYoffset = Math.floor(oRng.random()*256);
			iZoffset = Math.floor(oRng.random()*256);
		};
		// init
		setOffset();
		octFreqPers();
		//
		// return
		return {
			 noise: function(x,y,z) {

				x = x||0;
				y = y||0;
				z = z||0;

				var fResult = 0;
				var fFreq, fPers;
				var xf, yf, zf, u, v, w, xx, yy, zz;
				var x1, y1, z1;
				var X, Y, Z, A, B, AA, AB, BA, BB, hash;
				var g1, g2, g3, g4, g5, g6, g7, g8;

				x += iXoffset;
				y += iYoffset;
				z += iZoffset;

				for (var i=0;i<iOctaves;i++) {
					fFreq = aOctFreq[i];
					fPers = aOctPers[i];

					xx = x * fFreq;
					yy = y * fFreq;
					zz = z * fFreq;

					xf = Math.floor(xx);
					yf = Math.floor(yy);
					zf = Math.floor(zz);

					X = Math.floor(xf & 255);
					Y = Math.floor(yf & 255);
					Z = Math.floor(zf & 255);

					xx -= xf;
					yy -= yf;
					zz -= zf;

					u = xx * xx * xx * (xx * (xx*6 - 15) + 10);
					v = yy * yy * yy * (yy * (yy*6 - 15) + 10);
					w = zz * zz * zz * (zz * (zz*6 - 15) + 10);

					A  = Math.round(p[X]) + Y;
					AA = Math.round(p[A]) + Z;
					AB = Math.round(p[Math.round(A+1)]) + Z;
					B  = Math.round(p[Math.round(X+1)]) + Y;
					BA = Math.round(p[B]) + Z;
					BB = Math.round(p[Math.round(B+1)]) + Z;

					x1 = xx-1;
					y1 = yy-1;
					z1 = zz-1;

					hash = Math.round(p[Math.round(BB+1)]) & 15;
					g1 = ((hash&1) === 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? x1 : z1 ) : hash<4 ? -y1 : ( hash===14 ? -x1 : -z1 ));

					hash = Math.round(p[Math.round(AB+1)]) & 15;
					g2 = ((hash&1) === 0 ? (hash<8 ? xx : y1) : (hash<8 ? -xx : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? xx : z1 ) : hash<4 ? -y1 : ( hash===14 ? -xx : -z1 ));

					hash = Math.round(p[Math.round(BA+1)]) & 15;
					g3 = ((hash&1) === 0 ? (hash<8 ? x1 : yy) : (hash<8 ? -x1 : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? x1 : z1 ) : hash<4 ? -yy : ( hash===14 ? -x1 : -z1 ));

					hash = Math.round(p[Math.round(AA+1)]) & 15;
					g4 = ((hash&1) === 0 ? (hash<8 ? xx : yy) : (hash<8 ? -xx : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? xx : z1 ) : hash<4 ? -yy : ( hash===14 ? -xx : -z1 ));

					hash = Math.round(p[BB]) & 15;
					g5 = ((hash&1) === 0 ? (hash<8 ? x1 : y1) : (hash<8 ? -x1 : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? x1 : zz ) : hash<4 ? -y1 : ( hash===14 ? -x1 : -zz ));

					hash = Math.round(p[AB]) & 15;
					g6 = ((hash&1) === 0 ? (hash<8 ? xx : y1) : (hash<8 ? -xx : -y1)) + ((hash&2) === 0 ? hash<4 ? y1 : ( hash===12 ? xx : zz ) : hash<4 ? -y1 : ( hash===14 ? -xx : -zz ));

					hash = Math.round(p[BA]) & 15;
					g7 = ((hash&1) === 0 ? (hash<8 ? x1 : yy) : (hash<8 ? -x1 : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? x1 : zz ) : hash<4 ? -yy : ( hash===14 ? -x1 : -zz ));

					hash = Math.round(p[AA]) & 15;
					g8 = ((hash&1) === 0 ? (hash<8 ? xx : yy) : (hash<8 ? -xx : -yy)) + ((hash&2) === 0 ? hash<4 ? yy : ( hash===12 ? xx : zz ) : hash<4 ? -yy : ( hash===14 ? -xx : -zz ));

					g2 += u * (g1 - g2);
					g4 += u * (g3 - g4);
					g6 += u * (g5 - g6);
					g8 += u * (g7 - g8);

					g4 += v * (g2 - g4);
					g8 += v * (g6 - g8);

					fResult += ( (g8 + w * (g4 - g8))) * fPers;
				}

				return ( fResult * fPersMax + 1 ) * 0.5;
			},noiseDetail: function(octaves,falloff) {
				iOctaves = octaves||iOctaves;
				fPersistence = falloff||fPersistence;
				octFreqPers();
			},setRng: function(r) {
				oRng = r;
				setOffset();
				octFreqPers();
			},toString: function() {
				return "[object Perlin "+iOctaves+" "+fPersistence+"]";
			}
		};
	};

}(angular));;(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.directive('navigation', ['$window', '$location', 'Constants', Navigation]);
		module.directive('navButton', [NavButton]);

	function Navigation($window, $location, Constants){
		return {
			restrict:'A',
			scope:true,
			templateUrl:'nav.tpl.html',
			replace:true,
			controller:function($scope){
				$scope.navigateTo = function(sectionData){
					var url = sectionData.url;
					$location.path( url );
					if($window.ga){
						$window.ga('send', 'pageview', { page: $location.url() });
					}
				}
				$scope.$on('$routeChangeSuccess', function () {
					$scope.currentSectionUrl = $location.path();
		        });
			},
			link:function(scope, $element, attributes){
				var expanded = false,
					retractYPosition = 120,
					url = $location.url();
				scope.navSections = Constants.SECTIONS;
				scope.currentSectionUrl =  url === '/' ? '/work' : url;

				onScroll();
				angular.element($window).bind('scroll', onScroll);
				function onScroll(evt){
					if(expanded === true && $window.pageYOffset > retractYPosition){
						expanded = false;
						$element.addClass('collapsed');
					}else if(expanded === false && $window.pageYOffset < retractYPosition){
						expanded = true;
						$element.removeClass('collapsed');
					}
				}
			}
		}
	};

	function NavButton(){
		return {
			restrict:'A',
			scope:true,
			require:'^navigation',
			link:function(scope, element, attributes, controller){				
				scope.onClick = function(evt, sectionData){
					scope.navigateTo(sectionData);
				}
			}
		}
	};

}(angular));;(function(angular){
	'use strict';
	angular.module('workshop.portfolio').config(Routes);

	function Routes($locationProvider, $routeProvider){
		$routeProvider.when('/work', {
			templateUrl:'projects.tpl.html'
		})
		.when('/about', {
			templateUrl:'about.tpl.html'
		})
		.when('/code', {
			templateUrl:'code.tpl.html'
		})		
		.when('/contact', {
			templateUrl:'contact.tpl.html'
		})
		.otherwise({redirectTo:'/work'}); 
	};

}(angular));;(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'about';
		
		module.directive(VIEW_NAME, ['$window', 'AppContent', 'Constants', 'GFXContentManager', About]);

		function About($window, AppContent, Constants, GFXContentManager){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){					
					AppContent.getContentForView(VIEW_NAME).then(bindViewData);

					function bindViewData(data){
						GFXContentManager.requestVisualization(data.gfx);
						$scope[VIEW_NAME + 'Data'] = data;
					}
				},
				link:function(scope, element, attrs){
					$window.scrollTo(0,0);
				}
			}
		};
}(angular));;(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'code';
		
		module.directive(VIEW_NAME, ['$window', 'AppContent', 'Constants', 'GFXContentManager', Code]);

		function Code($window, AppContent, Constants, GFXContentManager){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					AppContent.getContentForView(VIEW_NAME).then(bindViewData);

					function bindViewData(data){
						GFXContentManager.requestVisualization(data.gfx);
						$scope[VIEW_NAME + 'Data'] = data;
					}
				},
				link:function(scope, element, attrs){
					$window.scrollTo(0,0);
				}
			}
		};
}(angular));;(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'contact';
		
		module.directive(VIEW_NAME, ['$window', 'AppContent', 'Constants', 'GFXContentManager', Contact]);

		function Contact($window, AppContent, Constants, GFXContentManager){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					AppContent.getContentForView(VIEW_NAME).then(bindViewData);

					function bindViewData(data){
						GFXContentManager.requestVisualization(data.gfx);
						$scope[VIEW_NAME + 'Data'] = data;
					}
				},
				link:function(scope, element, attrs){
					$window.scrollTo(0,0);
				}
			}
		};
}(angular));;(function(angular){
	var module = angular.module('workshop.portfolio');	
		module.directive('imagePreview', ['$document', '$timeout', '$window', 'Constants', ImagePreview]);

	function ImagePreview($document, $timeout, $window, Constants){
		return {
			scope:{
				images : '@'
			},
			restrict:'A',
			require:'^project',
			link:function(scope, $element, attributes, controller){
				var next,
					current,
					img1,
					img2,					
					timeoutID,					
					currentImageIndex = 0,
					RATE = 2000,					
					NEXT_CLASSES = 'next',
					CURRENT_CLASSES = 'current',
					data;
				
				init();

				function init(){
					scope.running = false;
					scope.start = start;
					scope.stop = stop;

					data = JSON.parse(scope.images);
					controller.setImagePreview(scope);
					if(data){
						img1 = $document[0].createElement('img');
						img2 = $document[0].createElement('img');
						img1.setAttribute('class', NEXT_CLASSES);
						img2.setAttribute('class', CURRENT_CLASSES);
					//	angular.element(img1).bind('load', onLoad);
					//	angular.element(img2).bind('load', onLoad);
						img1.addEventListener('load', onLoad);
						img2.addEventListener('load', onLoad)
						$element.append(img1);
						$element.append(img2);
						next = img1;
						current = img2;
						load();

						angular.element($window).bind('resize', resize)
					}
				}
				function load(){
					var url = Constants.API_PATH + data[currentImageIndex];
					currentImageIndex = currentImageIndex < data.length - 1 ? ++currentImageIndex : 0;
					next.src = url + "?cacheBust="+ new Date().getTime();
				}
				function onLoad(evt){
					swap();
					if(scope.running===true){
						reset();
					}
				}
				function reset(){
					if(scope.running===true){
						timeoutID = $timeout(load, RATE);
					}
				}
				function start(){
					scope.running = true;
					reset();
				}
				function stop(){
					scope.running = false;
					$timeout.cancel(timeoutID);
				}
				function swap(){
					var _next = next;
					next = current;
					current = _next;

					next.className = NEXT_CLASSES;
					current.className = CURRENT_CLASSES;
					resize();
				}
				function resize(){
					var h = current.height,
						w = $element[0].clientWidth;		
					$element[0].style.height = h + 'px';
					current.style.left = ((w - current.width) / 2) + 'px'
				}
				function destroy(){
					angular.element($window).unbind('resize', resize)
				}
			}
		};
	};

}(angular));;(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'projects';
 
		module.directive('projects', ['$window', 'AppContent', 'Constants', 'GFXContentManager', function($window, AppContent, Constants, GFXContentManager){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					
					$scope.projects = [];

					AppContent.getContentForView(VIEW_NAME).then(bindProjectData);

					function bindProjectData(data){
						GFXContentManager.requestVisualization(data.gfx);
						$scope.projectsData = data;
					};

					this.addProject = function(project){
						$scope.projects.push(project);
					};
					
				},
				link:function(scope, $element){
					scope.state = {};
					scope.state.currentFocusedProject;
					$window.scrollTo(0,0);
					angular.element($window).on('scroll', highlightCurrentProject);

					highlightCurrentProject();
					function highlightCurrentProject(){
						var projects = scope.projects,
							t = projects.length,
							i = 0,
							project,
							projectY,
							midPoint = $window.innerHeight / 2,
							_winY = $window.pageYOffset,
							currentFocusedProject = scope.state.currentFocusedProject;

						for(i; i<t; i++){
							project = projects[i];
							projectY = project.$element[0].offsetTop;

							if(currentFocusedProject !== project && midPoint > projectY - _winY && 
									midPoint < projectY + parseInt(project.$element[0].offsetHeight, 10) - _winY){

								if(currentFocusedProject) {
									currentFocusedProject.deactivate();
								}
								scope.state.currentFocusedProject = project;
								project.activate();
								break;
							}
						}
					}
				}
			}
		}]);

		module.directive("project", [function(){
			return{
				restrict:'A',
				scope:true,
				transclude:true,
				replace:true,
				templateUrl:'project.tpl.html',
				require:'^projects',
				controller:function($scope, $element){
					$scope.imagePreview;

					this.setImagePreview = function(imagePreview){
						$scope.imagePreview = imagePreview;
					}

					$scope.activate = function(){
						$element.addClass('active')
						this.imagePreview.start();
					}
					$scope.deactivate = function(){
						$element.removeClass('active')
						this.imagePreview.stop();
					}

				},
				link:function(scope, $element, attrs, controller){
					scope.$element = $element;
					controller.addProject(scope);
				}
			}
		}]);

}(angular));