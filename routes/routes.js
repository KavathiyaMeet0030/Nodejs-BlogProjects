const express = require('express');
const controlToRoute = require('../controllers/controller')
const routes = express.Router();
const passport = require('../config/passport');
const isAuth = require('../Middleware/IsAuth');



routes.get('/',isAuth, controlToRoute.defaultController);
routes.get('/signup',controlToRoute.signupController);
routes.post('/signup', controlToRoute.postSignupController);
routes.get('/login',controlToRoute.loginController);
routes.get('/logout',controlToRoute.logoutController);
routes.get('/addblog',controlToRoute.addblogController);
routes.post('/login',passport.authenticate('local', { failureRedirect: '/login' }) ,controlToRoute.PostLoginController);


module.exports = routes;