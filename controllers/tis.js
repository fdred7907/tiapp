const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const router = express.Router();

const TI = require("../models/tis");
const Incident = require("../models/incidents");
const User = require("../models/users");

const getNewTI = ((req,res,next)=>{
    
    res.render("newti");
    next();
});

const getTI = ((req,res,next)=>{
    const name = req.params.name;
    console.log(name);
    return TI.findOne({name:name})
    .then((ti)=>{
        res.render("tishow",{ti:ti});
    })
    .catch((err)=>{
        console.log(err);               
    }) ;
    next();
});

const editTI = ((req,res,next)=>{

    const name = req.params.name;   

    return TI.findOne({name:name})
    .then((ti)=>{
        res.render("tiedit",{ti:ti});
    })
    .catch((err)=>{
        console.log(err);               
    }) ;
    next();
})

const deleteTI = ((req,res,next)=>{
    const name = req.params.name;
    return TI.findOneAndDelete({name:name})
    .then((ti)=>{
        TI.find()
        .then((tis)=>{
        res.render("tis",{tis:tis});
    })
})
    .catch((err)=>{
        console.log(err);               
    }) ;
    next();     
})

const getTIs = ((req,res,next)=>{
    return TI.find({})
    .then((tis)=>{
        res.render("tis",{tis:tis});
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
})


const postNewTI = ((req,res,next)=>{
    const newTI = new TI({
        name:req.body.name,
        country : req.body.country,
        city :req.body.city,
        gender : req.body.gender,
        symptoms : req.body.symptoms,
        activism : req.body.activism,
    });
    console.log(newTI);

    return newTI.save()
    .then(()=>{
        TI.find({})
        .then((tis)=>{
            res.render("tis",{tis:tis});      
        })
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
    });

const postEditTI = ((req,res,next)=>{
    const name = req.params.name;

    return TI.findOne({name:name})
    .then((ti)=>{
        ti.name = req.body.name;
        ti.country = req.body.country;
        ti.city = req.body.city;
        ti.gender = req.body.gender;
        ti.symptoms = req.body.symptoms;
        ti.activism = req.body.activism;
        ti.save();
        res.render("tishow",{ti:ti});
    })
    .catch((err)=>{
        console.log(err);               
    }) ;
    next();
});

module.exports = {
    getNewTI,
    getTI,
    editTI,
    deleteTI,
    getTIs,
    postNewTI,
    postEditTI
};












