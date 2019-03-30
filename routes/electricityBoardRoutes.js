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

router.get("/electricityboardlist", function(req,res){
    const q = "select * from electricityboard;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            console.log(results);
            res.render("electricity_board/electricity_board_data", {result:results});
        }
    });
});

// post - to /electricityboardlist
router.post("/electricityboardlist", function(req,res){
    console.log(req.body.state);
    var state = req.body.state[0].toUpperCase()+req.body.state.slice(1);
    console.log(state);
    const q = `select * from electricityboard where state="${state}" or state="${req.body.state}";`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            console.log(results);
            res.render("electricity_board/electricity_board_data", {result:results});
        }
    });
});

router.post("/electricityboardlist/new", function(req, res, next){
    var q = `insert into electricityboard values(${req.body.pid},"${req.body.pname}","${req.body.type}",${req.body.totalpower},"${req.body.state}")`;
    console.log(q);
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        res.json(results);
    });
});

module.exports = router;