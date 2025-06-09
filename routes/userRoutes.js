const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/reg', authController.register);
router.post('/log', authController.login);

module.exports = router;