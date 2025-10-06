const auth = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      const error = new Error("Unauthorized - Invalid API key");
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
