const mongoose = require('mongoose');
const { Schema } = mongoose;

const userCredentialSchema = new Schema({
    userId: String,
    accessToken: String,
    refreshToken: String,
    name: String
});


mongoose.model('userCredential', userCredentialSchema);

