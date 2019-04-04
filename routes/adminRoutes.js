const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/adminlogin", function(req, res){
    res.render("admin/login",{admin:admin, consumerId:user});
});

router.get("/adminprofile", function(req, res){
    res.render("admin/profile",{admin:admin, consumerId:user});
});

router.post("/adminlogin", function(req,res){
    var eid = req.body.eid;
    var password = req.body.password;
    var q = `select * from employee where eid=${eid};`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log("error!");
        } else {
            if(password === results[0].password){
                console.log(results);
                admin=results[0];
                res.render("homepage", {consumerId:user, admin:admin});
            }
        }
    });
});


//==========================
// New connection requests
//==========================
router.get("/newconnection/requests", function(req,res){
    var q=`select * from newconnection;`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error in getting newconnection information.");
        } else {
            console.log(results);
            res.render("admin/newconnectionrequest", {newconnection:results,consumerId:user, admin:admin});
        }
    })
});

//==========================
// Approval requests
//==========================
router.post("/newconnection/approve", function(req,res){
    var q=`select * from newconnection where email="${req.body.name}";`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error in getting newconnection information.");
        } else {
            console.log(results);
            res.render("admin/newconnectionrequest", {newconnection:results,consumerId:user, admin:admin});
        }
    })
});

//==========================
// Rejection Route
//==========================
router.post("/newconnection/reject", function(req,res){
    if(admin.designation == "designation5"){
        var q=`delete from newconnection where email="${req.body.name}";`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Error in deleting newconnection information.");
            } else {
                res.redirect("/newconnection/requests");
            }
        })
    } else {
        res.redirect("/adminlogin");
    }
});

module.exports = router;