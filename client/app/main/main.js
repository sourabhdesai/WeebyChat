'use strict';

angular.module('weebyChatApp')
  .config(function ($stateProvider) {
    $stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl'
	})
	.state('main.default', {
        url: '/default',
        templateUrl: 'app/main/default/default.html',
        controller: 'DefaultCtrl'
  	});
  });