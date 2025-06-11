const express = require('express');
const router = express.Router();
const { login, refresh } = require('../controllers/authController');

router.post('/login', login);
router.post('/refresh', refresh);
module.exports = router;