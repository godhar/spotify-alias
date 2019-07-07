const keys = require('../config/keys');
const mongoose = require('mongoose');
const UserCredential = mongoose.model('userCredential');
const fetch = require('node-fetch');
const {URLSearchParams} = require('url');


export const getNewToken = async (user) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', user.refreshToken);
    console.log('closer to fetch post')

    const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: params,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${keys.spotifyClientID}:${keys.spotifyClientSecret}`).toString('base64'),
                'Accept': 'application/json'
            }
        },
    );

    const newAuthUserData = await response.json();

    if (response.status !== 200) {
        console.error(`Invalid response status ${response.status}.`);
        throw newAuthUserData;
    }
    user.accessToken = newAuthUserData['access_token'];
    await user.save();

    return newAuthUserData['access_token'];
};


export const getUserCredentials = async (user) => {
    return await UserCredential.findOne({userId: user.spotifyId});
}