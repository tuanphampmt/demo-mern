const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    telephone: String,
    permissions: Number
}, {collection: 'user'});

module.exports = mongoose.model("user", UserSchema);