import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from "../models/cat-model.js";

const getCat = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    next(error); // Pass database/server errors to error handler
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) {
      const error = new Error("Cat not found");
      error.status = 404;
      return next(error);
    }
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const postCat = async (req, res, next) => {
  try {
    // Check if multer rejected or missed the file
    if (!req.file) {
      const error = new Error("Invalid or missing file");
      error.status = 400;
      return next(error);
    }

    const catData = {
      ...req.body,
      filename: req.file.filename,
    };

    const result = await addCat(catData);
    if (!result || result.error) {
      const error = new Error("Failed to add cat to database");
      error.status = 400;
      return next(error);
    }

    res.status(201).json({ message: "New cat added.", result });
  } catch (error) {
    next(error);
  }
};

const putCat = async (req, res, next) => {
  try {
    const result = await modifyCat(req.body, req.params.id);
    if (!result) {
      const error = new Error("Failed to update cat");
      error.status = 400;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const result = await removeCat(req.params.id);
    if (!result) {
      const error = new Error("Cat not found or failed to delete");
      error.status = 404;
      return next(error);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };
