import express from "express";
import { body } from "express-validator";
import { validationErrors } from "../../middlewares/error-handlers.js";
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("name").trim().notEmpty().escape(),
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric()
      .escape(),
    body("email").trim().isEmail().normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    validationErrors,
    postUser,
  );

userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
