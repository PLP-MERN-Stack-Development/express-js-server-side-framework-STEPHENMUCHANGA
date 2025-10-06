// server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! This is the express.js assignment from Express.js API!");
});

app.use("/api/products", productRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running well on http://localhost:${PORT}`);
});
