const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const moment = require('moment');


const router = express.Router();

const TI = require("../models/tis");
const Incident = require("../models/incidents");
const User = require("../models/users");

const {dateParser} = require('../helpers/incidentsHelper');

const getIncident = ((req,res,next)=>{
    const styles = [];
    styles.push('/css/incident.css');
    const date = req.params.date;
    return Incident.findOne({date:date})
    .then((incident)=>{
        res.render("incident",{incident:incident,dateParser:dateParser,styles:styles}); 
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
});

const getNewIncident = ((req,res,next)=>{
    res.render("newincident");
    next();
});

const postNewIncident = ((req,res,next)=>{
    const newIncident = new Incident({
        ti:req.body.ti,
        place : req.body.place,
        date :req.body.date,
        description : req.body.description,
        action : req.body.action,
        pictures : req.body.pictures,
        videos : req.body.videos,
        audio : req.body.audio,
        documents : req.body.documents,
        links : req.body.links,
    });
    console.log(newIncident);
    return newIncident.save()
    .then(()=>{
        res.render("incident",{incident:newIncident});
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
    });

    const getIncidents = ((req,res,next)=>{
        const styles = [];
        styles.push('/css/incidents.css');
        return Incident.find({})
        .then((incidents)=>{
            res.render("incidents",{incidents:incidents,styles:styles,dateParser:dateParser});
        })
        .catch((err)=>{
            console.log(err);
        }); 
        next();
    });
    

module.exports = {getIncident,getNewIncident,postNewIncident,getIncidents};

    