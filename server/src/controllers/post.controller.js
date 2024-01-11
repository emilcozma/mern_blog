const { validationResult, check } = require("express-validator");
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const Post = require('../models/post');
const validatorParserUtils = require('../utils').ValidatorParser;

const cloudinaryService = require('../services/cloudinary');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
};

addPostValidator = [
  check('title')
		.trim().notEmpty().withMessage('Title is required.'),
  check('content')
		.trim().notEmpty().withMessage('Content is required.')
];

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
  //validate request values
	const validationErrors = validationResult(req);
	if (validationErrors.isEmpty()) {

		const newPost = new Post({
				title: sanitizeHtml(req.body.title),
				content: sanitizeHtml(req.body.content)
			});

		newPost.authorId = req.authentificatedUser._id;
		newPost.authorName = req.authentificatedUser.name;

		newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });

		if(req?.files?.image){
			const cloudImage = await cloudinaryService.handleUpload(req.authentificatedUser._id, req.files.image);
			newPost.image = cloudImage.secure_url;
		}
		
		newPost.cuid = cuid();
		newPost.save((err, saved) => {
			if (err) {
				res.status(500).send(err);
			}
			res.json({ post: saved });
		});
	} else {
		return res.status(422).json({ errors: validatorParserUtils.errorMap(validationErrors) });
	}
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  Post.findOne({ authorId:req.authentificatedUser._id, cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
};

module.exports = {
  getPosts,
	addPostValidator,
  addPost,
  getPost,
  deletePost
};
