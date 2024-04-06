const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');
const {register,signin}= require("../Controller/user")

// sign up
router.post("/register",register);

// sign in
router.post("/signin", signin);

module.exports = router;