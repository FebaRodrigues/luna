const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;