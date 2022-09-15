function errorHandler(error, req, res, next) {
  console.log(error, "INI ERROOO <<<<<<<<<<<<");
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({ error: error.errors[0].message });
  } else if (error.name === "NotFound") {
    res.status(404).json({ error: "Data not found" });
  } else if (error.name === "InvalidEmailOrPassword") {
    res.status(400).json({ error: "Wrong email or password" });
  } else if (error.name === "RequiredEmailPassword") {
    res.status(400).json({ error: "Email and Password is required" });
  } else if (error.name === "NoToken") {
    res.status(401).json({ error: "Please login" });
  } else if (
    error.name === "Unauthorized" ||
    error.name === "JsonWebTokenError"
  ) {
    res.status(401).json({ error: "Invalid token" });
  } else if (error.name === "notAllowedtoLogin") {
    res
      .status(401)
      .json({ error: "You are not allowed to login on this site" });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = errorHandler;
