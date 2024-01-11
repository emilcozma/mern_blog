const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new Schema({
    name: { type: 'String', required: true },
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
		tokens: [{ type: Object }]
});

userSchema.pre('save', async function(next) {

});

userSchema.methods.encryptPassword = async function (password) {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		throw new Error(error);
	}
};

userSchema.methods.checkPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

userSchema.methods.setPassword = async function (password) {
	try {
		this.password = await this.encryptPassword(password);
	} catch (error) {
		throw new Error(error);
	}
};

userSchema.methods.addToken = async function (token) {
	try {
		let oldTokens = this.tokens || [];
		if (oldTokens.length) {
				oldTokens = oldTokens.filter(t => (parseInt(Date.now().toString()) < parseInt(t.expiresAt) * 1000));
		}
		this.tokens = [...oldTokens, token];		
	} catch (error) {
		throw new Error(error);
	}
};

userSchema.methods.removeToken = async function (token) {
	const tokens = this.tokens;
	this.tokens = tokens.filter(t => t.token !== token);
};

module.exports = mongoose.model('User', userSchema);
