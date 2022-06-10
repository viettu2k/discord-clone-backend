const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postReject = async(req, res) => {
    try {
        const { id } = req.body;
        const { userId } = req.user;

        // remove that invitation from friend invitations collection
        const invitationExits = await FriendInvitation.exists({ _id: id });
        if (!invitationExits) {
            await FriendInvitation.findByIdAndDelete(id);
        }

        // update pending invitations
        friendsUpdate.updateFriendsPendingInvitations(userId);

        return res.status(200).send('Invitation successfully rejected.');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong please try again.');
    }
};

module.exports = postReject;