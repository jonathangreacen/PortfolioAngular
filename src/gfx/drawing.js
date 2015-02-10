(function(angular){
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
				i = 0, 
				hex;
			for(; i<fragments; i++){
				grades.push( this.combineRGB(c1.r + mix.r*i, c1.g + mix.g*i, c1.b + mix.b*i) );
			}
			return grades;
		};
		return this;
	}

}(angular));