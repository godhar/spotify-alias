# Pavi-Phi  the Spotify Alias

This MEAN stack application authenticates the user with the OAuth method using Spotify. Specifically it uses PassportJs
with the SpotifyStrategy, which grants the application permission to make certain API requests to the users
Spotify account.

This OAuth model is token based, so the application saves the refresh token.

The the user only needs to grant the **Pavi-Phi** application access once. The refresh token is then used
to get a new access token once it has expired.

##MVP
* Read playlists
* Listen to a playlist's tracks
* Delete a track from a playlist
* Search Spotify for tracks, albums or artists
* Get **top-tracks** for searched entity
* Listen to **top-tracks**
* Add a searched track or top-track to a playlist
