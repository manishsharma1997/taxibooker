const mongoose = require('mongoose');
const newPerson = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    passenger:{type:String, required:true},
    pickupAddress:{type:String, required:true},
    // pickupLattitude:{type:Number, required:true},
    // pickupLongitude:{type:Number, required:true},
    destinationAddress:{type:String, required:true},
    // destinationLattitude:{type:String, required:true},
    // destinationLongitude:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    date:{type:String}

})

module.exports = mongoose.model('Booking', newPerson);