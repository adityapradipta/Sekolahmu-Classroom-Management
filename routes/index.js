const express = require("express");
const router = express.Router();

const controller = require("../controllers/index");
const { authentication } = require("../middlewares/authentication");
const { adminAuthorization } = require("../middlewares/authorization");

router.post("/login", controller.login);
router.post(
  "/create_class",
  authentication,
  adminAuthorization,
  controller.create_class
);
router.patch("/check_in", authentication, controller.check_in);
router.patch("/check_out", authentication, controller.check_out);
router.get("/get_class_list", authentication, controller.get_class_list);
router.post("/get_class_by_id", authentication, controller.get_class_by_id);

module.exports = router;
