const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const Authorization = require('../middlewares/authorization');

// Get all Posts
router.route('/').get(PostController.getPosts);

// Get one post by cuid
router.route('/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/').post(Authorization.verify, PostController.addPostValidator, PostController.addPost);

// Delete a post by cuid
router.route('/:cuid').delete(Authorization.verify, PostController.deletePost);

module.exports = router;
