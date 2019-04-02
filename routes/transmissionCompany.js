const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/transmissioncompanylist", function(req,res){
    const q = "select * from transmissioncompany;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            res.render("transmission_company/transmissiongData", {result:results,consumerId:user, admin:admin});
        }
    });
});

// post - to /powercompanylist
router.post("/transmissioncompanylist", function(req,res){
    console.log(req.body.state);
    var state = req.body.state[0].toUpperCase()+req.body.state.slice(1);
    console.log(state);
    const q = `select * from transmissioncompany where state="${state}" or state="${req.body.state}";`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            res.render("transmission_company/transmissiongData", {result:results,consumerId:user, admin:admin});
        }
    });
});

// Adding new distribution company.
router.get("/transmissioncompany/new", function(req, res, next){
    if(admin.designation==="designation5"){
    res.render("transmission_company/new",{consumerId:user, admin:admin});
    } else {
        res.redirect("/adminlogin");
    }
});

router.post("/transmissioncompany/new", function(req, res, next){
    if(admin.designation==="designation5"){
        var q = `insert into transmissioncompany values(${req.body.tid},"${req.body.tname}",${req.body.did},${req.body.tcapacity},"${req.body.state}",${req.body.tenure},${req.body.pid});`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/transmissioncompanylist");
        });
    } else {
        res.redirect("/adminlogin");
    }
});

// Update distribution company.
router.post("/transmissioncompany/update",function(req,res){
    if(admin.designation==="designation5"){
    console.log("printing from distcompanylist/update route.");
    var tid = req.body.name;
    var q = `select * from transmissioncompany where tid=${tid}`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Problem in deleting the value.");
        } else {
            res.render("transmission_company/update",{result:results[0],consumerId:user, admin:admin});
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});
router.post("/transmissioncompany/updating", function(req, res){
    if(admin.designation==="designation5"){
        var q = `update transmissioncompany set tname="${req.body.tname}",tenure=${req.body.tenure},state="${req.body.state}",did=${req.body.did},pid=${req.body.pid},tcapacity=${req.body.tcapacity} where tid=${req.body.tid};`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/transmissioncompanylist");
        });
    } else {
        res.redirect("/adminlogin");
    }
});


// Deleting transmission company.
router.post("/transmissioncompany/delete",function(req,res){
    if(admin.designation==="designation5"){
    console.log("printing from distcompanylist/delete route.");
    var tid = req.body.name;
    var q = `delete from transmissioncompany where tid=${tid}`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Problem in deleting the value.");
        } else {
            res.redirect("/transmissioncompanylist");
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});
module.exports = router;