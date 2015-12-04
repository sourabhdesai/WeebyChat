'use strict';

angular.module('weebyChatApp')
  .controller('ChatCtrl', function ($scope, $stateParams, $state, io, _) {

  	// Extract roomname from url
    if (! (_.has($stateParams, 'roomname')) ) {
    	alert(`Need to enter a room like so: '/chat/<roomname>'`);
    	$state.go('main');
    } else {
    	$scope.roomname = $stateParams.roomname;
    }

    $scope.ready = false;
    $scope.messages = [];

    // Called once the users username has been resolved
  	$scope.setDefaults = username => {
	    $scope.user = {
	    	'name': username,
	    	'message': '' // initially no message has been typed by user
	    };

	    $scope.ready = true;
  	};

    var socket = io({
    	'query': 'room=' + $scope.roomname
    });
    
    socket.on('connect', function () {
    	socket.on('username', username => {
    		$scope.setDefaults(username);
    		$scope.$digest();
    	});

    	socket.on('message', function (message) {
    		console.log(`got message ${JSON.stringify(message)}`);
    		$scope.messages.push(message);
    		_.sortBy($scope.messages, 'stamp');
    		$scope.$digest();
    	});
    });

    $scope.sendMessage = () => {
    	if ($scope.ready) {
	    	socket.emit('message', {
	    		'name': $scope.user.name,
	    		'value': $scope.user.message
	    	});
    	}
    };
  });
