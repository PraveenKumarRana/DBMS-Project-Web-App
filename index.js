const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// My all routes will go here.
app.get('/', function(req, res){
    res.send("This will be my Homepage!");
});


app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});