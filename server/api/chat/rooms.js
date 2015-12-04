var _ = require('lodash');

var rooms = {}; // hash from roomname -> Room object

var Room = function (name, io) {
	this.name = name;
	this.messages = [];
	this.members = {};
	this.io = io;

	// gives list of member names
	Room.prototype.getMembers = function () {
		return _.keys(this.members);
	};

	Room.prototype.hasMembers = function () {
		return ! (_.isEmpty(this.members));
	};

	// Cleans up internal hash by removing this member's entry
	Room.prototype.removeMember = function (memberName) {
		if (_.has(this.members, memberName)) {
			var memberSocket = this.members[memberName];
			memberSocket.leave(this.name);
			delete this.members[memberName];
		}
	};

	Room.prototype.addMember = function (memberName, socket) {
		socket.join(this.name);

		socket.on('disconnect', () => {
			this.removeMember(memberName);

			if (this.hasMembers()) {
				// Alert other members of this member's departure
				this.io.to(this.name).emit('departure', {
					'name': memberName
				});
			} else {
				// if room is empty, remove it from the internal hash.
				// since thats the only reference to it, this Room object will be garbage collected
				delete rooms[this.name];
			}
		});

		socket.on('message', msg => {
			msg.stamp = _.size(this.messages);
			this.messages.push(msg);
			this.io.to(this.name).emit('message', msg);
		});

		this.members[memberName] = socket;

		this.messages.forEach(message => {
			socket.emit('message', message);
		});
	};

	Room.prototype.generateMemberName = function () {
		return 'Guest-' + _.size(this.members);
	};
};

exports.getRoom = function (roomName, io) {
	rooms[roomName] = rooms[roomName] || new Room(roomName, io);
	return rooms[roomName];
};