const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/powercompanylist", function(req,res){
    const q = "select * from powercompany;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            console.log(results);
            res.render("power_company/powerData", {result:results,consumerId:user});
        }
    });
});

// post - to /powercompanylist
router.post("/powercompanylist", function(req,res){
    console.log(req.body.state);
    var state = req.body.state[0].toUpperCase()+req.body.state.slice(1);
    console.log(state);
    const q = `select * from powercompany where state="${state}" or state="${req.body.state}";`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            console.log(results);
            res.render("power_company/powerData", {result:results,consumerId:user});
        }
    });
});

router.post("/powercompanylist/new", function(req, res, next){
    var q = `insert into powercompany values(${req.body.pid},"${req.body.pname}","${req.body.type}",${req.body.totalpower},"${req.body.state}")`;
    console.log(q);
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        res.json(results);
    });
});

module.exports = router;