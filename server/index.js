require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = process.env.APP_PORT || 3000;
const db = require('./src/db');
const posts = require('./src/routes/post.routes');
const users = require('./src/routes/user.routes');

app.use(cors({credentials: true, origin: process.env.CLIENT_URI + ':' + process.env.CLIENT_PORT}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public/files/temp`
  }));

app.use('/api/posts/', posts);

app.use('/api/users/', users);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
