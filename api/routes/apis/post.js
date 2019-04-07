const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const uploadFiles = require("../../uploadImage/multer");
const cloudinary = require("cloudinary");
require("../../uploadImage/cloudinary");

//Post database
const Post = require("../../models/Post");

//Profile database
const Profile = require("../../models/Profile");

//validation
const validatePostInput = require("../../validation/post");

//GET api/posts/test
//Test Post route
//access Public

router.get("/test", (req, res) =>
  res.json({
    msg: "Posts works"
  })
);

//GET api/posts/
//Get Post
//access Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(404).json({ error: true, messages: [err] });
  }
});

//GET api/posts/:id
//Get Post
//access Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: true, messages: [err] });
  }
});

//Post api/post
//Create Post
//Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  uploadFiles.single("image"),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    try {
      //Check Validation
      if (!isValid) {
        //if any error
        return res.status(400).json({ error: true, messages: errors.messages });
      }

      var newPost = {};
      if (req.file) {
        //Upload image on Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        newPost = new Post({
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          imageUrl: result.secure_url,
          imageId: result.public_id
        });
      } else {
        newPost = new Post({
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        });
      }
      const post = await newPost
        .save()
        .catch(err => res.status(400).json({ error: true, messages: [err] }));

      const profile = await Profile.findOne({ user: req.user.id }).catch(err =>
        res.status(400).json({ error: true, messages: [err] })
      );

      if (post.user.toString() === req.user.id) {
        profile.posts.unshift(post);
        //save Profile
        const profileSave = await profile.save();
        res.json(post);
        // console.log(profileSave)
      }
    } catch (err) {
      res.status(500).json({ error: true, messages: [err] });
    }
  }
);

//Delete api/post/:id
//Delete Post
//Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).catch(err =>
      res
        .status(404)
        .json({ error: true, messages: [`Can't find the profile`] })
    );

    const post = await Post.findById(req.params.id).catch(err =>
      res.status(404).json({ error: true, messages: [`Post not found`] })
    );

    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: true, messages: ["User not authorized"] });
    }

    //Delete from cloudinary
    if (post.imageId) {
      await cloudinary.v2.uploader
        .destroy(post.imageId)
        .catch(err =>
          res
            .status(400)
            .json({ error: true, messages: [`Error in deleting image`] })
        );
    }

    //Delete from Post model
    await post
      .remove()
      .catch(err =>
        res
          .status(400)
          .json({ error: true, messages: [`Error in deleting image`] })
      );

    //Delete from Profile Model
    const postFromProfile = profile.posts
      .map(item => item.id)
      .indexOf(req.params.id);
    profile.posts.splice(postFromProfile, 1);

    await profile
      .save()
      .catch(err => res.status(400).json({ error: true, messages: [err] }));

    res.json({ success: true });
  }
);

module.exports = router;
