//requiring the models
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//controllers
const user = require("../controllers/User");

router.post("/register", user.register);

router.post("/login", user.login);

router.put("/:username/updaterole",user.updaterole);

router.get("/:username",user.getUser);
module.exports = router;