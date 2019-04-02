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

// Adding new distribution company.
router.get("/distcompany/new", function(req, res, next){
    if(admin.designation==="designation5"){
        res.render("distribution_company/new",{consumerId:user, admin:admin});
    } else {
        res.redirect("/adminlogin");
    }
});

router.post("/distcompany/new", function(req, res, next){
    if(admin.designation==="designation5"){
        var q = `insert into distributioncompany values(${req.body.did},"${req.body.dname}",${req.body.tenure},"${req.body.state}",${req.body.tid});`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/distcompanylist");
        });
    } else {
        res.redirect("/adminlogin");
    }
});

// Update distribution company.
router.post("/distcompany/update",function(req,res){
    if(admin.designation==="designation5"){
        console.log("printing from distcompanylist/update route.");
        var did = req.body.name;
        var q = `select * from distributioncompany where did=${did}`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Problem in deleting the value.");
            } else {
                res.render("distribution_company/update",{result:results[0],consumerId:user, admin:admin});
            }
        })
    } else {
        res.redirect("/adminlogin");
    }
});
router.post("/distcompany/updating", function(req, res){
    if(admin.designation==="designation5"){
        var q = `update distributioncompany set dname="${req.body.dname}",tenure=${req.body.tenure},state="${req.body.state}",tid=${req.body.tid} where did=${req.body.did};`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/distcompanylist");
        });
    } else {
        res.redirect("/adminlogin");
    }
})


// Deleting distribution company.
router.post("/distcompany/delete",function(req,res){
    if(admin.designation==="designation5"){
    console.log("printing from distcompanylist/delete route.");
    var did = req.body.name;
    var q = `delete from distributioncompany where did=${did}`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Problem in deleting the value.");
        } else {
            res.redirect("/distcompanylist");
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});



module.exports = router;