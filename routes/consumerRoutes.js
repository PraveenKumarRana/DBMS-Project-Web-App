const express = require("express");
const router = express.Router();
const connection = require("../models/index");
const nodemailer = require("nodemailer");
ref = {
    id:"",
    pre:"",
    cname:"",
    boardname:"",
    state:"",
    address:"",
    phone:""
}

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
        console.log("All the detail of the user.");
        console.log(newconnection);
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
    console.log(newconnection);
    console.log(req.body);
    const {cname, phone,email, city, address} = req.body;
    var refid = `select max(id) as id from ref;`;
    connection.query(refid, function(error, results){
        if(error){
            console.log("Error in getting refid.");
        } else {
            ref.id = results[0].id;
            ref.pre = ref.id;
            refid = `update ref set id=${ref.id + 1} where id=${ref.id};`;
            connection.query(refid, function(error, results){
                if(error){
                    console.log(refid);
                    console.log("Error in updating refid.");
                } else {
                    console.log(refid);
                    console.log("Updated the ref table.");
                }
            });
        }
    });

    var q = `select * from electricityboard where state="${newconnection.state_ut}";`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error generated during search of boardname.");
        } else {
            console.log(results[0].boardname);
            ref.boardname = results[0].boardname;
            ref.address = `${address}`;
            ref.cname = `${cname}`;
            q = `insert into newconnection values("${cname}",${phone},"${results[0].boardname}","${newconnection.state_ut}","${newconnection.subdivision}","${newconnection.division}","${city}","${email}","${address}","${ref.id}",NULL);`
            connection.query(q,function(error, results){
                if(error){
                    console.log(error);
                } else {
                    //==================================================
                    //          SENDING THE MAIL WITH RESPONSE
                    //==================================================
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'projectdbmshelp@gmail.com',
                          pass: 'razne7-tobsuc-kyxtaG'
                        }
                      });
                      emailto = `${email}`;
                      var text = `<h1>Reference ID : ${ref.pre}</h1>
                      <p><b>Board Name: &nbsp;</b>${ref.boardname}</p>
                      <p><b>Name: &nbsp;</b>${ref.cname}</p>
                      <p><b>Address: &nbsp;</b>${ref.address}</p>
                      <h7>For any help please feel free to reply.</h7>`;

                      var mailOptions = {
                        from: 'projectdbmshelp@gmail.com',
                        to: emailto,
                        subject: 'Your application is submitted successfully.',
                        html:text
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    // Rendering the display page.
                    res.render("consumer/message",{refid:ref.pre,consumerId:user, admin:admin});

                    
                }
            });
            console.log("Removing data from new connection.");
            newconnection = {
                state_ut:"",
                distributioncompany:"",
                division:"",
                subdivision:""
            }
            ref.id = "";
        }
    });
});

router.get("/cancel",function(req, res){
    newconnection = {
        state_ut:"",
        distributioncompany:"",
        division:"",
        subdivision:""
    }
    res.redirect("/");
});

//===========================
//   STATUS ROUTES
//===========================
router.get("/status",function(req, res){
    res.render("consumer/status",{status:{message:""},consumerId:user, admin:admin});
});

router.post("/status",function(req, res){
    var ref = req.body.ref;
    var q = `select * from newconnection where refid="${ref}";`;
    connection.query(q, function(error, results){
        if(error){
            console.log("Error in getting the form status.")
        } else {
            if(results[0]){
                res.render("consumer/status",{status:{message:"Pending.."},consumerId:user, admin:admin});
            } else {
                q=`select * from consumer where email="${req.body.email}";`
                connection.query(q, function(error, results){
                    if(error){
                        console.log("Error in searching for user in Consumer table!")
                    } else {
                        if(results[0]){
                            res.render("consumer/status",{status:{message:"Congrats! Successfully registered."},consumerId:user, admin:admin});
                        } else {
                            res.render("consumer/status",{status:{message:"Sorry! Your application has been rejected."},consumerId:user, admin:admin});
                        }
                    }
                })
            }
        }
    });
});

//===========================
//   MESSAGE ROUTES
//===========================

router.get("/messages",function(req, res){
    res.render("consumer/message",{refid:ref.id,consumerId:user, admin:admin});
});

module.exports = router;