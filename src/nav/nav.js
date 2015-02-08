(function(angular){
	'use strict';
	
	var module = angular.module('workshop.portfolio');	
		module.directive('navigation', ['$location', 'Constants', Navigation]);
		module.directive('navButton', [NavButton]);

	function Navigation($location, Constants){
		return {
			restrict:'A',
			scope:{},
			templateUrl:'../src/nav/nav.tpl.html',
			replace:true,
			controller:function(){
				this.navigateTo = function(sectionData){
					var url = sectionData.url;
					$location.path( url );
				}
			},
			link:function(scope, element, attributes){
				scope.navSections = Constants.SECTIONS.reverse();
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