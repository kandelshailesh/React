var mongoose= require('mongoose')
var Schema = mongoose.Schema 

const Userschema = new Schema({
	first_name:{
		type:String
	},
	last_name:{
		type:String
	},
	email:{
		type:String
	},
	password:{
		type:String,
		
	},
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports=User=mongoose.model('users',Userschema)