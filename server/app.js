const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');


require('./Models/User');
require('./Models/UserCredential');
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app = express();
app.use(cors());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/spotifyDataRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/dist/server/client/index.html'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,"dist", "server", "client", "index.html"));
    });
}

let PORT = process.env.PORT || 5000;

app.listen(PORT);

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});
