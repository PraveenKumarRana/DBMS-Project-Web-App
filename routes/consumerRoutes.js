const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/profile", function(req, res){
        var q = `select * from managesession;`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Error generated during fetch of the information.");
            } else {
                var consumerId = results[0].cid;
                q = `select * from consumer where cid=${consumerId};`;
                connection.query(q, function(error, results){
                    if(error){
                        console.log("Error generated during fetch of the information.");
                    } else {
                        console.log(results);
                        res.render("consumer/profile_page" , {consumer:results, consumerId:consumerId});
                    }
                });
            }
        });
});

module.exports = router;