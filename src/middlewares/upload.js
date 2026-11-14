import sharp from "sharp";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    console.log("Creating thumbnail for:", req.file.path);

    // Generate a 160x160 thumbnail and save it with '_thumb' suffix
    const outputPath = `${req.file.path}_thumb`;

    await sharp(req.file.path).resize(160, 160).png().toFile(outputPath);

    next();
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    next(error);
  }
};

export { createThumbnail };
