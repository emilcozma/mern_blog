const mongoose = require('mongoose');
const host = process.env.MONGO_DB_HOST || 'mongodb://127.0.0.1';
const port = process.env.MONGO_DB_PORT || 27017;

mongoose
	.connect(host + ':' + port + '/' + process.env.MONGO_DB_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(e => {
			console.error('Connection error', e.message)
	});

const db = mongoose.connection;

module.exports = db;
