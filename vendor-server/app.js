var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const googleStrategy = require('passport-google-oauth20').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const User =require('./models/user');

var app = express();

dotenv.config();

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
	console.log('connected to mongodb');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
	secret: process.env.SESSION_KEY,
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:24*60*60*1000,
	}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new googleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
			scope: ['profile','email'],
		},
		async function (accessToken, refreshToken, profile, callback) {
			try {
				console.log('profile',profile);
				const existingUser = await User.findOne({googleId:profile.id});
				if (existingUser) {
					return callback(null, existingUser);
				}
				const newUser = new User({
					googleId: profile.id,
					displayName: profile.displayName,
					email:  profile.emails[0].value,
					profilePicture: profile.photos[0].value,
				});
				await newUser.save();
				return callback(null, newUser);
			}catch(error){
				return callback(error, null);
			}
		}
	)
);

passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
	origin:`${process.env.CLIENT_URL}`,
	methods:"GET,POST,UPDATE,DELETE",
	credentials:true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
