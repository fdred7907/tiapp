const express = require("express");

const router = express.Router();

const tis = require("./models/tis");

router.get("/",(req,res,next)=>{
    // const body = req.body;
    // console.log(body);
    res.render("home");
    next();
})

router.get("/tis",(req,res,next)=>{

    res.render("tis",{tis:tis});
    next();
})

router.get("/admin",(req,res,next)=>{
    res.render("admin",{tis:tis});
    next();
})

module.exports = router;
