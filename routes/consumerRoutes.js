const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/billinginfo", function(req,res){
    var loggedId = user.cid;
    q = `select * from billinginfo where cid=${loggedId}`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error generated while getting the billing info!");
        } else {
            console.log(user);
            res.render("consumer/bill_information", {billingInfo: results, consumerId:user});
        }
    })
});

module.exports = router;