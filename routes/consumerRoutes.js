const express = require("express");
const router = express.Router();
const connection = require("../models/index");


router.get("/profile", function(req, res){
    var consumerId = user.cid;
    q = `select * from consumer where cid=${consumerId};`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error generated during fetch of the information.");
        } else {
            console.log(results);
            res.render("consumer/profile_page" , {consumer:results, consumerId:user});
        }
    });
});

module.exports = router;