const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//@route GET api/posts/test
//@desc  Tests post route
//@access Public
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

//@route GET api/posts
//@desc  GET posts
//access Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404))
});

//@route GET api/posts/:id
//@desc  GET post by id
//access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No post found with that ID' })
        );
});

//@route Post api/posts
//@desc  Create post
//access Public
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new this.post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

//@route DELETE api/posts/:id
//@desc  DELETE post
//access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ noauthorized: 'User not authoried' });
                    }

                    //Delete
                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ nopostsfound: 'No post found with that ID' })
                );
        })
});

//@route  POST api/posts/like/:id
//@desc   Like post
//@access Private
router.get('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this post' });
                    }

                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json())
                })
                .catch(err => res.status(404).json({ nopostsfound: 'No post found with that ID' })
                );
        })
});

module.exports = router;