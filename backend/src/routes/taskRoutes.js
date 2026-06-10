const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const {
  taskIdValidation,
  taskValidation,
  taskUpdateValidation,
} = require("../validators/taskValidator");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(protect);


/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created
 */
router.post(
  "/",
  taskValidation,
  validate,
  createTask
);


/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasks);

router.get(
  "/:id",
  taskIdValidation,
  validate,
  getTaskById
);

router.put(
  "/:id",
  taskIdValidation,
  taskUpdateValidation,
  validate,
  updateTask
);

router.delete(
  "/:id",
  taskIdValidation,
  validate,
  deleteTask
);

module.exports = router;
