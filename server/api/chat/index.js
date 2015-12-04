'use strict';

var rooms = require('./rooms');

module.exports = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {
	  var roomName = socket.handshake['query']['room'];
	  console.log(`roomName ${roomName}`);
	  var room = rooms.getRoom(roomName, io);
	  
	  var memberName = room.generateMemberName();
	  room.addMember(memberName, socket);

	  socket.emit('username', memberName);
	});
};