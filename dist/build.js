//Base application
(function(angular){
	'use strict';	
	var module = angular.module('workshop.portfolio', ['ngRoute', 'ngSanitize']);
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
		this.API_PATH 		= 'data/';
		this.DEFAULT_VIEW 	= 'projects';
		this.API_TYPE 		= 'json';
		this.SECTIONS 		= [{label:'WORK',value:'projects'}, {label:'ABOUT',value:'about'}, {label:'CODE',value:'code'}, {label:'CONTACT',value:'contact'}];
		this.currentVisualization;
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
				i = 0, hex;
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

}(angular));;(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('LogarithmicUniverse', ['$window', LogarithmicUniverse]);

	function LogarithmicUniverse($window){
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

		this.running = false;
		this.init = function(_c){
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
			arrow_data.src = '/data/vis/logarithmic-arrow_3.png';
		};
		function onArrowDataLoaded(e){
			if(arrow_data) arrow_data.onload = null;
			launchArrows();
			update();
		};

		this.resize = resize;
		function resize(){
			canvas.height = window.innerHeight;
			width = canvas.width;
			height = canvas.height;
		};
		function pauseArrowLaunch(){
			clearInterval(launchTimer);
			clearInterval(releaseTimer);
			
			canvas.style.cursor='pointer';
			this.running = false;
		};

		this.interact = function(evt){
			launchArrows();
		}
		function launchArrows(){
			if(!this.running){
				this.running = true;
				if(launchTimer)  clearInterval(launchTimer);
				if(releaseTimer) clearInterval(releaseTimer);
				launchTimer = setTimeout(pauseArrowLaunch, Math.random()*1550 + 2000);
				releaseTimer = setInterval(release , 6);
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

		this.update = update;
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
			
			window.cancelAnimationFrame(animationTimer);
			animationTimer = window.requestAnimationFrame(update);
		//	draw();
			t = arrowsToRemove.length;
			for(i=0; i<t; i++){
				arrow = arrowsToRemove[i];
				removeIndex = arrows.indexOf(arrow);
				arrows.splice(removeIndex,1);
			}
		};
		this.draw = draw;
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
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('PerlinBlocks', [PerlinBlocks]);

	function PerlinBlocks(){

		this.draw = function(){

		};
		
		this.interact = function(){

		};
	};

}(angular));;(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.directive('navigation', ['Constants', Navigation]);

	function Navigation(Constants){
		return {
			restrict:'A',
			scope:{},
			templateUrl:'../src/nav/nav.tpl.html',
			replace:true,
			link:function(scope, element, attributes){
				scope.navSections = Constants.SECTIONS;
			}
		}
	};

}(angular));;(function(angular){
	'use strict';
	angular.module('workshop.portfolio').config(Routes);

	function Routes($locationProvider, $routeProvider){
		$routeProvider.when('/work', {
			templateUrl:'src/sections/work/projects.tpl.html'
		})
		.when('/about', {
			templateUrl:'src/sections/about/about.tpl.html'
		})
		.when('/', {
			templateUrl:'src/sections/work/projects.tpl.html'
		})
		.otherwise({redirectTo:'/'});
	};

}(angular));;(function(angular){
	'use strict';
	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'about';
		

		module.directive('about', ['AppContent', 'Constants', function(AppContent, Constants){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					console.log("constants:", Constants)
					
					AppContent.getContentForView(VIEW_NAME).then(bindViewData);

					function bindViewData(data){
						$scope.projectsData = data;
					}
				},
				link:function(scope, element, attrs){

				}
			}
		}]);
}(angular));;;;(function(angular){
	var module = angular.module('workshop.portfolio');	
		module.directive('imagePreview', ['$timeout', ImagePreview]);

	function ImagePreview($timeout){
		return {
			scope:true,
			restrict:'A',
			//require:'^project',
			link:function(scope, $element, attributes){
				var next,
					current,
					img1,
					img2,					
					timeoutID,					
					currentImageIndex = 0,
					RATE = 5000,					
					NEXT_CLASSES = 'next',
					CURRENT_CLASSES = 'current',
					data = ['/data/projects/1.jpg', '/data/projects/2.jpg', '/data/projects/3.jpg', '/data/projects/4.jpg'];

				init();
				function init(){
					if(data){
						img1 = document.createElement('img');
						img2 = document.createElement('img');
						img1.setAttribute('class', NEXT_CLASSES);
						img2.setAttribute('class', CURRENT_CLASSES);
						angular.element(img1).on('load', onLoad);
						angular.element(img2).on('load', onLoad);
						$element.append(img1);
						$element.append(img2);
						next = img1;
						current = img2;
						load();
					}					
				}
				function load(){
					var url = data[currentImageIndex];
					
					next.src = url;
					currentImageIndex = currentImageIndex < data.length - 2 ? ++currentImageIndex : 0;
				}
				function onLoad(evt){
					swap();
					reset();
				}
				function reset(){
					timeoutID = $timeout(load, RATE);
				}
				function stop(){
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
					var h = current.clientHeight;
					$element[0].style.height = h + 'px';
				}
			}
		};
	};

}(angular));;(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio'),
		VIEW_NAME = 'projects';
 
		module.directive('projects', ['$window', 'AppContent', 'Constants', function($window, AppContent, Constants){
			return {
				restrict:'A',
				scope:true,
				controller:function($scope){
					
					$scope.projects = [];

					AppContent.getContentForView(VIEW_NAME).then(bindProjectData);
					
					function bindProjectData(data){
						$scope.projectsData = data;
					};

					this.addProject = function(project){
						$scope.projects.push(project);
					};
					
				},
				link:function(scope, $element){
					scope.currentFocusedProject;//needs containing object for faster bindings
					$window.addEventListener('scroll', highlightCurrentProject.bind(this));
					
					function highlightCurrentProject(){
						var projects = scope.projects,
							t = projects.length,
							i = 0,
							project,
							projectY,
							midPoint = $window.innerHeight / 2,
							_winY = $window.pageYOffset;

						for(i; i<t; i++){
							project = projects[i];
							projectY = project.element.offsetTop;

							if(scope.currentFocusedProject !== project.data && midPoint > projectY - _winY && midPoint < projectY + parseInt(project.element.offsetHeight, 10) - _winY){
								if(scope.currentFocusedProject) {
									//angular.element(currentFocusedProject).removeClass('selected');
								}
								scope.currentFocusedProject = project.data;
								//angular.element(currentFocusedProject).addClass('selected');								
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
				templateUrl:'../src/sections/work/project.tpl.html',
				require:'^projects',
				link:function(scope, element, attrs, controller){
					controller.addProject({element:element[0], data:scope.project});
				}
			}
		}]);

}(angular));