const express = require("express");
const User =require("../models/User");
const router = express.Router();
const bcrypt =require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewsare/fetchuser');
const {body,validationResult} =require('express-validator');
////////////////////////////////////////////////////////////////////////////////////////////////////
//ROUTE 1 creating user throught post req in thunderclient//no login required register or login up
const JW_secret ="heywearenomads";
router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5})
], async(req,res)=>{
    let success =false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    
    }
    try{
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"user already exists with this email"})
    }
    const salt =await bcrypt.genSalt(10);
   const hashing = await bcrypt.hash("req.body.password",salt);
     user =  await User.create({
            name:req.body.name,
            password:hashing, // will covert into password into hashing(asm#$11);
            email:req.body.email,})
         
        // res.send(req.body);
    // .catch(err=> {console.log(err) 
    //     res.json({error:'please enter a valid value'})
    // })
    const data ={
        user:{
            id:user.id,
        }
    }
    const jwtsign =jwt.sign(data,JW_secret);
    // console.log(jwtsign);
    success = true;
    res.json({success,jwtsign});
     }
     catch(error){
console.log(error.message);
res.status(500).send("error has occured");
     }

    
})

///////////////////////////////////////////////////////////////
//ROutE 2 login //when user tries to login with 
router.post('/login',[
    body('email','enter a email for login').isEmail(),
    body('password','password can not be empty').exists(),
], async(req,res) =>{
    let success = false;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
    const {email,password} =req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({errors:"please return with correct credentials"})
        }
        const comparpassword =bcrypt.compare(password,user.password);
        if(!comparpassword){
            success = false;
            return res.status(400).json({errors:"please return with correct credentials"})
        }

        const data ={
            user:{
                id:user.id,
            }
        }
        
        
        const jwtsign =jwt.sign(data,JW_secret);
        success = true;
        res.json({success,jwtsign});
    }
     catch(error){
        console.log(error.message);
        res.status(500).send("error has occured");
             }
}
)
///////////////////////////////////////////////////////////////////////////////////////////////////////
//route3 to get user details from token when login ed
router.post('/getuser',fetchuser,async(req,res) =>{
    try{
       let userId =req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send("error has occured");
    }
}
)
module.exports = router;