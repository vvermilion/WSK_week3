import bcrypt from "bcrypt";
import { addUser, findUserById, listAllUsers } from "../models/user-model.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const result = await addUser(userData);
    if (!result || result.error) {
      const error = new Error("Failed to create user");
      error.status = 400;
      return next(error);
    }

    res.status(201).json({ message: "New user added.", result });
  } catch (error) {
    next(error);
  }
};

// Repeat for putUser and deleteUser if implemented...

export { getUsers, getUserById, postUser };
