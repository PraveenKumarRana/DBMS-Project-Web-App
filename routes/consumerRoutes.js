const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.post("/", function(req, res){
    var consumerId = req.body.cid;
    var password = req.body.password;
    // console.log(typeof(password));
    var q = `select password from consumer where cid=${consumerId};`;
    connection.query(q, function(error, results, fields){
        // console.log(typeof(results[0].password));
        if(error){
            console.log("error!");
        } else {
            if(password === results[0].password){
                q = `select * from consumer where cid=${consumerId};`;
                connection.query(q, function(error, results){
                    if(error){
                        console.log("Error generated during fetch of the information.");
                    } else {
                        console.log(results);
                        res.render("consumer/profile_page" , {consumer:results});
                    }
                });
            }
        }
    });
});

module.exports = router;