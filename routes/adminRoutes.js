const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/adminlogin", function(req, res){
    res.render("admin/login",{admin:admin});
});

module.exports = router;