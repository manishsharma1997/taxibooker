const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"})
const bodyParser = require('body-parser');
require('./connection/connection');
const cors = require('cors');
const user = require('./models/taxiRegister').taxi;
const image = require('./models/taxiRegister').pic;
const registerer = require('./models/taxiBooking')
const { json } = require('express/lib/response');
const functions = require('./controller/userController');
const newPerson = require('./models/taxiBooking')
const userImage = require('./models/register').userImage;
const multer = require('multer');
app.use(cors())
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./views');
    },filename:(req,file,cb)=>{
        cb(null,Date.now()+'_pk_'+file.originalname)
    }
})
const upload=multer({storage});
app.get('/',(req,res)=>{
    res.send('hello')
})
app.get('/alltaxi',functions.alltaxis)
app.post('/newtaxi',upload.single('file'),functions.registerTaxi)
// app.post('/updatetaxi',functions.updatetaxi)
app.post('/booktaxi',functions.booktaxi)
app.post('/registeruser',upload.single('file'),functions.registerUser)
app.post('/login',functions.login)
// app.post('/taxiImage',upload.single('file'),functions.taxiImage)




app.listen(process.env.PORT  || 8000,()=>{
    console.log(`Server is listening on Port`)
})