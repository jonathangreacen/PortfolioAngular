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
	};

}(angular));;(function(angular){
	'use strict';

	var module = angular.module('workshop.portfolio');	
		module.directive('gfx', ['Constants', GFX]);

	function GFX(Constants){
		return {
			restrict:'A',
			scope:{},
			replace:true,
			link:function(scope, element, attributes){
				
			}
		}
	};

}(angular));;(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.service('LogarithmicUniverse', [LogarithmicUniverse]);

	function LogarithmicUniverse(){

		this.draw = function(){

		};
		
		this.interact = function(){

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
					AppContent.getContentForView(VIEW_NAME).then(bindProjectData);

					function bindProjectData(data){
						$scope.projectsData = data;
					};

					this.addProject = function(ele){
						//console.log('addProject()', ele);
					};
				},
				link:function(scope, element, attrs){

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
					controller.addProject(element);
				}
			}
		}]);

}(angular));