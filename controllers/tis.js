const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const router = express.Router();

const TI = require("../models/tis");
const Incident = require("../models/incidents");
const User = require("../models/users");

const styles = [];

const getNewTI = ((req,res,next)=>{
    
    res.render("newti");
    next();
});

const getTI = ((req,res,next)=>{
    const styles = [];
    styles.push("/css/tiitem.css");
    const name = req.params.name;
    console.log(name);
    return TI.findOne({name:name})
    .then((ti)=>{
        res.render("tishow",{ti:ti,styles:styles});
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
    const styles = [];
    styles.push("/css/tis.css");
    return TI.find({})
    .then((tis)=>{
        res.render("tis",{tis:tis,styles:styles});
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

const postFindTI =((req,res,next)=>{
    const ti = req.body.ti;
    // console.log(ti);
    styles.push("/css/tiitem.css");
    return TI.findOne({name:{$regex:ti,$options:"i"}})
    .then((ti)=>{
        if (ti){
        res.render('tishow',{ti:ti,styles:styles});
        }
        else{  
            res.status(401).send("TI not found");
        }
    })
    .catch((err)=>{
        res.status(401).send(err);
    });
    next();
});


const postFilterTI =((req,res,next)=>{
    const category = req.body.filterCat;
    const value = req.body.filterValue;
    let query={};
    query[category] ={$regex:value,$options:"i"};
    styles.push("/css/tis.css");
    return TI.find(query)
    .then((tis)=>{
        console.log(tis.length);
        if (tis.length > 0){
            res.render('tis',{tis:tis,styles:styles});
        }
        else{
            res.status(401).send("No TIs match the search criteria");
        }
    })
    .catch((err)=>{
        res.status(401).send(err);
    });
    next();
});

module.exports = {
    getNewTI,
    getTI,
    editTI,
    deleteTI,
    getTIs,
    postNewTI,
    postEditTI,
    postFindTI,
    postFilterTI
};












