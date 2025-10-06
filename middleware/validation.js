const validateProduct = (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    if (
      !name ||
      !description ||
      typeof price !== "number" ||
      !category ||
      typeof inStock !== "boolean"
    ) {
      const error = new Error("Invalid product data");
      error.status = 400;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateProduct };
