const router = require("express").Router();
const { OutletController } = require("../controllers");
const {
  authentication,
} = require("../middlewares/authentication-authorization");

router.use(authentication);
router.get("/", OutletController.getOutlet);
router.post("/", OutletController.postOutlet);

module.exports = router;
