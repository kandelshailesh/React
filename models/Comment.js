var mongoose= require('mongoose')
var Schema = mongoose.Schema 

const CommentSchema=new Schema({
	imageid:{
		type:String
	},
	commenteremail:{
		type:String
	},
	commenteddate:{
		type:Date,
		default:Date.now
	},
	comment:{
		type:String
	},
	like:{
		type:Number
	}
})

module.exports=Comment=mongoose.model('comment',CommentSchema)