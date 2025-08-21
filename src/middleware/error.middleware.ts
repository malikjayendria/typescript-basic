import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
