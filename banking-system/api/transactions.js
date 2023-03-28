const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');

router.get('/', transactionsController.getData);

module.exports = router;