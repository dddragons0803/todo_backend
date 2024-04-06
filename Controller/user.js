const User = require("../models/user")
const List = require("../models/list")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');
const register=  async(req,res)=>{
    try {
        const {email,username,password}= req.body ;
        console.log(req.body)
        // console.log(1)
       
            const hashedPassword = bcrypt.hashSync(password);
           
        // console.log(2)
       
            const user = new User({email,username,password:hashedPassword});
            // Proceed with saving the user or other operations
       
       
        // console.log(3)
        console.log(user)
        // console.log(1)
        await user.save();
        // console.log(1)
        // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({ user });
        // console.log(1)
    } catch (error) {
        res.status(400).json({message:"User Already Exist"});
    }
}

const signin=async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user)
        {
            res.status(400).json({message:"please sign up"})
        }
        const ispasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
        if(!ispasswordCorrect)
        {
            res.status(400).json({message:"password incorrect"})
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
      const {password ,...others} = user._doc; // passeord chorke baaki cheeje others mai hai , jo hame signin hone ke baad bhejni hai , pr password nhi bhejna 
      res.status(200).json({ others, token });
        
    } catch (error) {
        res.status(400).json({message:"User Already Exist"});
    }
}

module.exports= {register,signin};
