const mongoose = require('mongoose');

var connect=()=>{
    const url = "mongodb+srv://root:root@cluster0.oyccw.mongodb.net/clients?retryWrites=true&w=majority"
    return mongoose.connect(url,{useNewUrlParser:true}, (err,data)=>{
        if(err){throw err}
        else{return console.log('Database Connected Successfully')}
    })
}
module.exports = connect();