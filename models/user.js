const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail: {
        type: String,
        unique: true,
    },
    username: { type: String },
    password: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('user', userSchema);