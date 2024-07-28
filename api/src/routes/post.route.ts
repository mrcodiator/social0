import { Router } from "express";
import { createComment, createPost, deleteComment, deletePost, dislikePost, getAllPosts, getSinglePost, likePost, updatePost } from "../controllers/post.controller";


export const PostRouter = Router();

// Get Routes
PostRouter.get("/", getAllPosts)
PostRouter.get("/:id", getSinglePost)

// CRUD Routes
PostRouter.post("/create", createPost);
PostRouter.put("/:id/update/", updatePost)
PostRouter.delete("/:id/delete", deletePost)

// Like Routes
PostRouter.put("/:id/like", likePost);
PostRouter.put("/:id/dislike", dislikePost)

// Comment Routes
PostRouter.put("/:id/comment/add", createComment);
PostRouter.put("/:id/comment/delete", deleteComment)