const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// import controllers
const { userLogin, userRegister, userLogout } = require("../controllers/user")

const router = express.Router();

router.post('/login', userLogin);

router.post('/register', userRegister);

router.post('/logout', userLogout);

module.exports = router;
