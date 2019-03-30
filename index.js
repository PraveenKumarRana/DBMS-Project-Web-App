const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const powerCompanyRoutes = require("./routes/powerCompanyRoutes");
const transCompanyRoutes = require("./routes/transmissionCompany");
const distCompanyRoutes = require("./routes/distributionCompany");
const consumerRoutes = require("./routes/consumerRoutes");
const electricityBoardList = require("./routes/electricityBoardRoutes");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// My all routes will go here.
app.get('/', function(req, res){
    res.render("homepage");
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