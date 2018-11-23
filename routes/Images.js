const express =require('express')
const images= express.Router()
const cors= require('cors')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
var app= express()
const Image = require('../models/Image')
images.use(cors())
process.env.SECRET_KEY= 'secret'
const path = require('path');
const multer = require('multer');
var upload = multer({ dest: 'fip/src/components/images'} )
const fs= require('fs')
// const upload = multer({
//    storage: storage,
//    limits:{fileSize: 1000000},
// }).single("myimage");
images.post("/upload", upload.single('myimage'), function (req, res) {
  // req.file is the `avatar` file
  console.log(req.file)

  console.log(req.file.path)
  // req.body will hold the text fields, if there were any
 const filealias=Date.now()+req.file.originalname
 const finalpath=req.file.destination+'/'+filealias
fs.rename(req.file.path,req.file.destination+'/'+filealias,function(err){
	if(err)
		console.log(err);
})
const today= new Date()
const imageData = {
		file_name:filealias,
		uploaderemail:req.body.email,
		uploadeddate:today,
		like:0,
		comment:0,
		share:0
	}
Image.create(imageData)
console.log(req.body.status)
console.log("Request ---", req.body);

res.json({filename:filealias})
   }
)
module.exports=images

