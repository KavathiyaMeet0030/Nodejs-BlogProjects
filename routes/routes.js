const express = require('express');
const controlToRoute = require('../controllers/controller')
const routes = express.Router();



routes.get('/', controlToRoute.defaultController);
routes.get('/signup', controlToRoute.signupController);
routes.post('/signup', controlToRoute.postSignupController);
routes.get('/login', controlToRoute.loginController);
routes.get('/profile', controlToRoute.profileController);
routes.post('/login', controlToRoute.PostLoginController);


module.exports = routes;