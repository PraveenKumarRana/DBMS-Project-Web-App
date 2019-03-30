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

router.get("/distcompanylist", function(req,res){
    const q = "select * from distributioncompany;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            res.render("distribution_company/distributionData", {result:results});
        }
    });
});

// post - to /distcompanylist
router.post("/distcompanylist", function(req,res){
    console.log(req.body.state);
    var state = req.body.state[0].toUpperCase()+req.body.state.slice(1);
    console.log(state);
    const q = `select * from distributioncompany where state="${state}" or state="${req.body.state}";`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            res.render("distribution_company/distributionData", {result:results});
        }
    });
});


router.post("/distcompanylist/new", function(req, res, next){
    var q = `insert into distributioncompany values(${req.body.tid},"${req.body.dname}",${req.body.tenure},"${req.body.state}",${req.body.tid});`;
    console.log(q);
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        res.json(results);
    });
});

module.exports = router;