const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);  // POST /register
router.post('/login', login);        // POST /login

module.exports = router;
