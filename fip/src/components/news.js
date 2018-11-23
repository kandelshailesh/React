import React, { Component} from 'react';

// import PropTypes from 'prop-types'; // ES6

export class News extends Component {

	constructor(props)
	{
		super();
        this.state={
        	rn:props.rn,
        	status:0,
        	values:0
        };
	}
	onIncrement()
  	{
  		this.setState({
  			rn:this.state.rn + 1,
  			values:this.state.values + 1
  		});
  	}
  render() {
  let text="Eve";
    return (
      <div>Welcome {this.props.name} {text} Roll No: {this.state.rn} 
      
      	{this.props.children}
      	<button onClick={()=>this.onIncrement()}> Increment  {this.state.rn} </button>
      	<button> Value  {this.state.values} </button>


      	</div>
    
    );
  }
}

