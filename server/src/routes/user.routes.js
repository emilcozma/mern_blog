const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const Authorization = require('../middlewares/authorization');

//login user
router.route('/login').post(UserController.loginValidator, UserController.login);

//logout user
router.route('/logout').get(Authorization.verify, UserController.logout);

//add user
router.route('/register').post(UserController.registerValidator, UserController.register);

//get user info based on token
router.route('/info').get(Authorization.verify, UserController.getInfo);

module.exports = router;
