const express = require("express");
const router = express.Router();
const connection = require("../models/index");
newconsumer = {
    cid:""
}

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
            } else{
                res.redirect("/adminlogin");
            }
        }
    });
});


//==========================
// New connection requests
//==========================
router.get("/newconnection/requests", function(req,res){
    if(admin.designation == "designation5"){
    var q=`select * from newconnection;`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error in getting newconnection information.");
        } else {
            console.log(results);
            res.render("admin/newconnectionrequest", {newconnection:results,consumerId:user, admin:admin});
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});

//==========================
// Approval requests
//==========================
router.post("/newconnection/approve", function(req,res){
    if(admin.designation == "designation5"){
    var ncid = `select cid, meterno from consumer order by cid desc limit 1;`;
    connection.query(ncid, function(error, results){
        if(error){
            console.log("Error in getting ncid");
        } else {
            newconsumer.cid = results[0].cid + 1;
            newconsumer.meterno = results[0].meterno + 1;
        }
    });

    var q=`select * from newconnection where email="${req.body.name}";`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error in getting newconnection information.");
        } else {
            console.log(results);
            const {cname, phone, boardname, state, subdiv, divis, city, email, address} = results[0];
            q=`insert into consumer values(${newconsumer.cid},"${cname}",${phone},"${boardname}","${state}","${subdiv}","${divis}","${city}",${newconsumer.meterno}, "password", "${email}", "${address}");`;
            connection.query(q, function(error, results){
                if(error){
                    console.log("Error in saving the new consumer.");
                } else {
                    q=`delete from newconnection where email="${req.body.name}";`;
                    connection.query(q, function(error, results){
                        if(error){
                            console.log("Error generated on deleting the info from the newconnection page.")
                        } else {
                            debugger;
                            res.redirect("/");
                        }
                    })
                }
            });
        }
    })
    } else {
        res.redirect("/adminlogin");
    }
});

//==========================
// Rejection Route
//==========================
router.post("/newconnection/reject", function(req,res){
    if(admin.designation == "designation5"){
        var q=`delete from newconnection where email="${req.body.name}";`;
        connection.query(q, function(error, results){
            if(error){
                console.log("Error in deleting newconnection information.");
            } else {
                res.redirect("/newconnection/requests");
            }
        })
    } else {
        res.redirect("/adminlogin");
    }
});

module.exports = router;