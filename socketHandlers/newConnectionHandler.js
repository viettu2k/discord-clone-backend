const serverStore = require('../serverStore');

const newConnectionHandler = async(socket, _) => {
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });
};