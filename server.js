var express= require('express')
var cors= require('cors')
var app= express()
var formidable= require('formidable')
var bodyparser= require('body-parser')
var mongoose= require('mongoose')
const i = require('./models/Image')
const c = require('./models/Comment')

var server= app.listen(5000,function()
{
	console.log("Listening to the port 5000");
});
app.use(bodyparser.json())
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
var fs=require('fs')

var socket=require('socket.io');
var io=socket(server)
app.get('/imageslist/',(req,res)=>{

	i.find({})
	.then(imagelist=>
	{
		console.log(imagelist)
		res.json({data:imagelist})
	})

	console.log("Hello from imageslist")

})

app.get('/imagesinfo/:id',(req,res)=>{
	console.log(req.params.id)
	c.find({imageid:req.params.id})
	.then(commentlist=>
	{
		console.log(commentlist)
		res.json({comment:commentlist})
	})

	console.log("Hello from imagesinfo")

})
io.on('connection',function(socket){
	console.log('made socket connection')
	
    // fs.rename(oldpath, newpath, function (err) {
    //     if (err) throw err;
    //     res.write('File uploaded and moved!');
    //     res.end();
    //   });
    socket.on('like',function(data)
    {
    	i.findOne({_id:data.imageid},function(err,doc){
    		console.log(data.imageid)
    		console.log(doc)
    		doc.like=doc.like+1;

    		doc.save();
    	})
    })

    socket.on('comment',function(data)
    { 	
   	const commentdata={
   		imageid:data.imageid,
   		commenteremail:data.commenteremail,
   		comment:data.comment
   	}
   	console.log(commentdata)
   	c.insertMany(commentdata,function(err){
   		if(err) throw err;
   		console.log("hello")

   })
   io.sockets.emit('comment',data)

    })

    socket.on('unlike',function(data)
    {
    	i.findOne({_id:data.imageid},function(err,doc){
    		console.log(data.imageid)
    		console.log(doc)
    		if(doc.like>0)
    		{
    		doc.like=doc.like-1;
}
    		doc.save();
    	})
    })

	socket.on('status',function(data)
	{
	// var form = new formidable.IncomingForm(),files = [], fields = [];
	console.log(data)
    // form.parse(data.file, function (err, fields, files) {
    // var oldpath = files.filetoupload.path;
    // var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
    // console.log(oldpath)

//     fs.copyFile(data.file,'images/', (err) => {
//     if (err) throw err;
//     console.log('source.txt was copied to destination.txt');
// });
	io.sockets.emit('status',data);




})

})

const mongoURL= 'mongodb://localhost:27017/mernlogin'

mongoose.connect(mongoURL,{useNewUrlParser:true})
.then(()=>console.log("Mongodb connected"))
.catch(err=>console.log(err))

var Users= require('./routes/Users')
var Images=require('./routes/Images')
app.use('/users',Users)
app.use('/images',Images)

