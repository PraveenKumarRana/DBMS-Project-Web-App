const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get('/', function(req, res){
    console.log("Printing the user from the get function.");
    console.log(user);
    res.render("homepage", {consumerId:user, admin:admin});
});

router.post('/logout', function(req, res){
    user={};
    user.cid="";
    admin={};
    admin.eid="";
    res.render("homepage", {consumerId:user, admin:admin});
});

module.exports = router;