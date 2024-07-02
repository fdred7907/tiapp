const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const router = express.Router();

const TI = require("../models/tis");
const Incident = require("../models/incidents");
const User = require("../models/users");




const getHomePage = ((req,res,next)=>{
    // const body = req.body;
    // console.log(body);
    const styles=[];
    styles.push("/css/home.css");
    console.log(req.session);
    res.render("home",{styles:styles});
    next();
});

module.exports = getHomePage