module.exports = (req, res, next) => {

    if (req.user) {
        return next();
    }
    console.log('no user session ', req)
    return res.redirect('/auth/spotify');
};
