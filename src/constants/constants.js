(function(angular){
	var module = angular.module('workshop.portfolio');	
		module.service('Constants', Constants);

	function Constants(){
		this.API_PATH 		= 'content/';
		this.DEFAULT_VIEW 	= 'projects';
		this.API_TYPE 		= 'json';
		this.SECTIONS 		= [{label:'WORK',value:'projects',url:'/work'}, {label:'ABOUT',value:'about',url:'/about'}, {label:'CODE',value:'code',url:'/code'}, {label:'CONTACT',value:'contact',url:'/contact'}];
	};

}(angular));