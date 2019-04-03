const express = require("express");
const router = express.Router();
const connection = require("../models/index");

var newconnection = {
    state_ut:"",
    distributioncompany:"",
    division:"",
    subdivision:""
}

router.get("/profile", function(req, res){
    var consumerId = user.cid;
    if(!user.cid){
        res.render("admin/profile",{admin:admin, consumerId:user});
    } else {
        q = `select * from consumer where cid=${consumerId};`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Error generated during fetch of the information.");
            } else {
                console.log(results);
                res.render("consumer/profile_page" , {consumer:results, consumerId:user});
            }
        });
    }
});

router.get("/billinginfo", function(req, res){
    if(user.cid){
        var q = `select * from billinginfo join consumer using(cid) where cid=${user.cid};`;
        connection.query(q, function(error, results){
            if(error){
                console.log(error);
            } else {
                console.log(results);
                res.render("consumer/bill_information", {billingInfo:results, consumerId:user});
            }
        });
    }
});

router.post('/', function(req, res){
    var consumerId = req.body.cid;
    var password = req.body.password;
    console.log(consumerId);
    var q = `select password from consumer where cid=${consumerId};`;
    connection.query(q, function(error, results, fields){
        console.log(results[0].password);
        console.log("Query is running!");
        if(error){
            console.log("error!");
        } else {
            if(password == results[0].password){
                console.log("Inside password checked!");
                q = `select * from consumer where cid=${consumerId};`;
                connection.query(q, function(error, results){
                    console.log("Inside inner query!");
                    if(error){
                        console.log("Error generated during fetch of the information.");
                    } else {
                        user.cid = consumerId;
                        user.cname = results[0].cname;
                        console.log(user);
                        res.render("homepage", {consumerId:user, admin:admin});
                    }
                });
            }
        }
    });
});

//===================================================
//          APPLY FOR NEW CONNECTION ROUTES
//===================================================
router.get("/newconnection", function(req, res){
    res.render("consumer/new_connection_form", {consumerId:user, admin:admin});
});

router.post("/newconnection", function(req, res){
    res.render("consumer/new_connection_next_form", {consumerId:user, admin:admin});
});

router.post("/newconnection/add", function(req, res){
    // This will be adding the data given be the user to the newconnection database for aprooval.
    res.redirect("/");
});

module.exports = router;