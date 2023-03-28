const express 	   = require("express");
const path 	  	   = require("path");
const app 	  	   = express();
const mysql   	   = require("mysql");
const dotenv  	   = require("dotenv");
const cors    	   = require("cors");
const cookieParser = require('cookie-parser');
const session      = require('express-session');

dotenv.config({ path: "./env/.env" });
const port = process.env.PORT || 800;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
	secret: 'secret_key',
	resave: true,
	saveUninitialized: false
}));

app.use("/", require("../api/pages"));
app.use("/api/records", require("../api/records")); 
app.use("/api/transactions", require("../api/transactions")); 
app.use('/css', express.static(path.join(__dirname, '..' ,'public', 'css')));
app.use('/icons', express.static(path.join(__dirname, '..' ,'public', 'icons')));
// app.use('/fonts', express.static(path.join(__dirname, '..' ,'css', 'fonts')));

let config = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	multipleStatements: true
};

function connection() { 
	let conn = mysql.createConnection(config);
	return conn;
}

function executeQuery(query, data, callback) {	
	console.log("oppp: ", data);
	let conn = connection();
	conn.connect(function (err) {
		if (err) throw err;
		conn.query(query, data, function (err, res) {
			if (err){
				callback(undefined);
			}
			if (Object.keys(res).length != 0) {
				conn.end();
				callback(res);
			} else {
				conn.end();
				callback(null);
			}
		});
	});
};


app.listen(port, () => {
	console.log(`Server is Listening on Port ${port}`);
});

exports.executeQuery  = executeQuery;