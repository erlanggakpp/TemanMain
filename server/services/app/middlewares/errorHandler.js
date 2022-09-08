function errorHandler(err, req, res, next) {
  console.log(err);
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    return res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "magnetsNotExist") {
    return res.status(400).json({ message: "Can't find magnet list" });
  } else if (err.name === "magnetCurrentlyClosed") {
    return res
      .status(400)
      .json({ message: "There is no empty slot for this magnet" });
  } else if (err.name === "alreadyAcceptedInvitation") {
    return res.status(400).json({ message: "Invitation already accepted" });
  } else if (err.name === "alreadyAcceptedRequest") {
    return res.status(400).json({ message: "Request already accepted" });
  } else if (err.name === "reqDesRequired") {
    return res.status(400).json({ message: "Request description is required" });
  } else if (err.name === "invDesRequired") {
    return res
      .status(400)
      .json({ message: "Invitation description is required" });
  } else if (err.name === "underage") {
    return res.status(400).json({
      message:
        "User that you're trying to invite doesn't meet your Magnet's age requirement",
    });
  } else if (err.name === "underageReq") {
    return res.status(400).json({
      message: "Your age  doesn't meet Magnet's age requirement",
    });
  } else if (err.name === "magnetUnauthorized") {
    return res
      .status(403)
      .json({ message: "You are not authorized to edit/delete this magnet!" });
  } else if (err.name === "invitationUnauthorized") {
    return res.status(403).json({
      message: "You are not authorized to edit/delete this invitation!",
    });
  } else if (err.name === "requestUnauthorized") {
    return res.status(403).json({
      message: "You are not authorized to edit/delete this request!",
    });
  } else if (err.name === "acceptInvitationUnauthorized") {
    return res.status(403).json({
      message: "You are not authorized to accept this invitation!",
    });
  } else if (err.name === "acceptRequestUnauthorized") {
    return res.status(403).json({
      message: "You are not authorized to accept this request!",
    });
  } else if (err.name === "invitationNotFound") {
    return res.status(404).json({ message: "Invitation not found" });
  } else if (err.name === "categoryNotFound") {
    return res.status(404).json({ message: "Category not found" });
  } else if (err.name === "magnetNotFound") {
    return res.status(404).json({ message: "Magnet not found" });
  } else if (err.name === "requestNotFound") {
    return res.status(404).json({ message: "Request not found" });
  } else if (err.name === "eventNotFound") {
    return res.status(404).json({ message: "Event not found" });
  } else {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
