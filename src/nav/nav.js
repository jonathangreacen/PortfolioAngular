(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.directive('navigation', ['$window', '$location', 'Constants', Navigation]);
		module.directive('navButton', [NavButton]);

	function Navigation($window, $location, Constants){
		return {
			restrict:'A',
			scope:true,
			templateUrl:'../src/nav/nav.tpl.html',
			replace:true,
			controller:function($scope){
				$scope.navigateTo = function(sectionData){
					var url = sectionData.url;
					$scope.currentSectionUrl = url;
					$location.path( url );
					if($window.ga){
						$window.ga('send', 'pageview', { page: $location.url() });
					}
				}
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

}(angular));