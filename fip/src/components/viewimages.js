import React, { Component} from 'react';
import socketIOClient from 'socket.io-client'
import ReactDOM from 'react-dom';
// import Img from 'react-image'
// import image from './images/';

// import PropTypes from 'prop-types'; // ES6
import 'bootstrap/dist/css/bootstrap.css';
import './hello.css';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import 'font-awesome/less/font-awesome.less'


const images= require.context('./images',true)

export default class Viewimage extends Component {
	constructor(props)
	{
	super(props);

	this.socket = socketIOClient("http://localhost:5000")

	const token= localStorage.usertoken
	console.log(token)
	const decoded = jwt_decode(token)
	console.log(decoded)
	this.state={
	    data:[],
	    first_name:decoded.first_name,
	    last_name:decoded.last_name,
	    email:decoded.email,
	    comment:[],
	    name:this.props._id,
	    endpoint:"http://localhost:5000",
	    };
	 
	
	this.likebutton=this.likebutton.bind(this)
	this.comment=this.comment.bind(this)
	this.socket.on('comment',(data)=>
  {   
  	if(this.state.name===data.imageid)
  	{
  this.setState({
  comment:[...this.state.comment,data]
})}}
  )
      }
  componentDidMount(){
  	fetch(`http://localhost:5000/imagesinfo/${this.props._id}`)
    .then(response=>response.json())
    .then(response=>this.setState({comment:response.comment}))
    

    console.log("Hello from ComponentDidMount")
  }
	 


likebutton(e){

if(e.target.style.color==='black'){
  e.target.style.color='blue';
  console.log(e.target.getAttribute('name'))
  this.socket.emit('like',{'imageid':e.target.getAttribute('name')})
}
else{
  e.target.style.color='black';
  console.log(e.target.getAttribute('name'))
  this.socket.emit('unlike',{'imageid':e.target.getAttribute('name')})
}
}

comment(e){

  if(e.key==='Enter')
  {
    
    this.socket.emit('comment',{'commenteremail':this.state.email,'imageid':this.state.name,'comment':e.target.value})
    e.target.value=''
   }
}


 

   render() {
 


    return (
     
    <div>
      
				<div className="col-12" style={{borderRadius:'10px',border:'2px solid #EEE'}}>
					<a>{this.props.email}</a>
					<br/>
					<br/>
					<img style={{width:'100%'}} src={images(`./${this.props.file_name}`)} />
					<div  className="container">
						<div className="row">
							{this.props.like>0 ?<button ref={(ref) => { this.likeButton = ref; }} onClick={(e)=>this.likebutton(e)} name={this.props._id}style={{border:'0px',color:'blue',backgroundColor:'#EEE'}} className="col-sm-4"><i  className="fa fa-thumbs-o-up"></i><br/>{this.props.like}</button>:<button ref={(ref) => { this.likeButton = ref; }} onClick={(e)=>this.likebutton(e)} name={this.props._id}style={{border:'0px',color:'black',backgroundColor:'#EEE'}} className="col-sm-4"><i  className="fa fa-thumbs-o-up"></i><br/>{this.props.like}</button>
							}
							 <button onClick={(e)=>this.commentbutton(e)} style={{border:'0px',backgroundColor:'#EEE'}}  className="col-sm-4"><i  style={{color:'black'}} className="fa fa-comment"></i> <br/>{this.props.comment}</button>
						  	<button className="col-sm-4" style={{border:'0px',backgroundColor:'#EEE'}} >
						  	<i  style={{color:'black'}} className="fa fa-share-alt"></i>
						  	<br/>{this.props.share}</button>
				  		</div>
				  	</div>
				    <br/>
			
				<div style={{ maxHeight:'300px',overflowY:'scroll'}}> 
				   {this.state.comment.map(comments=>

				    (
				    <div>
				    <label className="col-md-12 " style={{ marginTop:'5px',minHeight:'20px',width:'95%',backgroundColor:'#EEF',borderRadius:'10px'}}>
				    <a>{comments.commenteremail}</a>
				    <label className="wrapping"> {comments.comment}</label>    			   
				    </label>

				    <button className="border border-0 bg-white" style={{marginTop:'-50px',marginLeft:'60px'}}>Like</button>
				    <button className="border border-0 bg-white" style={{marginTop:'-50px',marginLeft:'20px'}}>Reply</button>
				   </div>
				    )
				    )}

				   </div>
				   
		</div>

				<input onKeyPress={(e)=>this.comment(e)} style={{borderRadius:'5px',height:'50px',width:'100%',border:'2px solid #EEE'}} type="text" ref={(ref) => { this.commentButton = ref; }}  />
	</div>
		
      
    
    );
  }
}
