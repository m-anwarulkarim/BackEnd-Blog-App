import { Router } from "express";
import { authController } from "./auth.controller";
import authGurd from "../../middleware/authGurd";
import { ROLE } from "../../types/role.type";

const router = Router();
router.get("/", authGurd(ROLE.ADMIN), authController.getAllUsers);
router.get("/:authId", authGurd(), authController.getSingleUser);

export const authRouter = router;
