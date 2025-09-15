const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({message:'No token'});
  const parts = authHeader.split(' ');
  if(parts.length!==2) return res.status(401).json({message:'Token error'});
  const token = parts[1];
  try{
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  }catch(err){
    return res.status(401).json({message:'Invalid token'});
  }
};
