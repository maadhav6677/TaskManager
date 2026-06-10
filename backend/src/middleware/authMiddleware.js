const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      const error = new Error("JWT_SECRET is not configured");
      error.statusCode = 500;
      throw error;
    }

    const [scheme, token] = (req.headers.authorization || "").split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    if (error.statusCode === 500) {
      return next(error);
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = protect;
