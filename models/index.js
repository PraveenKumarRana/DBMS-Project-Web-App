const mysql = require("mysql2");

var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "admin",
    database: "eds"
});

module.exports = connection;