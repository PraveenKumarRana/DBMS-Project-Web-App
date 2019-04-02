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
            res.render("power_company/powerData", {result:results,consumerId:user, admin:admin});
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
            res.render("power_company/powerData", {result:results,consumerId:user, admin:admin});
        }
    });
});

// Adding new distribution company.
router.get("/powercompany/new", function(req, res, next){
    if(admin.designation==="designation5"){
    res.render("power_company/new",{consumerId:user, admin:admin});
    } else {
        res.redirect("/adminlogin");
    }
});

router.post("/powercompany/new", function(req, res, next){
    if(admin.designation==="designation5"){
        var q = `insert into powercompany values(${req.body.pid},"${req.body.pname}","${req.body.type}",${req.body.totalpower},"${req.body.state}");`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/powercompanylist");
        });
    } else {
        res.redirect("/adminlogin");
    }
});

// Update distribution company.
router.post("/powercompany/update",function(req,res){
    if(admin.designation==="designation5"){
        console.log("printing from distcompanylist/update route.");
        var pid = req.body.name;
        var q = `select * from powercompany where pid=${pid}`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Problem in deleting the value.");
            } else {
                res.render("power_company/update",{result:results[0],consumerId:user, admin:admin});
            }
        })
    } else {
        res.redirect("/adminlogin");
    }
});

router.post("/powercompany/updating", function(req, res){
    if(admin.designation==="designation5"){
        var q = `update powercompany set pname="${req.body.pname}",type="${req.body.type}",state="${req.body.state}",totalpower=${req.body.totalpower} where pid=${req.body.pid};`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/powercompanylist");
        });
    } else {
        res.redirect("/adminlogin");
    }
});


// Deleting transmission company.
router.post("/powercompany/delete",function(req,res){
    if(admin.designation==="designation5"){
    console.log("printing from distcompanylist/delete route.");
    var pid = req.body.name;
    var q = `delete from powercompany where pid=${pid}`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Problem in deleting the value.");
        } else {
            res.redirect("/powercompanylist");
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});
module.exports = router;