const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const mysql = require("mysql");

var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "admin",
    database: "eds"
});

function connect(){
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}

function endConnection(){
    connection.end();
}


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// My all routes will go here.
app.get('/', function(req, res){
    res.render("homepage");
});

app.get("/powercompanylist", function(req,res){
    connect();
    const q = "select * from powercompany;";
    var resultData=[];
    connection.query(q, function(error, results, fields){
        if(error) throw error;
        resultData = [...results];
        // console.log(results);
    });
    endConnection();
    console.log(resultData);
})


app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});