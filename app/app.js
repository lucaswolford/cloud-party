(function(){
	'use strict';

	angular.module('new-app', [ 'ngRoute','new-app-main','templates' ])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
	  
})();