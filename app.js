const express = require('express');
var passport = require('passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes'); 
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

const app = express();

app.set('view engine' , 'ejs');

mongoose.connect(keys.mongodb.MONGODB_URI , () => {
    console.log('Connected to mongodb');
});

app.use(passport.initialize());

app.use('/auth' , authRoutes);

app.get('/' , (req,res) => {
    res.render('home');
})
app.listen(3000 , () => {
    console.log('app now listening for rquests on port 3000');
})