const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
router.get('/index.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
router.get('/transactions.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../transactions.html'));
});
router.get('/js/index.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/index.js'));
});
router.get('/js/transactions.js', (req, res) => {
	res.sendFile(path.join(__dirname, '../js/transactions.js'));
});

module.exports = router;