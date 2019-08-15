# Pavi-Phi  the Spotify Alias

This Node Angular application intends to authenticate the user with the OAuth method using Spotify. Specifically it uses the PassportJs
with the SpotifyStrategy which grants the application permission to make certain API requests to the users
Spotify account.

This OAuth model is token based, so the application saves the refresh token.

The the user only needs to grant **Pavi-phi** access once. The refresh token is then used
to get a new access token from Spotify once it has expired.

##MVP
* Read playlists
* Listen to playlist tracks
* Delete track from playlist
* Search Spotify for tracks, albums, artists
* Get **top-tracks** for searched entity
* Listen to **top-tracks**
* Add a top-track to a playlist
