import { addUser, findUserById, listAllUsers } from "../models/user-model.js";
import bcrypt from "bcrypt";

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  try {
    // Hash the password with a salt rounds value of 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const result = await addUser(userData);
    if (result.user_id) {
      res.status(201).json({ message: "New user added.", result });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putUser = (req, res) => {
  res.status(200).json({ message: "User item updated." });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: "User item deleted." });
};

export { getUser, getUserById, postUser, putUser, deleteUser };
