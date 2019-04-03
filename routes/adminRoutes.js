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
    res.render("admin/newconnectionrequest", {consumerId:user, admin:admin})
});

module.exports = router;