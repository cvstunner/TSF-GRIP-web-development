const app = require("../js/app.js");

exports.getData = async (req, res) => {
	app.executeQuery('SELECT * FROM transactions WHERE userid = ?;SELECT name FROM balance WHERE userid = ?;', [req.query.uid, req.query.uid], function (status) {
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