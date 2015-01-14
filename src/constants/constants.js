(function(angular){
	var module = angular.module('workshop.portfolio');	
		module.service('Constants', Constants);

	function Constants(){
		this.API_PATH 		= 'data/';
		this.DEFAULT_VIEW 	= 'projects';
		this.API_TYPE 		= 'json';
		this.SECTIONS 		= [{label:'WORK',value:'projects'}, {label:'ABOUT',value:'about'}, {label:'CODE',value:'code'}, {label:'CONTACT',value:'contact'}];
	};

}(angular));