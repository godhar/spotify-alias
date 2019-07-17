const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    spotifyId: String,
    accessToken: String,
    refreshToken: String,
    name: String
});


mongoose.model('users', userSchema);

