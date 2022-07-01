const serverStore = require('../serverStore');
const friendsUpdate = require('../socketHandlers/updates/friends');
const roomsUpdates = require('./updates/rooms');

const newConnectionHandler = async(socket, io) => {
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });

    // update pending friends invitations list
    friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

    // update friends list
    friendsUpdate.updateFriends(userDetails.userId);

    roomsUpdates.updateRooms(socket.id);

    setTimeout(() => {
        roomsUpdates.updateRooms(socket.id);
    }, [500]);
};

module.exports = newConnectionHandler;