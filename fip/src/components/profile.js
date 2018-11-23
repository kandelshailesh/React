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
import Viewimage from './viewimages'



const images= require.context('./images',true)

export default class Profile extends Component {
	constructor(props)
	{
		super(props);
    this.socket = socketIOClient("http://localhost:5000")
    const token= localStorage.usertoken
    console.log(token)
    const decoded = jwt_decode(token)
    console.log(decoded)
    this.result = [];
    
    this.state={
        status:'',
        data:[],
        first_name:decoded.first_name,
        last_name:decoded.last_name,
        email:decoded.email,
        filename: [],
        imagePreviewUrl: [],
        endpoint:"http://localhost:5000",
        isimageuploaded:false,
        finalresult:this.result
        };
     
      this.showFileUpload = this.showFileUpload.bind(this);
      this.preview = this.preview.bind(this)
      this.share = this.share.bind(this)
      this.handleonchange = this.handleonchange.bind(this)
      this.likebutton=this.likebutton.bind(this)
      this.comment=this.comment.bind(this)

      }
  componentDidMount(){
    fetch('http://localhost:5000/imageslist')
    .then(response=>response.json())
    .then(response=>this.setState({data:response.data}))
    

    console.log("Hello from ComponentDidMount")
  }
	 showFileUpload(e) {
    e.preventDefault()
    
    this.fileUpload.click()
    
  }
preview(e){
  e.preventDefault();
  
  let file = e.target.files;
  
  var j=0;
  for(var i=0;i<file.length;i++)
  {
    let reader = new FileReader();   
    reader.readAsDataURL(e.target.files[i])
    reader.onloadend = (id) => {
     
      this.setState({
        filename:[...this.state.filename,file[j].name],
        imagePreviewUrl:[...this.state.imagePreviewUrl,reader.result]
      });
   j++; 
  }

      
  }

   
    
}

share(e){
e.preventDefault()
var fname=this.state.first_name
var lname=this.state.last_name
var email=this.state.email

       console.log(fname)
const socket = socketIOClient(this.state.endpoint)
// alert(socket)
this.setState({
    file:this.fileUpload.files[0]
  });
var files= this.fileUpload.files[0]
// alert(files.type)

const formdata= new FormData()
formdata.append('myimage',files)

for (var key of formdata.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

var status=this.statusUpload.value;
var urldata=this.state.imagePreviewUrl;
console.log(formdata)
formdata.append('status',status)
formdata.append('email',email)

axios({
    method: 'post',
    url: 'images/upload',
    data: formdata,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        // var parse=JSON.parse(response)
      
        this.socket.emit('status',{'status':status,'email':email,'fname':fname,'lname':lname,'url':urldata,'filename':response.data.filename})
        console.log(response.data.filename)
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

this.uploadedimage.style.display='none';
this.uploadedimage.src='';    

    }







handleonchange(e){
  this.setState({
    [e.target.name]:e.target.value,
  
  });
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
  console.log(e.target.value)
  console.log(e.key)

  if(e.key==='Enter')
  {
    alert(e.target.value)
}
}



   render() {
 
this.socket.on('status',(data)=>
  {   
  const ima=(<div style={{width:'90%'}}><a style={{color:'blue'}} href='/login'>{data.fname} {data.lname}</a><br/>{data.status}<br/><img style={{width:'100%', border:'0px',height:'300px'}}  src={data.url} alt="lstd" /><br/><div  className="container"><div className="row"><button ref={(ref) => { this.likeButton = ref; }} onClick={(e)=>this.likebutton(e)} style={{border:'0px',color:'black',backgroundColor:'#EEE'}} className="col-sm-4"><i  className="fa fa-thumbs-o-up"></i></button><button style={{border:'0px',backgroundColor:'#EEE'}}  className="col-sm-4"><i  style={{color:'black'}} className="fa fa-comment"></i></button><button className="col-sm-4" style={{border:'0px',backgroundColor:'#EEE'}} ><i  style={{color:'black'}} className="fa fa-share-alt"></i></button></div></div></div>)
  ReactDOM.render(ima,this.Uploadimage);
  this.setState({
  imagePreviewUrl:[]
})
  })

    return (
     
      <div>
      <form onSubmit={(e)=>this.share(e)}>
      <br/>
<div className="row">
    <div className="col-md-5 mt-4 mx-auto ">
        <div className="row ">
            <input ref={(ref) => { this.statusUpload = ref; }} name="status" onChange={this.handleonchange}  style={{ height:'60px', outline:'2px solid #EFF',borderRadius:'5px' }} className="col-12 form-control"/>
        </div>
        <div className="row">
            <div style={{outline:'1px solid #EEE',padding:'6px'}} className="col-12 mt-7 mx-auto">
            <input name="myimage" onChange={(e)=>this.preview(e)} ref={(ref) => { this.fileUpload = ref; }} style={{display:'none'}} type="file" multiple />
            <button  onClick={(e)=>this.showFileUpload(e)}>Add photo</button>
            </div>
        </div>
        <div className="row">

        {this.state.imagePreviewUrl.map(url=>
        (
          <img ref={(ref)=>{this.uploadedimage=ref;}} alt="new" style={{width:'30%', height:'300px'}} src={url} />
        )
       )}
     
        </div> 
        <div className="row">
            <div className="col-10"></div>

            <button  className="col-2 btn btn-sm btn-primary" >Share</button>
        </div>
    </div>
</div>
      </form>
<div className="row" >
<div ref={(ref) => { this.Uploadimage = ref;}} className="col-md-5 mt-4 mx-auto ">
</div>
</div>
  <div className="row">
  <div className="col-md-5 mt-4 mx-auto">                                                                                                                                                                                                                                                            
{this.state.data.map(result=>
  (

<Viewimage _id={result._id} email={result.uploaderemail} file_name={result.file_name} like={result.like} comment={result.comment} share={result.share} />
)
)}

</div>
</div>


        </div>
      
    
    );
  }
}

