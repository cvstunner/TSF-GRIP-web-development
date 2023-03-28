const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records');

router.get('/', recordsController.getData);
router.get('/search', recordsController.searchData);
router.put('/', recordsController.updateData);

module.exports = router;