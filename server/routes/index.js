const router = require("express").Router();
const userRoutes = require("./user");
const outletRoutes = require("./outlet");

router.get(`/`, (req, res) => {
  res.send(`Welcome to ecommerce-cms`);
});

router.use(`/`, userRoutes);
router.use(`/outlets`, outletRoutes);

module.exports = router;
