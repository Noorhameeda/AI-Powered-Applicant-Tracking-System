const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongo Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(", "),
    });
  }

  // JWT Error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  // JWT Expired
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token Expired",
    });
  }

  // Mongo Duplicate Key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate Entry",
    });
  }

  // Multer Upload Error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File Too Large",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;