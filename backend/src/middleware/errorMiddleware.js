const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = "Server error";

  if (error.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((fieldError) => fieldError.message)
      .join(", ");
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  } else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (process.env.NODE_ENV !== "production" && error.message) {
    message = error.message;
  }

  console.error(error);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  errorHandler,
  notFound,
};
