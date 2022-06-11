const connectedUsers = new Map();

let io = null;

const setSocketSeverInstance = (ioInstance) => {
    io = ioInstance;
};

const getSocketServerInstance = () => {
    return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId });
    console.log('new connected user');
    console.log(connectedUsers);
};

const removeConnectedUser = ({ socketId }) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log(connectedUsers);
    }
};

const getActiveConnections = (userId) => {
    const activeConnections = [];

    connectedUsers.forEach(function(key, value) {
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    });

    return activeConnections;
};

const getOnlineUsers = () => {
    const onlineUsers = [];

    connectedUsers.forEach((value, key) => {
        onlineUsers.push({ socketId: key, userId: value.userId });
    });

    return onlineUsers;
};

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketSeverInstance,
    getSocketServerInstance,
    getOnlineUsers,
};