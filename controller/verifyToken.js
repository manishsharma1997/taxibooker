const registeredUser = require('../models/register').registerer;
const jwt = require('jsonwebtoken');

module.exports.verifyToken = async(req, res, next)=>{
    const token = await req.header('token');
    if(!token){
        const verification = jwt.verify(token, process.env.SECRETKEY);
        if(verification){
            const user = await registeredUser.find({
                _id:verification._id
            })
            if(user){
                res.send(user);
            }
            else{'no user found'}
        }

    }else{
        res.send('no token found')
    }
}