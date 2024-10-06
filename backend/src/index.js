const express = require("express");
const userRouter = require("./user")
const itemRouter = require("./item")

const router = express.Router();

router.use("/user", userRouter);
router.use("/item", itemRouter);


module.exports = router;