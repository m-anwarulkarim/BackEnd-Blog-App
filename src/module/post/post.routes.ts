import express, { Router } from "express";
import { PostController } from "./post.controller";
import { ROLE } from "../../types/role.type";
import authGurd from "../../middleware/authGurd";

const router = express.Router();

router.get("/", PostController.getAllPost);
router.get("/stats", authGurd(ROLE.ADMIN), PostController.getStats);

router.get(
  "/my-posts",
  authGurd(ROLE.USER, ROLE.ADMIN),
  PostController.getMyPosts
);

router.get("/:postId", PostController.getPostById);

router.post("/", authGurd(ROLE.USER, ROLE.ADMIN), PostController.createPost);

router.patch(
  "/:postId",
  authGurd(ROLE.USER, ROLE.ADMIN),
  PostController.updatePost
);

router.delete(
  "/:postId",
  authGurd(ROLE.USER, ROLE.ADMIN),
  PostController.deletePost
);

export const postRouter: Router = router;
