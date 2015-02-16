(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.directive('navigation', ['$window', '$location', 'Constants', Navigation]);
		module.directive('navButton', [NavButton]);

	function Navigation($window, $location, Constants){
		return {
			restrict:'A',
			scope:{},
			templateUrl:'../src/nav/nav.tpl.html',
			replace:true,
			controller:function($scope){
				this.navigateTo = function(sectionData){
					var url = sectionData.url;
					$scope.currentSectionUrl = url;
					$location.path( url );
				}
			},
			link:function(scope, $element, attributes){
				var expanded = false,
					retractYPosition = 120;
				scope.navSections = Constants.SECTIONS;
				scope.currentSectionUrl = $location.url();
				

				onScroll();
				angular.element($window).bind('scroll', onScroll);
				function onScroll(evt){
					if(expanded === true && $window.pageYOffset > retractYPosition){
						expanded = false;
						$element.removeClass('expanded');
					}else if(expanded === false && $window.pageYOffset < retractYPosition){
						expanded = true;
						$element.addClass('expanded');
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
					controller.navigateTo(sectionData);
				}
			}
		}
	};

}(angular));