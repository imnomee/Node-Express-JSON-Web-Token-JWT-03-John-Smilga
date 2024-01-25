const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authMiddlware = require('../middleware/auth');

router.route('/dashboard').get(authMiddlware, dashboard);
router.route('/login').post(login);

module.exports = router;
