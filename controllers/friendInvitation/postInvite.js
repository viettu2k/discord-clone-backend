const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');

const postInvite = async(req, res) => {
    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;

    // check if friend that we would like to invite is not user
    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res
            .status(409)
            .send('Sorry. You cannot become friend with yourself.');
    }

    const targetUser = await User.findOne({ mail: targetMailAddress });

    if (!targetUser) {
        return res
            .status(404)
            .send(
                `Friend of ${targetMailAddress} has not been found. Please check mail address.`
            );
    }

    // check if invitation has been already found
    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id,
    });

    if (invitationAlreadyReceived) {
        return res
            .status(409)
            .send(`You have already sent invitation to ${targetMailAddress}.`);
    }

    // check if the user which we would like to invite is already our friend
    const usersAlreadyFriends = targetUser.friends.find(
        (friendId) => friendId.toString() === userId.toString()
    );
    if (usersAlreadyFriends) {
        return res
            .status(409)
            .send(`Friend already added. Please check friends list.`);
    }

    // create new invitation in database
    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    });

    // if invitation has been successfully created we would like to update friends invitations
    return res.status(201).send('Invitation has been sent.');
};

module.exports = postInvite;