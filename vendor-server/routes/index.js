var express = require('express');
const app = express();
var router = express.Router();
// import passport from 'passport';
const vendor_controller = require('../controllers/vendorController');
const {login, logout, login_failed, login_success, authenticate_Method} = require('../controllers/authController');

router.get('/', vendor_controller.index);

router.get('/auth/google/callback', login);

router.get('/auth/login/failed', login_failed);

router.get('/auth/logout', logout);

router.get('/auth/login/success', login_success);

router.get('/auth/google/', authenticate_Method);

router.get('/vendor/create', vendor_controller.vendor_create_get);

router.post('/vendor/create', vendor_controller.vendor_create_post);

router.get('/vendor/:id/delete', vendor_controller.vendor_delete_get);

router.post('/vendor/:id/delete', vendor_controller.vendor_delete_post);

router.get('/vendor/:id/update', vendor_controller.vendor_update_get);

router.post('/vendor/:id/update', vendor_controller.vendor_update_post);

router.get('/vendor/:id', vendor_controller.vendor_detail);

router.get('/vendors', vendor_controller.vendor_list);

app.use((req, res, next) => {
	res.status(404).render('error', { message: 'Not Found', error: {} });
});


module.exports = router;
