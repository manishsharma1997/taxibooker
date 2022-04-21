const mongoose = require('mongoose');
const taxi = new mongoose.Schema({
    name:{
        type:String, required:true
    },
    model:{
        type:Number, required:true
    },
    chassisNumber:{
        type:String, required:true
    },
    ratehourly:{
        type:Number, required:true
    },
    rateperday:{
        type:Number, required:true
    },
    passenger:{
        type:Number, required:true
    },
    cabtype:{
        type:String, enum:['SUV','Sedan','Luxury','Hatchback','Nano']
    },
    description:{
        type:String, required:true
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,ref:"users"
    }
    
})

const pic = new mongoose.Schema({
    path:{type:String},
    vehicleId:{type:mongoose.Schema.Types.ObjectId,ref:'taxi'}
})

module.exports.taxi = mongoose.model('taxi',taxi);
module.exports.pic = mongoose.model('pic',pic);