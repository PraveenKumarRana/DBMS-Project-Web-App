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
var user = {
    cid:""
};

//======================================
//          HOMEPAGE ROUTES
//======================================
app.get('/', function(req, res){
    console.log("Printing the user from the get function.");
    console.log(user);
    res.render("homepage", {consumerId:user});
});

app.post('/logout', function(req, res){
    user.cid="";
    res.render("homepage", {consumerId:user});
});


app.post('/', function(req, res){
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
                        res.render("homepage", {consumerId:user});
                    }
                });
            }
        }
    });
});

//======================================
//          CONSUMER ROUTES
//======================================
app.use("/",consumerRoutes);
app.get("/profile", function(req, res){
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

app.use("/",electricityBoardList);
app.use("/",powerCompanyRoutes);
app.use("/",transCompanyRoutes);
app.use("/",distCompanyRoutes);


// Starting the server.
app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});