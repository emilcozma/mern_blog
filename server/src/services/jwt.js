const jwt = require('jsonwebtoken');

sign = async (payload, callback) => {
	// Token signing options
	const signOptions = {
		expiresIn:  process.env.JWT_EXPIRATION
	};

	let done;

  if (callback) {
    done = callback;
  } else {
    done = function(err, data) {
      if (err) throw err;
      return data;
    };
  }
	
	try{
		return done(null, await jwt.sign(payload, process.env.JWT_SECRET, signOptions));
	} catch (err) {
		return done(err);
	}
}

verify = async (token, callback) => {

	const verifyOptions = {
		expiresIn:  process.env.JWT_EXPIRATION
	};

	let done;

  if (callback) {
    done = callback;
  } else {
    done = function(err, data) {
      if (err) throw err;
      return data;
    };
  }

	try{
		return done(null, await jwt.verify(token, process.env.JWT_SECRET, verifyOptions));
	} catch (err) {
		return done(err);
	}
}

decode = async (token) => {
	return await jwt.decode(token, {complete: true});
	//returns null if token is invalid
}

module.exports = {
  sign,
	verify,
	decode
};