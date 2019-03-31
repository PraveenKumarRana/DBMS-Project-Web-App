const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const powerCompanyRoutes = require("./routes/powerCompanyRoutes");
const transCompanyRoutes = require("./routes/transmissionCompany");
const distCompanyRoutes = require("./routes/distributionCompany");
const consumerRoutes = require("./routes/consumerRoutes");
const electricityBoardList = require("./routes/electricityBoardRoutes");
const hompPageRoutes = require("./routes/homepageRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//======================================
//          GLOBAL VARIABLES
//======================================
user = {
    cid:""
};

admin = {
    eid:""
}

//======================================
//          HOMEPAGE ROUTES
//======================================
app.use("/",hompPageRoutes);
app.use("/",consumerRoutes);
app.use("/",electricityBoardList);
app.use("/",powerCompanyRoutes);
app.use("/",transCompanyRoutes);
app.use("/",distCompanyRoutes);
app.use("/",adminRoutes);


// Starting the server.
app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});