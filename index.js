const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const powerCompanyRoutes = require("./routes/powerCompanyRoutes");
const transCompanyRoutes = require("./routes/transmissionCompany");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// My all routes will go here.
app.get('/', function(req, res){
    res.render("homepage");
});

app.use("/api/",powerCompanyRoutes);
app.use("/api/",transCompanyRoutes);


// Starting the server.
app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});