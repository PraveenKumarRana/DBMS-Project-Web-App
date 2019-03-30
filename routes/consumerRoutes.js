const mysql = require("mysql2");
const express = require("express");
const router = express.Router();

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

router.post("/", function(req, res){
    var consumerId = req.body.cid;
    var password = req.body.password;
    // console.log(typeof(password));
    var q = `select password from consumer where cid=${consumerId};`;
    connection.query(q, function(error, results, fields){
        // console.log(typeof(results[0].password));
        if(error){
            console.log("error!");
        } else {
            if(password === results[0].password){
                q = `select * from consumer where cid=${consumerId};`;
                connection.query(q, function(error, results){
                    if(error){
                        console.log("Error generated during fetch of the information.");
                    } else {
                        console.log(results);
                        res.render("consumer/profile_page" , {consumer:results});
                    }
                });
            }
        }
    });
});

module.exports = router;