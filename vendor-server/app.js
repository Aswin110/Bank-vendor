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
const compression = require("compression");
const helmet = require("helmet");
const RateLimiter = require('express-rate-limit');
const MongoStore = require('connect-mongo');

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

app.use(helmet());

const limiter = RateLimiter({
	windowMs:1*60*1000,
	max:60,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
	secret: process.env.SESSION_KEY,
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:24*60*60*1000,
	},
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI, 
		ttl: 24 * 60 * 60, 
	}),
}));

app.set('trust proxy', 1);
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
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
	origin:[`${process.env.CLIENT_URL}`, 'https://bank-vendor.vercel.app'],
	methods:"GET,POST,UPDATE,DELETE",
	credentials:true,
}));

app.use((req, res, next) => {
	const allowedOrigins = [process.env.CLIENT_URL , 'https://bank-vendor.vercel.app'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

app.use(limiter);

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
