/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const passport = require('passport');

exports.login = (req, res, next) => {
	try{
		console.log('Entering login route');
		passport.authenticate('google', { successRedirect: process.env.CLIENT_URL, failureRedirect: '/login/failed', failureFlash: true })(req, res, next);
	} catch(error) {
		console.error('Error in Google OAuth callback:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.login_failed = (req, res, next) => {
	res.status(401).json({
		error:true,
		message:'login failed',
	});
};

exports.login_success = (req, res, next) => {
	console.log(req.user);
	if (req.user) {
		res.status(200).json({
			error: false,
			message: 'successfully logged in',
			user: req.user,
		});
	} else {
		res.status(403).json({
			error: true,
			message: 'Not authorized',
		});
	}
};

exports.authenticate_Method = (req, res, next) => {
	passport.authenticate('google',['profile', 'email'])(req, res, next);
};

exports.logout = (req, res, next) => {
	req.logout(function(err){
		if(err) {return next(err);}
	});
	res.redirect(process.env.CLIENT_URL);
};