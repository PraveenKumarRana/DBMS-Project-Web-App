const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const errorHandler = require("./handlers/errorHandler");

app.use(cors());
app.use(bodyParser.json());


// My all routes will go here.
app.use(function(req, res, next){
    let err = new Error("Page not found!");
    err.status= 404;
    next(err);
});
app.use(errorHandler);


app.listen(PORT, function(){
    console.log(`The server is running at ${PORT}`);
});