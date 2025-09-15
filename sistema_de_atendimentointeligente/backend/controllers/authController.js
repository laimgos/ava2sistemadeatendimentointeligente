const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req,res)=>{
  const { name, email, password, role } = req.body;
  try{
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message:'Email already'});
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,passwordHash:hash,role});
    return res.status(201).json({id:user._id, email:user.email});
  }catch(err){
    console.error(err);
    return res.status(500).json({message:'Server error'});
  }
};

exports.login = async (req,res)=>{
  const { email, password } = req.body;
  try{
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(400).json({message:'Invalid credentials'});
    const token = jwt.sign({id:user._id, role:user.role}, process.env.TOKEN_SECRET, {expiresIn:'1d'});
    return res.json({token});
  }catch(err){
    console.error(err);
    return res.status(500).json({message:'Server error'});
  }
};

exports.me = async (req,res)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({message:'No token'});
  try{
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-passwordHash');
    return res.json(user);
  }catch(err){
    return res.status(401).json({message:'Invalid token'});
  }
};
