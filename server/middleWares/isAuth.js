module.exports = (req, res, next) => {

    if (req.user) {
        return next();
    }
    return res.redirect('https://glacial-anchorage-42735.herokuapp.com/login');
};
