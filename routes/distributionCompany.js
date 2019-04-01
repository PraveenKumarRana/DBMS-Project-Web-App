const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/distcompanylist", function(req,res){
    const q = "select * from distributioncompany;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            res.render("distribution_company/distributionData", {result:results,consumerId:user, admin:admin});
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
            res.render("distribution_company/distributionData", {result:results,consumerId:user, admin:admin});
        }
    });
});

router.get("/distcompanylist/new", function(req, res, next){
    res.render("distribution_company/new",{consumerId:user, admin:admin});
});

router.post("/distcompanylist/new", function(req, res, next){
    var q = `insert into distributioncompany values(${req.body.did},"${req.body.dname}",${req.body.tenure},"${req.body.state}",${req.body.tid});`;
    console.log(q);
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        res.redirect("/distcompanylist");
    });
});

module.exports = router;