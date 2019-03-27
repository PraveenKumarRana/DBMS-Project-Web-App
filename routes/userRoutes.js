const express = require("express");
const router = express.Router();
const {getData} = require("../models/index");

router.route("/getdata").get(getData);

module.exports = router;