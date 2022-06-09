const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async(userId) => {
    try {
        const pendingInvitations = await FriendInvitation.find({
            receiverId: userId,
        }).populate('senderId', '_id username mail');

        // find all active connections of specific user
        const receiverList = serverStore.getActiveConnections(userId);

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
            io.to(receiverSocketId).emit('friend-invitation', {
                pendingInvitations: pendingInvitations ? pendingInvitations : [],
            });
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = { updateFriendsPendingInvitations };