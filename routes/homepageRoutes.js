const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get('/', function(req, res){
    console.log("Printing the user from the get function.");
    console.log(user);
    res.render("homepage", {consumerId:user, admin:admin});
});

router.post('/logout', function(req, res){
    user.cid="";
    res.render("homepage", {consumerId:user, admin:admin});
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

module.exports = router;