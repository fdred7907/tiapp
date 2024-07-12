const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const router = express.Router();

const TI = require("./models/tis");
const Incident = require("./models/incidents");
const User = require("./models/users");

const getHomePage =require("./controllers/home");

const {getNewTI,postNewTI,getTI,editTI,deleteTI,getTIs,postEditTI,postFindTI,postFilterTI} = require("./controllers/tis");
const {getIncident,getNewIncident,postNewIncident,getIncidents} = require("./controllers/incidents");
const {getUserNew,postUserNew,getUserLogin,postUserLogin,getUserLogout,Verify} = require("./controllers/users");


//Home Page routes
router.get("/",getHomePage)

//TI routes

router.get("/tis/new",Verify,getNewTI);

router.get("/tis/show/:name",getTI);

router.get("/tis/edit/:name",Verify,editTI);

router.get("/tis/delete/:name",Verify,deleteTI);

router.get("/tis",getTIs);



router.post("/tis/new",postNewTI);
    
router.post("/tis/find",postFindTI);

router.post("/tis/edit/:name",postEditTI);
router.post("/tis/filter",postFilterTI);

//incident routes

router.get("/incidents/show/:date",getIncident);

router.get("/incidents/new",Verify,getNewIncident);

router.post("/incidents/new",Verify,postNewIncident);


router.get("/incidents",getIncidents);



//user routes
router.get("/users/new",Verify,getUserNew);
router.post("/users/new",postUserNew);
router.get("/users/login",getUserLogin);

router.post("/users/login",postUserLogin);

router.get('/users/logout',getUserLogout);


module.exports = router;
