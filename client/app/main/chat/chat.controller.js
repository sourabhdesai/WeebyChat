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
  	$scope.setUsername = username => {
	    $scope.user = {
	    	'name': username,
	    	'message': '' // initially no message has been typed by user
	    };

	    $scope.ready = true;
  	};

    function addToMessageList(message) {
		$scope.messages.push(message);
		// Filter duplicate messages and sort them by stamp ordering
		_.unique($scope.messages, 'stamp');
		_.sortBy($scope.messages, 'stamp');
		$scope.$digest();
    }

    var socket = io({
    	'query': 'room=' + $scope.roomname
    });
    
    socket.on('connect', function () {
    });

	socket.on('username', username => {
		$scope.setUsername(username);
		$scope.$digest();
	});

	socket.on('message', message => {
		message.type = 'msg';
		addToMessageList(message);
	});

	socket.on('departure', message => {
		message.type = 'departure';
		addToMessageList(message);
	});

    $scope.sendMessage = () => {
    	// Emit the message via the socket
    	if ($scope.ready) {
	    	socket.emit('message', {
	    		'name': $scope.user.name,
	    		'value': $scope.user.message
	    	});

	    	$scope.user.message = '';
    	}
    };
  });
