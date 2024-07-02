const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const router = express.Router();

const TI = require("../models/tis");
const Incident = require("../models/incidents");
const User = require("../models/users");

const getUserNew = ((req,res,next)=>{
    res.render("newuser");
    next();
})

const postUserNew = (async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hash = bcrypt.hashSync(password,10);
    try {
        const oldUser = await User.findOne({email:email});
        if(oldUser){
            return res.status(400).json({error:"User already registered"});
        }
        const newUser = new User({username,email,password:hash});
        await newUser.save();
        res.status(200).json({message:"User created"});
    }
    catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

const getUserLogin = ((req,res,next)=>{
    res.render("userlogin");
    next();
});

const postUserLogin = (async (req,res,next)=>{
    try{
        let user = await User.findOne({email:req.body.email});
        if (!user){
            return res.status(401).json({error:"Incorrect email or password"});
        }
        const isCorrectPassword = bcrypt.compare(req.body.password,user.password);
        if (!isCorrectPassword){
            return res.status(401).json({error:"Incorrect email or password"});
        }
        const jwtoken = jwt.sign({id:user._id},SECRET);
        res.cookie("token",jwtoken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:300*1000
        });
        res.status(200).json({message:"Login successful"});
        
        }
        catch(error){
           return res.status(400).json({message:error.message})
        }
    });
    
const getUserLogout = ((req,res,next)=>{
    console.log("inside logout");
    if (req.cookies['token']){
        console.log("session found");
        res.clearCookie('token');
                res.send("Logged out successfully.");
        }
        else{
            console.log("no session found");
            res.end();
        }
});

//auth middle ware to verify user logged in

const Verify =  (async(req,res,next) =>{
    try{
        const IDCookie = req.cookies['token'];
        if (!IDCookie){ return res.sendStatus(401);}
        jwt.verify(IDCookie,SECRET,async (err,decoded)=>{
            if (err){
                return res.status(401).json({method:"Session Expired"});
            }

            const {id} = decoded;
            const user = await  User.findById(id);
            const {password,...data} = user._doc;
            req.user = data;
            next();
        });
    }
    catch(err){
        res.status(500).json({
            status:"error",
            code:500,
            message:"Internal server error",
            data:[]
        });

    }
})



module.exports = {getUserNew,postUserNew,getUserLogin,postUserLogin,getUserLogout,Verify};