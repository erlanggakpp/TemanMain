function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "magnetNotFound") {
    return res.status(400).json({ message: "Magnet not found" });
  } else if (err.name === "eventNotFound") {
    return res.status(400).json({ message: "Event not found" });
  } else if (err.name === "categoryNotFound") {
    return res.status(400).json({ message: "Category not found" });
  } else if (err.name === "magnetUnauthorized") {
    return res
      .status(403)
      .json({ message: "You are not authorized to edit/delete this magnet!" });
  } else {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
