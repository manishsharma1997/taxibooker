const {pic,taxi} = require('../models/taxiRegister')
const Booking = require('../models/taxiBooking')
const registerUser = require('../models/register').registerer
const userImage = require('../models/register').userImage
const nodemailer = require('nodemailer');
const secretKey = process.env.SECRETKEY
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const taxiBooking = require('../models/taxiBooking');

module.exports.registerTaxi = async(req,res)=>{
    // console.log(req.body);
    const userRole = await registerUser.findOne({email:req.body.email})
    if(userRole){
        if(userRole.role === "Driver" && userRole.isVerify === true){
    const taxis = await taxi.findOne({chassisNumber:req.body.chassisNumber})
    if(!taxis){
    const newtaxi = await new taxi({
        name:req.body.name,model:req.body.model,
        chassisNumber:req.body.chassisNumber,ratehourly:req.body.ratehourly,
        rateperday:req.body.rateperday,passenger:req.body.passenger,
        cabtype:req.body.cabtype,description:req.body.description, 
        driverId:req.body.driverId
    })
    newtaxi.save()
    console.log(req.file);
    const image = await new pic({
        path:req.file.path,
        vehicleId:newtaxi._id
    })
    image.save();
    res.send(newtaxi+"\n"+image)}
    else{res.send("duplicate data permission denied")}
}
else if(userRole.role === "Driver" && userRole.isVerify === false){
    res.send('You can not register taxi till you do not verify your account')
}else{
    res.send('You can not register a taxi as you are a user')
}}}
// module.exports.taxiImage=async(req,res)=>{
//     const taxiImage = await new pic({
//         path:req.file.path,
//         vehicleId:req.body.vehicleId
//     })
// }
// 

module.exports.alltaxis= async(req,res)=>{
    const alltaxi= await taxi.aggregate([{
        $lookup:{
            from:'pics',
            localField:'_id',
            foreignField:'vehicleId',
            as:'docs'
        }
    }])
    res.send(alltaxi);
}
module.exports.booktaxi=async(req,res)=>{
//         var transport=nodemailer.createTransport({service:'Gmail', host:'manish@gmail.com', port:252, auth:{
//         user:`${process.env.EMAILFROM}`,
//         pass:`${process.env.PASSWORD}`},secure:false
// })
//     var mailOption={from:'manish@manish.com',to:await req.body.email, subject:'Registered Successfully',text:
//     `Thanks for the booking ${req.body.destinationAddress}, our team will contact with you shortly`}
    
    const userExists= await registerUser.findOne({
        email:req.body.email
    })
    if(userExists){
    const taxiBooker = await new Booking({
        name:req.body.name, email:req.body.email,
        passenger:req.body.passenger, pickupAddress:req.body.pickupAddress,
        destinationAddress:req.body.destinationAddress,
        // destinationLattitude:req.body.destinationLattitude,destinationLongitude:req.body.destinationLongitude
        userId:req.body.userId,date:new Date(Date.now())
    })
    taxiBooker.save((err,docs)=>{
    // transport.sendMail(mailOption,function(err,response){
        if(err) throw err;
        else{res.send(taxiBooker);}
    })
}else{res.send("Please Login First")}
}


module.exports.registerUser= async(req, res)=>{
    const {firstName,lastName,email,number,password,isVerify,role}=req.body;
    let otp = Math.floor(Math.random()*10000)
    const newRegisterPerson = new registerUser({
        firstName,lastName,email,number,password,isVerify,role,otp:otp
    })
const newUser=await newRegisterPerson.save()
    // const userImages = new userImage({path:req.file.path, userId:newRegisterPerson._id})
    // userImages.save();
    // const jwtToken = jwt.sign({_id:newRegisterPerson._id},secretKey,{expiresIn:'1d'})
    res.send(newUser);
}

module.exports.login = async(req, res)=>{
    console.log(req.body);
    const finduser = await registerUser.findOne({ email:req.body.email })
    console.log(finduser);
    if(finduser){
        if(finduser.password == req.body.password){
        res.send(`Welcome ${finduser.firstName} sir!`)}
        else{
        res.send('password incorrect')}}
    else{
        res.send('no email exists')
    }
}