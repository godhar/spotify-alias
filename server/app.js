const express = require('express');
// const axios = require('axios');
// const queryString = require('querystring');
// const SpotifyWebApi = require('spotify-web-api-node');


const app = express();


app.get('/', (req, res) => {

  res.send({hi: 'there'});
  // console.log('what the fuck?');
  // console.log(process.env);

  // var spotifyApi = new SpotifyWebApi({
  //   clientId: keys.client_id,
  //   clientSecret: keys.client_secret,
  //   redirectUri: keys.redirect_uri,
  //   state: keys.state
  // });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// app.get('/callback', (req, res) => {

//   /* Read query parameters */
//   var code = req.query.code; // Read the authorization code from the query parameters
//   var state = req.query.state; // (Optional) Read the state from the query parameter
//   console.log(req);
//   /* Get the access token! */
//   spotifyApi.authorizationCodeGrant(code)
//     .then(function (data) {
//       console.log('The token expires in ' + data['expires_in']);
//       console.log('The access token is ' + data['access_token']);
//       console.log('The refresh token is ' + data['refresh_token']);

//       /* Ok. We've got the access token!
//          Save the access token for this user somewhere so that you can use it again.
//          Cookie? Local storage?
//       */

//       res.cookie('spotify_token', data['access_token']);

//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);

//       /* Redirecting back to the main page! :-) */
//       res.redirect('/');

//     }, function (err) {
//       res.status(err.code);
//       res.send(err.message);
//     });
// });


// app.listen(8888);