import express from "express";
import { body } from "express-validator";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { upload } from "../../middlewares/upload.js";
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from "../controllers/cat-controller.js";

const catRouter = express.Router();

catRouter
  .route("/")
  .get(getCat)
  .post(
    upload.single("cat"), // or 'file' depending on your field name
    body("cat_name").trim().isLength({ min: 2, max: 50 }).escape(),
    body("weight").isNumeric(),
    body("owner").isInt(),
    body("birthdate").isDate(),
    validationErrors,
    postCat,
  );

catRouter.route("/:id").get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
