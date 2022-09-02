const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const usersRoute = require("./users");
const workersRoute = require("./worker");
const categoryRoute = require("./category");
 
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", usersRoute);
router.use("/worker", workersRoute);
router.use("/category", categoryRoute);
 

module.exports = router;
