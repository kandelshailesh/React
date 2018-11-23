import React, { Component} from 'react';

// import PropTypes from 'prop-types'; // ES6
import 'bootstrap/dist/css/bootstrap.css';
import './hello.css';
export class Hello extends Component {
	constructor(props)
	{
		super(props);
        this.state={
        	count:this.props.value,
        	
        	
        };
        // this.onDelete = this.onDelete.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
	}
                      
	onIncrement(id){
		this.setState({
  			count:this.state.count + 1,
  			
  		});
	}

	 componentWillmount() {
    // Remember state for the next mount
    this.setState({count:this.state.count});
  }


	onDecrement(){
		if(this.state.count>0)
		{
		this.setState({
  			count:this.state.count- 1,
  			
  		});
	}
	
	}

	onReset()
	{
		this.setState({count:0});
	}

	

  render() {
  
    return (
      <div>
      <br/>
      <div className="oncenter">
      <button id={this.props.id} onClick={()=>this.onIncrement(this.props.id)} className="btn btn-primary counter" >+</button>
      <button onClick={()=>this.onDecrement(this.props.id)} className="btn btn-warning counter">-</button>
      <label className="btn btn-primary counter counter1">{this.state.count}</label>
      <button onClick={()=>this.props.onDelete(this.props.id)} className="btn btn-outline counter">Delete</button>
      <button onClick={()=>this.onReset(this.props.id)} className="btn btn-outline counter">Reset</button>
      </div>
     
      	</div>
    
    );
  }
}

