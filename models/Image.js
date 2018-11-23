var mongoose= require('mongoose')
var Schema = mongoose.Schema 

const ImageSchemass=new Schema({
	file_name:{
		type:String
	},
	uploaderemail:{
		type:String
	},
	uploadeddate:{
		type:Date,
		default:Date.now
	},
	like:{
		type:Number

	},
	comment:{
		type:Number
	
	},
	share:{
		type:Number

	}
})

module.exports=Image=mongoose.model('listimagess',ImageSchemass)