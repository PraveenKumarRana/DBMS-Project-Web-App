const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const powerCompanyRoutes = require("./routes/powerCompanyRoutes");
const transCompanyRoutes = require("./routes/transmissionCompany");
const distCompanyRoutes = require("./routes/distributionCompany");
const consumerRoutes = require("./routes/consumerRoutes");
const electricityBoardList = require("./routes/electricityBoardRoutes");
const connection = require("./models/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// My all routes will go here.
app.get('/', function(req, res){
    var q = `select * from managesession;`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log("Error generated during fetch of consumerId");
        } else {
            var consumerId;
            if(results[0]){
                consumerId = results[0].cid;
                console.log(consumerId);
            }
            res.render("homepage", {consumerId:consumerId});
        }
    });
});

app.post('/logout', function(req, res){
    var q = `delete from managesession;`;
    connection.query(q, function(error, results, fields){
        if(error){
            console.log("Error generated during fetch of consumerId");
        } else {
            var consumerId;
            if(results[0]){
                consumerId = results[0].cid;
                console.log(consumerId);
            }
            res.render("homepage", {consumerId:consumerId});
        }
    });
});


app.post('/', function(req, res){
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
                q = `insert into managesession values("${consumerId}");`;
                connection.query(q, function(error, results){
                    if(error){
                        console.log("Error generated while saving consumerId in the managesessionDb");
                    } else{
                        console.log("ConsumerId is saved in managesession!");
                    }
                });

                q = `select * from consumer where cid=${consumerId};`;
                connection.query(q, function(error, results){
                    if(error){
                        console.log("Error generated during fetch of the information.");
                    } else {
                        console.log(results);
                        res.render("homepage", {consumerId:results[0].cid});
                    }
                });
            }
        }
    });
});

app.use("/",consumerRoutes);
app.use("/",electricityBoardList);
app.use("/",powerCompanyRoutes);
app.use("/",transCompanyRoutes);
app.use("/",distCompanyRoutes);


// Starting the server.
app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});