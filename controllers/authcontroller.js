const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {generateToken}=require("../utils/generateToken");
const userModel = require('../models/user-model');

module.exports.registerUser=async function (req,res){
  try{
     let {email,fullname,password}=req.body;

let user=await userModel.findOne({email:email});
if(user){
      req.flash("you have an account ,please login");
      return res.redirect("/");  
    }

     bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,async (err,hash)=>{
        if(err) return res.send(err.message);
        else{
      let user = await userModel.create({
         email,
         password:hash,
         fullname
});
   let token=generateToken(user);
   res.cookie("token",token);
      req.flash("success", "User created successfully!");
      return res.redirect("/");
        }
      });
     });
}
  catch(err){
  res.send(err.messege);
  }
}

module.exports.loginUser=async(req,res)=>{
    let {email,password}=req.body;

    let user=await userModel.findOne({email:email});
    if(!user){ 
     req.flash("error","email or password incorrect");
    return res.redirect("/");
  }

    bcrypt.compare(password,user.password,(err,result)=>{
       if(result){
         let token=generateToken(user);
         res.cookie("token",token);
         res.redirect("/shop");
        }
        else{
           req.flash("error","email or password incorrect"); 
           return res.redirect("/");
        }
    });
};
module.exports.logout = (req,res)=>{
  res.cookie("token","");
  res.redirect("/");
}