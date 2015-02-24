//Base application
(function(angular){
	'use strict';
	setTimeout(function(){document.body.className += ' js';}, 50);
	var module = angular.module('workshop.portfolio', ['ngRoute', 'ngSanitize']);
}(angular));