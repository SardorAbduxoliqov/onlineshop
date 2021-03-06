const express = require("express");
const router = express.Router();

const shopController = require('../controllers/shop');

router.get("/", shopController.getMainIndex);
router.get("/products/:productId", shopController.getProduct);

module.exports = router;