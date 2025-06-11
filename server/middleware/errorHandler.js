export const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err);

  // Set default status code
  let statusCode = res.statusCode || 500;

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400; // Bad Request
    res.json({ message: err.message, errors: err.errors });
  } else if (err.name === "MongoError" && err.code === 11000) {
    statusCode = 409; // Conflict
    res.json({ message: "Duplicate key error", details: err.keyValue });
  } else {
    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};