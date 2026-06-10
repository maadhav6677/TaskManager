require("dotenv").config();

const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const protect = require("./src/middleware/authMiddleware");
const taskRoutes = require("./src/routes/taskRoutes");
const {
  errorHandler,
  notFound,
} = require("./src/middleware/errorMiddleware");


const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/test", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
