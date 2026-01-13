import express, { Router } from "express";
import { CommentController } from "./comment.controller";
import { ROLE } from "../../types/role.type";
import authGurd from "../../middleware/authGurd";

const router = express.Router();
router.get("/authGurdor/:authGurdorId", CommentController.getCommentsByAuthor);
router.get("/:commentId", CommentController.getCommentById);

router.post(
  "/",
  authGurd(ROLE.USER, ROLE.ADMIN),
  CommentController.createComment
);

router.delete(
  "/:commentId",
  authGurd(ROLE.USER, ROLE.ADMIN),
  CommentController.deleteComment
);

router.patch(
  "/:commentId",
  authGurd(ROLE.USER, ROLE.ADMIN),
  CommentController.updateComment
);

router.patch(
  "/:commentId/moderate",
  authGurd(ROLE.ADMIN),
  CommentController.moderateComment
);

export const commentRouter: Router = router;
