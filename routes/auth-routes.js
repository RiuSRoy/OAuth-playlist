const router = require('express').Router();
const passport = require('passport');
const authenticate = require('../authenticate');

// auth login
router.route('/login')
.get((req,res) => {
    res.render('login' , {user : req.user});
});

//auth with google
router.get('/google' , passport.authenticate('google', {
    scope : ['profile']
}));

//auth logout
router.route('/logout')
.get((req,res) => {
    res.send('logging out');
});

router.get('/google/redirect' ,passport.authenticate('google'), (req,res) => {
    if(req.user) {
        var token = authenticate.getToken({_id : req.user._id});
        res.json({
            token : token,
            user : req.user,
            status : "Tou are successfully logged in !"
        });
    }
    //res.send(req.user);
})
module.exports = router;
