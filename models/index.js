const mysql = require("mysql2");

var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "123456789",
    database: "eds"
});

module.exports = connection;