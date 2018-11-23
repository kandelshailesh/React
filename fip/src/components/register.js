import React, { Component} from 'react';

// import PropTypes from 'prop-types'; // ES6
import 'bootstrap/dist/css/bootstrap.css';
import './hello.css';
import {register} from './userfunction'
export default class Register extends Component {
	constructor(props)
	{
		super(props);
        this.state={
          first_name:'',
          last_name:'',
        	email:'',
        	password:''	
        };
        this.onchange = this.onchange.bind(this);
        this.onsubmit = this.onsubmit.bind(this);

      }
  
	onchange(e)
  {
    this.setState({[e.target.name]: e.target.value})
  }
  onsubmit(e)
  {
    e.preventDefault()
    const user={ first_name:this.state.first_name,last_name:this.state.last_name, email:this.state.email, password:this.state.password}
    register(user).then(res=>{

        this.props.history.push('/login')
      
    })
  }

  render() {
  
    return (
      <div>
      <br/>
      <div className="row">
      <div className="col-md-5 mt-4 mx-auto ">
      <form onSubmit={this.onsubmit}>
        <div className="form-group">
      <input className="form-control" name="first_name" placeholder="Enter firstname" onChange={this.onchange} value={this.state.first_name} type="text" />
    </div>

      <div className="form-group">
      <input className="form-control" name="last_name" placeholder="Enter lastname" onChange={this.onchange} value={this.state.last_name} type="text" />
    </div>
     
        <div className="form-group">
      <input className="form-control" name="email" placeholder="Enter email" onChange={this.onchange} value={this.state.email} type="email" />
    </div>
    <div className="form-group">
      <input className ="form-control" name="password" value={this.state.password} onChange={this.onchange} placeholder="Enter Password" type="password" />
    </div>
      <button className="btn btn-primary" type="submit">Register</button>
      </form>
      </div>
      </div>
      	</div>
    
    );
  }
}

