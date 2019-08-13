# spotify-alias

This project implements OAUTH2 and the passport strategy to allow access to the spotify API. The auth flow allows users to 
confirm approval to their data for updates to their public/private playlists. For this I used PassportJS and the 
Spotify-Strategy.I then use cookie-session for authentication between the angular client and node server.

For storing the refresh and access token I use MongoDB. 

For the UI I have leveraged Material UI components and their rich features. One of which is the rxjs Auto-Complete which I use
to allow a search operation over the spotify API for artists, albums or tracks.

The MVP allows logged in users to -

* read their playlists
* search albums, artists, tracks
* view top-tracks from artists, albums
* listen to a track with an external link
* update a playlist with a track
* delete a track from a playlist
