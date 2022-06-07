const User = require('../../models/user');

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

    return res.send('request passed');
};

module.exports = postInvite;