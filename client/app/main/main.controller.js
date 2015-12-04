'use strict';

angular.module('weebyChatApp')
  .controller('MainCtrl', function ($scope, $http, $state) {
  	$state.go('.default');
  });
