const jwt = require('jsonwebtoken');
const JW_secret ="heywearenomads";
const fetchuser =(req,res,next)=>{
    const token = req.header('jwt-sign');
if(!token){
    res.status(401).send({error:"error has occured"});
}
try{
    const data = jwt.verify(token,JW_secret);
    req.user = data.user;
    next();
}catch(error){
    console.log(error.message);
    res.status(401).send({error:"error has occured"});
}


}
module.exports =fetchuser;