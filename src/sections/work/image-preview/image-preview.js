(function(angular){
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
					NEXT_CLASSES = 'next invisible',
					CURRENT_CLASSES = 'current front visible',
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
					timeoutID.cancel();//or something like that
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

}(angular));