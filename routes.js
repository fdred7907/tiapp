const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const router = express.Router();

const TI = require("./models/tis");
const Incident = require("./models/incidents");
const User = require("./models/users");

router.get("/",(req,res,next)=>{
    // const body = req.body;
    // console.log(body);
    res.render("home");
    next();
})

router.get("/tis/new",(req,res,next)=>{
    
    res.render("newti");
    next();
});

router.get("/tis/show/:name",(req,res,next)=>{
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
})

router.get("/tis/edit/:name",(req,res,next)=>{

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

router.get("/tis/delete/:name",(req,res,next)=>{
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

router.get("/tis",(req,res,next)=>{
    return TI.find({})
    .then((tis)=>{
        res.render("tis",{tis:tis});
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
})



router.post("/tis/new",(req,res,next)=>{
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

    


router.post("/tis/edit/:name",(req,res,next)=>{
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
})

router.get("/incidents/:date",(req,res,next)=>{
    const date = req.params.date;
    return Incident.findOne({date:date})
    .then((incident)=>{
        res.render("incident",{incident:incident}); 
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
})

router.get("/incidents/new",(req,res,next)=>{
    res.render("newincident");
    next();
});

router.post("/incidents/new",(req,res,next)=>{
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


router.get("/incidents",(req,res,next)=>{
    return Incident.find({})
    .then((incidents)=>{
        res.render("incidents",{incidents:incidents});
    })
    .catch((err)=>{
        console.log(err);
    }); 
    next();
});

//user routes
router.get("/users/new",(req,res,next)=>{

    res.render("newuser");
    next();
})  


router.post("/users/new",async (req,res,next)=>{
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

    //login user routes
    router.get("/users/login",(req,res,next)=>{
        res.render("userlogin");
        next();
    })

    router.post("/users/login",async (req,res,next)=>{
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
            


module.exports = router;
