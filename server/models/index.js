const mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "admin",
    database: "eds"
});
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});

const q = "create table if not exists employee (username varchar(50), password varchar(255), email varchar(50));"
connection.query(q, function (error, results, fields) {
    if (error) throw error;
    // if connected successfully!
    console.log("Database Created!");
    console.log(results);
});

function getData(req, res, next){connection.query("select * from employee;", function(error, results, fields){
    if(error){
        // return res.status(error.status).json({
        //     error: error.message
        // });
        console.log("Error generated!");
        return next();
    }
    return res.status(200).json(results);
    });
}

module.exports = getData;
