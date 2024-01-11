const jwtService = require('../services/jwt');
const User = require('../models/user');

/**
 * Verify JWT token
 * @param req
 * @param res
 * @param next
 * @returns void
 */
verify = (req, res, next) => {
	// Get token from header
  let token = req.header('x-auth-token') || req.header('authorization') || req.header('Authorization');

	// Check if token exist
	if(token){
		// Remove Bearer from string
		token = token.replace(/^Bearer\s+/, "");
	} else {
		//if no token
		return res.status(401).json({ msg: 'No token, authorization denied.' });
	}

  // Verify token
  try {
		jwtService.verify(token, async (error, decoded) => {
      if (error) {
				//token is not a valid JWT
        return res.status(401).json({ msg: 'Token is not valid.' });
      } else {
				req.authorizationToken = token;
        req.authentificatedUser = await User.findById(decoded.user._id).select();
				//check if token is present in list
				const userTokens = await User.find({$and: [{_id:req.authentificatedUser._id}, {tokens: {$elemMatch: {token:req.authorizationToken}}} ]}).select('tokens');
				if (!userTokens.length) {
					//token is not present in the list
					return res.status(401).json({ msg: 'Token is not valid.' });
				}
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error.' });
  }
}

module.exports = {
  verify
};