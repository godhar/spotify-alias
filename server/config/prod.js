module.exports = {
    spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: "user-read-private user-read-email",
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}
