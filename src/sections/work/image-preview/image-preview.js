(function(angular){
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

}(angular));