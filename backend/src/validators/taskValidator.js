const { body, param } = require("express-validator");

const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .trim(),
];

const taskUpdateValidation = [
  body().custom((value) => {
    const allowedFields = [
      "title",
      "description",
      "status",
    ];

    const hasUpdate = allowedFields.some((field) =>
      Object.prototype.hasOwnProperty.call(value, field)
    );

    if (!hasUpdate) {
      throw new Error("At least one field is required");
    }

    return true;
  }),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed"),
];

const taskIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
];

module.exports = {
  taskIdValidation,
  taskValidation,
  taskUpdateValidation,
};
