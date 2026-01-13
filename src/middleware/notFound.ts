import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Requested route not found",
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
};
