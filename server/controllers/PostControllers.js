import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import {createError} from "../middlewares/errorHandler.js";
import mongoose from "mongoose";

const PostControllers = {
  // create a new post
  async createPost(req, res,next) {

    const newPost = new Post(req.body);
    try {
      // save new  post in the database
      await newPost.save();
      // response new post
      res.status(201).json(newPost);
    } catch (err) {
     return next(err)
    }
  },

  // ===========================================find one user by id

  // get a new post by id
  async getOnePost(req, res, next) {
    const id = req.params.id;

    try {
      // search in the database
      const getPost = await Post.findById(id);
      if(!getPost) return next(createError(404, "No post found!"))
      // response get post
      res.status(201).json(getPost);
    } catch (err) {
      return next(err)
    }
  },

  // ===========================================find one user by id

  // get all post by id
  async getAllPost(req, res,next) {
    try {
      // search all post in the database
      const getAllPost = await PostModel.find();
      // response get all  post
      res.status(201).json(getAllPost);
    } catch (err) {
      return next(err)
    }
  },

  // ===========================================find one user by id

  //
  // updated post by id
  async updatePost(req, res, next) {
    const id = req.params.id;
    const { userId } = req.body;

    try {
      // search a post in the database
      const post = await Post.findById(id);

      if (post.userId === userId) {
        await post.updateOne({ $set: req.body });
        // response updated post
        res.status(201).json("post updated");
      } else {
        return next(createError(401,"Can't edit a post"))
      }
    } catch (err) {
      return next(err)
    }
  },

  // ===========================================find one user by id

  // find user by id
  //
  // delete a post by id
  async deletePost(req, res, next) {
    const id = req.params.id;
    const { userId } = req.body;

    try {
      // search a post in the database
      const post = await Post.findById(id);

      if (post.userId === userId) {
        await post.deleteOne();
        // response updated post
        res.status(201).json("post deleted successfully");
      } else {
        return next(401,"Can't delete this post")
      }
    } catch (err) {
      return next(err)
    }
  },

  // ===========================================find one user by id

  //
  // like/dislike a post by id
  async likeDisLike(req, res, next) {
    const id = req.params.id;
    const { userId } = req.body;

    try {
      // search a post in the database
      const post = await Post.findById(id);

      if (!post.likes.includes(userId)) {
        // if user not like this post then add userid in array
        await post.updateOne({ $push: { likes: userId } });
        res.status(201).json("Liked this post");
      } else {
        // if user already like this post then add remove userId in array
        await post.updateOne({ $pull: { likes: userId } });
        res.status(201).json("Dislike this post");
      }
    } catch (err) {
      return next(err)
    }
  },

  // ===========================================find one user by id

  //
  // get timeline post by friend user
  async getTimelinePosts(req, res, next) {
    const userId = req.params.id;

    try {
      const currentUserPosts = await Post.find({userId});
      const followingPosts = await User.aggregate([
       { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
       },
       { 
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "postResults",
        }
      },
      {
        $project: {
          postResults: 1,
          _id: 0,
        },
      }
      
      ])
  
      res.status(200).json(currentUserPosts.concat(...followingPosts[0].postResults)
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }))

    } catch (error) {
      return next(error)
    }
  },

  // ===========================================find one user by id

};

export default PostControllers;
