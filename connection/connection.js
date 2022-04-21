const mongoose = require('mongoose');

var connect=()=>{
    const url = "mongodb://127.0.0.1:27017/clients"
    return mongoose.connect(url,{useNewUrlParser:true}, (err,data)=>{
        if(err){throw err}
        else{return console.log('Database Connected Successfully')}
    })
}
module.exports = connect();