const postInvite = async(req, res) => {
    const { targetMailAddress } = req.body;

    return res.send('request passed');
};

module.exports = postInvite;