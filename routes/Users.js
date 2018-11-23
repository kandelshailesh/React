const express =require('express')
const users= express.Router()
const cors= require('cors')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
var app= express()
const User = require('../models/User')
users.use(cors())
process.env.SECRET_KEY= 'secret'
const path = require('path');
const multer = require('multer');

const fs= require('fs')

users.post('/register',(req,res)=>{
	const today = new Date()
	const userData = {
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		email:req.body.email,
		password:req.body.password,
		created:today
	}

	User.findOne(
	{
		email:req.body.email
	})
	.then(user=>{
		if(!user)
		{
			
			bcrypt.hash(req.body.password,10,(err,hash)=>{
				userData.password=hash
				console.log(userData)
				User.create(userData)
				.then(user=>{
					res.json({status: req.body.email+'registered'})
					console.log("registered")
				})
				.catch(err=>{
					res.send('error:'+err)
					console.log(err)
				})
			})
		}
		else
		{
			res.json({error:'User already exists'})
			console.log("User already exists")
		}
	})
	.catch(err=>{
		res.send('error'+ err)
		console.log("not coming")
	})
})

// const storage = multer.diskStorage({
//    destination: "./public/uploads/",
//    filename: function(req, file, cb){
//       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//    }
// });

var upload = multer({ dest: 'fip/src/components/images'} )
// const upload = multer({
//    storage: storage,
//    limits:{fileSize: 1000000},
// }).single("myimage");
// users.post("/upload", upload.single('myimage'), function (req, res) {
//   // req.file is the `avatar` file
//   console.log(req.file)

//   console.log(req.file.path)
//   // req.body will hold the text fields, if there were any
//  const filealias=Date.now()+req.file.originalname
// fs.rename(req.file.path,req.file.destination+'/'+filealias,function(err){
// 	if(err)
// 		console.log(err);
// })

// console.log(req.body.status)
// console.log("Request ---", req.body);

// res.json({filename:filealias})
//    }
// )





users.post('/login',(req,res)=>{
	User.findOne(
	{
		email:req.body.email
	})
	.then(user=>{

		if(user)
		{
			if(bcrypt.compareSync(req.body.password,user.password)){

				const payload= {
					_id:user._id,
					first_name:user.first_name,
					last_name:user.last_name,
					email:user.email
				}
				console.log(payload)
				let token= jwt.sign(payload,process.env.SECRET_KEY,{
					expiresIn:1440
				})
				console.log(token)
				res.send(token)

		}
		else
		{
			res.json({error:'User doesnot exists'})
			console.log("Hello")
		}
	}
	else
	{
		res.json({error:'User doesnot exists'})
		console.log("Hi")
	}})
	.catch(err=>{
		res.send('error'+ err)
		console.log(err)
	})
})

module.exports=users