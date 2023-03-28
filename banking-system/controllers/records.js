const app = require("../js/app.js");

exports.getData = async (req, res) => {
	app.executeQuery('SELECT * FROM balance;', null, function (status) {
		// console.log(status);
		if (status !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			// console.log('queryMe: ', 'seller', status);
			res.status(200).json(status);
		} else if (status === null) {
			res.status(400).json(status);
		}
	});
};

exports.searchData = async (req, res) => {
	console.log('q: ', req.query.q);
	let value = (req.query.q).replace(/\s/g, '%%') + '%';
	console.log(value)
	app.executeQuery('SELECT * FROM balance WHERE userid like ? OR name like ? OR email like ? OR amount like ?;', [value, value, value, value], function (status) {
		// console.log(status);
		if (status !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			// console.log('queryMe: ', 'seller', status);
			res.status(200).json(status);
		} else if (status === null) {
			res.status(400).json(status);
		}
	});
};

exports.updateData = async (req, res) => {
	console.log(req.body);
	app.executeQuery('UPDATE balance SET amount = amount + ? WHERE userid = ?;SELECT @amount:=amount FROM balance WHERE userid = ?;INSERT INTO transactions (date, time, amount, balance, userid) values (?, ?, ?, @amount, ?);', [req.body.data['amount'], req.body.data['userid'], req.body.data['userid'], req.body.data['date'], req.body.data['time'], req.body.data['amount'], req.body.data['userid']], function (status) {
		console.log(status);
		if (status !== null) {
			res.header('Acces-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', '*');
			console.log('queryMe: ', 'seller', status);
			res.status(200).json(status);
		} else if (status === null) {
			res.status(400).json(status);
		}
	});
};