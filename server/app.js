const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


require('./Models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());



// const keys = require('config/keys');
// const axios = require('axios');
// const queryString = require('querystring');
// const SpotifyWebApi = require('spotify-web-api-node');


require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT);

