import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom'; 

export class Navbar extends Component{

	constructor(props)
  {
    super(props);
        this.state={
    "name":"Shailesh"
          
        
    };
    this.logout=this.logout.bind(this)  
}
	logout(e){
		e.preventDefault()
		alert("ENTERED")
		localStorage.removeItem('usertoken')
		this.props.history.push('')
	}
	render(){
		var loginreglink=(
			<div>
			<NavLink to='/register'>Register</NavLink>
			
			<NavLink to='/login'>Login</NavLink>
			</div>
			)

		var userlink=(
			<ul className="navbar-nav">
			<li className="nav-item">
			<NavLink to='/profile'>Profile</NavLink>
			</li>
			<li className="nav-item">
			<button onClick={this.logout}>Logout</button>
			</li> 
			
			</ul>)

	
		return (
			<div>
			<div className="navbar">
			<NavLink to='/'>Home</NavLink>
			{localStorage.usertoken ? userlink:loginreglink}
			</div>
			</div>
			)
	}
}