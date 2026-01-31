const db = require("../models/index");

const User = db.Users;
const Post = db.Posts;

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      userId: req.userId,
    });

    res
      .status(200)
      .json({ message: "Post created successfully", success: true, post });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", success: false });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
        include: User,
        attributes: {
            exclude: ['userId']
        }
    })
    res.status(200).json({ message: "All post", success: true, posts});
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", success: false });
  }
};

const getMyPosts = async (req, res) => {
  try {

    const post = await Post.findAll({
        where: { userId: req.userId}
    });

    res.status(200).json({ message: "User posts", success: true, post});

  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", success: false });
  }
};

module.exports = { createPost, getPosts, getMyPosts };
