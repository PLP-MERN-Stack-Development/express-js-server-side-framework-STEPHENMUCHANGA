const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let products = require("../data/products");
const auth = require("../middleware/auth");
const { validateProduct } = require("../middleware/validation");

// ✅ GET all product from the database (with filtering, search & pagination)
router.get("/", async (req, res, next) => {
  try {
    let result = products;

    // Filtering products by category
    if (req.query.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    // Search products by name
    if (req.query.search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(req.query.search.toLowerCase())
      );
    }

    // Pagination of products
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginated = result.slice(startIndex, endIndex);

    res.json({
      page,
      total: result.length,
      results: paginated,
    });
  } catch (err) {
    next(err);
  }
});

// ✅ GET product by ID from database
router.get("/:id", async (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// ✅ POST create new product to the database
router.post("/", auth, validateProduct, async (req, res, next) => {
  try {
    const newProduct = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// ✅ PUT update product in the database by ID
router.put("/:id", auth, validateProduct, async (req, res, next) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE product from the database by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
  } catch (err) {
    next(err);
  }
});

// ✅ Product statistics in the database
// Total number of products
router.get("/stats/total", async (req, res, next) => {
  try {
    const total = products.length;
    res.json({ total });
  } catch (err) {
    next(err);
  }
});

// Products by category
router.get("/stats/category", async (req, res, next) => {
  try {
    const stats = {};
    products.forEach((p) => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
