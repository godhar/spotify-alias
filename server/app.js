const express = require('express');
const axios = require('axios');
const queryString = require('querystring');
const keys = require('./config/keys');
const SpotifyWebApi = require('spotify-web-api-node');
 


const app = express();


app.get('/login', function(req, res){

// let appState = generateRandomString(16);


// var cookieParser = require('cookie-parser');
// var session = require('express-session');

// app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));



// app.get('/', function(req, res){
//    if(req.session.page_views){
//       req.session.page_views++;
//       res.send("You visited this page " + req.session.page_views + " times");
//    } else {
//       req.session.page_views = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });

// res.cookie('spotify_auth_cookie', appState);

// axios.get('https://accounts.spotify.com/authorize?' +
//     queryString.stringify({
//       response_type: 'code',
//       client_id: config.client_id,
//       scope: config.scope,
//       redirect_uri: config.redirect_uri,
//       state: appState

//     })).catch(error => {
//     console.log(error);
//   });
// });

// app.get('/auth_grant_callback', function(req, res) {
//     let state = req.query.state || null;
//     let code = req.query.code || null;

//     if(req.error) {
//         //handle bad auth for browser
//     }
//     if(code) {
//         axios.post('https://accounts.spotify.com/api/token?grant_type=authorization_code&code=' + code +
//         '&redirect_uri=' + config.redirect_uri, 
//         { headers: {
//             'Authorization': 'Basic ' + btoa(config.client_id + ':' + config.client_secret) 
//         }
//     }).then( (res) =>  {

//     })
//     }

// });


// const generateRandomString = function(length) {
//   let text = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };


// app.listen(8888);