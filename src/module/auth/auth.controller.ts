import { Request, Response } from "express";
import { authService } from "./auth.service";

const getAllUsers = async (req: Request, res: Response) => {
  const result = await authService.getAllUsers();
  try {
    res.status(200).json({
      success: true,
      message: "data retrieved successfully ",
      data: result,
    });
  } catch (error: any) {
    throw new error();
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { authId } = req.params;
  console.log(authId);
  if (!authId) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });
  }
  try {
    const result = await authService.getSingleUser(authId as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "data retrieved successfully ",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

export const authController = {
  getAllUsers,
  getSingleUser,
};
