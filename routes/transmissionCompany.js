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

const createTable = "create table if not exists transmissioncompany(tid int primary key,tname varchar(50),did int,tcapacity int,state varchar(50),tenure int);";
connection.query(createTable, function(error, results, fields){
    if(error){
        console.log(error);
    } else{
        console.log("Table created successfully!");
    }
});


router.get("/transmissioncompanylist", function(req,res){
    const q = "select * from transmissioncompany;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            res.render("transmission_company/transmissiongData", {result:results});
        }
    });
});

router.post("/transmissioncompanylist/new", function(req, res, next){
    var q = `insert into powercompany values(${req.body.tid},"${req.body.tname}",${req.body.did},${req.body.tcapacity},"${req.body.state}",${req.body.tenure});`;
    console.log(q);
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        res.json(results);
    });
});

module.exports = router;