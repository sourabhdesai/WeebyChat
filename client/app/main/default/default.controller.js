'use strict';

angular.module('weebyChatApp')
  .controller('DefaultCtrl', function ($scope, $state) {
    $scope.room = '';

    $scope.openRoom = () => {
    	$state.go('chat', {
    		'roomname': $scope.room
    	});
    };
  });
