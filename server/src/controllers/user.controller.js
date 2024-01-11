const { validationResult, check } = require("express-validator");
const bcrypt = require('bcryptjs');
const sanitizeHtml = require('sanitize-html');
const User = require('../models/user');
const jwtService = require('../services/jwt');
const validatorParserUtils = require('../utils').ValidatorParser;

const passwordMinLength = 8;

loginValidator = [
	check('user.email')
		  .trim().notEmpty().withMessage('Username is required.')
		  .isEmail().withMessage('Not a valid e-mail address.')
		  .custom(async (value) => {
			  return await User.findOne({ email: value }).then((user) => {
				  if (!user) {
						  return Promise.reject('Email is not registered.');
				  }
			  });
		  }),
	check('user.password')
		  .trim().notEmpty().withMessage('Password is required.')
		  .custom(async (value, {req}) => {
			  const email = req.body.user.email;
			  const user = await User.findOne({ email });
			  if(user){
				  return await user.checkPassword(value).then((passwordMatch) => {
					  if (!passwordMatch) {
							  return Promise.reject('Password do not match.');
					  }
				  });
			  }
		  }),
  ];
  
  /**
   * Login a user
   * @param req
   * @param res
   * @returns void
   */
  login = async (req, res) => {
	  //get email and password value from request
	  const { email, password } = req.body.user;
	  //validate request values
	  const validationErrors = validationResult(req);
	  if (validationErrors.isEmpty()) {
		  try {
			  // check if the user exists
			  const user = await User.findOne({ email });
  
			  // return jwt
			  const payload = {
				  user: {
					  _id: user._id
				  }
			  };
  
			  await jwtService.sign(payload, async (err, token) => {
				  //
				  if (err) throw err;
				  //
				  const decodedToken = await jwtService.decode(token);
				  user.addToken({ token, host:req.get('host'), signedAt: decodedToken.payload.iat, expiresAt: decodedToken.payload.exp});
				  await user.save();
				  //
				  res.status(200).json({ token });
			  });
		  } catch (err) {
			  res.status(500).send(err);
		  }
	  } else {
		  return res.status(422).json({ errors: validatorParserUtils.errorMap(validationErrors) });
	  }
  }
  
  /**
   * Logout a user
   * @param req
   * @param res
   * @returns void
   */
  logout = async (req, res) => {
	  try {
		  //
		  req.authentificatedUser.removeToken(req.authorizationToken);
		  await req.authentificatedUser.save();
		  //
		  res.status(200).json({ msg: 'Logout succesfull.' });
	} catch (err) {
	  res.status(500).json(err);
	}
  }
  
  module.exports = {
	  loginValidator,
	login,
	  logout
  };
  

registerValidator = [
	check('user.email')
		.trim().notEmpty().withMessage('Username is required.')
		.custom(async (value) => {
			return await User.findOne({ email: value }).then((user) => {
				if (user) {
						return Promise.reject('Username already registered.');
				}
			});
		}),
	check('user.password').isLength({ min: passwordMinLength }).withMessage('Password must be at least ' + passwordMinLength + ' characters.')
];

/**
 * Signup a user
 * @param req
 * @param res
 * @returns void
 */
register = async (req, res) => {
	const { email, name, password } = req.body.user;
	//validate request values
	const validationErrors = validationResult(req);
	if (validationErrors.isEmpty()) {
		try {
			// create new user
			user = new User({
				email: sanitizeHtml(email),
				name: sanitizeHtml(name)
			});
			await user.setPassword(password);
			await user.save();
			//
			res.status(201).json({ user });
		} catch (err) {
			res.status(500).send(err);
		}
	} else {
		return res.status(422).json({ errors: validatorParserUtils.errorMap(validationErrors) });
	}
}

/**
 * Get user info
 * @param req
 * @param res
 * @returns void
 */
getInfo = async (req, res) => {
  try {
		//
    const user = await User.findById(req.authentificatedUser._id).select('-password -tokens');
		//
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
	loginValidator,
	login,
	logout,
	registerValidator,
  	register,
  	getInfo
};
