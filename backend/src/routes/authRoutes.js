const express = require("express");

const router = express.Router();

const validate = require("../middleware/validationMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const {
  register,
  login,
} = require("../controllers/authController");


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  registerValidation,
  validate,
  register
);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  loginValidation,
  validate,
  login
);


module.exports = router;