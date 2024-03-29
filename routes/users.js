const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Student = require('../models/student');


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome..!!!');
            res.redirect('/students');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/students';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/studentlogin', (req, res) => {
    res.render('users/studentlogin');
});

router.post('/studentlogin', passport.authenticate('local', { failureFlash: true, failureRedirect: '/studentlogin' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/showstudent/:id';
    req.flash('success', 'Welcome..!!!');
    res.redirect(redirectUrl);
});



router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
})

module.exports = router;