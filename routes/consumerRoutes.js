const express = require("express");
const router = express.Router();
const connection = require("../models/index");


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
    var q = "select distinct state from consumer;";
    connection.query(q, function(error, results, fields){
        if(error){
            console.log("Problem in getting the state list");
        } else {
            console.log(results);
            res.render("consumer/new_connection_form", {state:results,newconnection:newconnection,consumerId:user, admin:admin});
        }
    });
});

router.post("/newconnection", function(req, res){
    // assing value from the request.
    newconnection.state_ut = req.body.state_ut;
    newconnection.subdivision = req.body.subdivision;
    newconnection.distributioncompany = req.body.distributioncompany;
    newconnection.division = req.body.division;
    if(newconnection.subdivision){
        res.render("consumer/new_connection_next_form", {newconnection:newconnection,consumerId:user, admin:admin});
    } else {
        if(newconnection.state_ut){
            if(!newconnection.distributioncompany){
                var q = "select distinct state from consumer;";
                connection.query(q, function(error, results, fields){
                    if(error){
                        console.log("Problem in getting the state list");
                    } else {
                        console.log(results);
                        console.log(newconnection);
                        q = `select dname from distributioncompany where state="${newconnection.state_ut}";`;
                        connection.query(q, function(error, disresults){
                            if(error){
                                console.log("Error generated during search of dname using state.");
                            } else {
                                console.log(results);
                                res.render("consumer/new_connection_form", {state:results,distcomp:disresults,newconnection:newconnection,consumerId:user, admin:admin});
                            }
                        }); 
                    }
                });

                
            } else {
                if(newconnection.distributioncompany){
                    if(!newconnection.division){
                        var q = "select distinct state from consumer;";
                        connection.query(q, function(error, results, fields){
                            if(error){
                                console.log("Problem in getting the state list");
                            } else {
                                console.log(results);
                                console.log(newconnection);
                                q = `select dname from distributioncompany where state="${newconnection.state_ut}";`;
                                connection.query(q, function(error, disresults){
                                    if(error){
                                        console.log("Error generated during search of dname using state.");
                                    } else {
                                        console.log(results);
                                        q = `select divname from division where state="${newconnection.state_ut}";`;
                                        connection.query(q, function(error, divresults){
                                            if(error){
                                                console.log("Error generated during search of divname.");
                                            } else {
                                                res.render("consumer/new_connection_form", {state:results,distcomp:disresults,divname:divresults,newconnection:newconnection,consumerId:user, admin:admin});
                                            }
                                        })
                                    }
                                }); 
                            }
                        });
                    } else {
                        var q = "select distinct state from consumer;";
                        connection.query(q, function(error, results, fields){
                            if(error){
                                console.log("Problem in getting the state list");
                            } else {
                                console.log(results);
                                console.log(newconnection);
                                q = `select dname from distributioncompany where state="${newconnection.state_ut}";`;
                                connection.query(q, function(error, disresults){
                                    if(error){
                                        console.log("Error generated during search of dname using state.");
                                    } else {
                                        console.log(results);
                                        q = `select divname from division where state="${newconnection.state_ut}";`;
                                        connection.query(q, function(error, divresults){
                                            if(error){
                                                console.log("Error generated during search of divname.");
                                            } else {
                                                q = `select * from subdivision join division using(divid) where division.state="${newconnection.state_ut}";`
                                                console.log(newconnection);
                                                console.log(q);
                                                connection.query(q, function(error, subdiv){
                                                    if(error){
                                                        console.log("Error in getting the subdivision.");
                                                    } else {
                                                        res.render("consumer/new_connection_form", {state:results,distcomp:disresults,divname:divresults,subdiv:subdiv,newconnection:newconnection,consumerId:user, admin:admin});
                                                    }
                                                });
                                            }
                                        })
                                    }
                                }); 
                            }
                        });
                    }
                }
            }
        } else{
            res.redirect("/newconnection");
        }
    }
});

router.post("/newconnection/add", function(req, res){
    // This will be adding the data given be the user to the newconnection database for aprooval.
    res.redirect("/");
});

module.exports = router;