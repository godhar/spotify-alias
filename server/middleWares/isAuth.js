module.exports = (req, res, next) => {

    if (req.user) {
        return next();
    }
    return res.redirect('http://locahost:4200/login');
    // return res.redirect('https://glacial-anchorage-42735.herokuapp.com/login');
};
