import express from "express"
import AuthControllers from "../controllers/AuthControllers.js";
import PostControllers from "../controllers/PostControllers.js";
import ChatController from "../controllers/ChatController.js";
import MessageController from "../controllers/MessageController.js";

const Router = express.Router();

// authentication routes
Router.post("/auth/register", AuthControllers.registerUser);
Router.post("/auth/login", AuthControllers.login);
Router.get("/auth/:id", AuthControllers.oneUser);
Router.get("/people", AuthControllers.getAll);
Router.put("/auth/:id", AuthControllers.update);
Router.delete("/auth/:id", AuthControllers.delete);
Router.put("/auth/follow/:id", AuthControllers.follow);
Router.put("/auth/unfollow/:id", AuthControllers.unfollow);
Router.put("/auth/follower/:id", AuthControllers.multiFollow);




// postRouters
Router.post("/post/add", PostControllers.createPost);
Router.get("/post/:id", PostControllers.getOnePost);
Router.get("/posts", PostControllers.getAllPost);
Router.put("/post/:id", PostControllers.updatePost);
Router.delete("/post/:id", PostControllers.deletePost);
Router.put("/post/:id/like", PostControllers.likeDisLike);
Router.get("/post/:id/timeline", PostControllers.getTimelinePosts);


// Message
Router.post("/chat", ChatController.createChat)
Router.get("/chat/:userId", ChatController.userChat)
Router.get("/chat/find/:firstId/:secondId", ChatController.findChat)

///message
Router.post("/message", MessageController.addMessage)
Router.get("/message/:chatId", MessageController.getMessage)


export default Router;