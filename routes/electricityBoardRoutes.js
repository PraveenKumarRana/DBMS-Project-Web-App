const express = require("express");
const router = express.Router();
const connection = require("../models/index");

router.get("/electricityboardlist", function(req,res){
    const q = "select * from electricityboard;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            console.log(results);
            res.render("electricity_board/electricity_board_data", {result:results,consumerId:user, admin:admin});
        }
    });
});

// post - to /electricityboardlist
router.post("/electricityboardlist", function(req,res){
    console.log(req.body.state);
    var state = req.body.state[0].toUpperCase()+req.body.state.slice(1);
    console.log(state);
    const q = `select * from electricityboard where state="${state}" or state="${req.body.state}";`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log(error);
        } else{
            console.log(results);
            res.render("electricity_board/electricity_board_data", {result:results,consumerId:user, admin:admin});
        }
    });
});

// Adding new distribution company.
router.get("/electricityboard/new", function(req, res, next){
    if(admin.designation==="designation5"){
        res.render("electricity_board/new",{consumerId:user, admin:admin});
    } else {
        res.redirect("/adminlogin");
    }
});

router.post("/electricityboard/new", function(req, res, next){
    if(admin.designation==="designation5"){
        var q = `insert into electricityboard values("${req.body.boardname}",${req.body.noofconsumer},"${req.body.state}",${req.body.chairmanid},${req.body.powerconsumed});`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/electricityboardlist");
        });
    } else {
        res.redirect("/adminlogin");
    }
});

// Update distribution company.
router.post("/electricityboard/update",function(req,res){
    if(admin.designation==="designation5"){
        console.log("printing from distcompanylist/update route.");
        var boardname = req.body.name;
        var q = `select * from electricityboard where boardname="${boardname}"`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Problem in deleting the value.");
            } else {
                res.render("electricity_board/update",{result:results[0],consumerId:user, admin:admin});
            }
        })
    } else {
        res.redirect("/adminlogin");
    }
});
router.post("/electricityboard/updating", function(req, res){
    if(admin.designation==="designation5"){
        var q = `update electricityboard set noofconsumer=${req.body.noofconsumer},state="${req.body.state}",chairmanid=${req.body.chairmanid}, powerconsumed=${req.body.powerconsumed} where boardname="${req.body.boardname}";`;
        console.log(q);
        connection.query(q, function(error, results, fields){
            if(error) throw error;
            res.redirect("/electricityboardlist");
        });
    } else {
        res.redirect("/adminlogin");
    }
})


// Deleting distribution company.
router.post("/electricityboard/delete",function(req,res){
    if(admin.designation==="designation5"){
    console.log("printing from distcompanylist/delete route.");
    var boardname = req.body.name;
    var q = `delete from electricityboard where boardname="${boardname}"`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Problem in deleting the value.");
        } else {
            res.redirect("/electricityboardlist");
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});
module.exports = router;