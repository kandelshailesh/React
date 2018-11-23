import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Hello} from './hello'
export default class Home extends Component{
			constructor(props)
  {
    super(props);
        this.state={
    counters:[
    {id:1,value:0},
    {id:2,value:0},
    {id:3,value:0},
    {id:4,value:0}]
          
          
    };
    this.onDelete = this.onDelete.bind(this);
        
  }
 

  onDelete(index)
  {
const counters = this.state.counters.filter(c=> c.id!==index) ;
this.setState({counters});
}render(){
return(
		<div>
				{this.state.counters.map(counter=>
        (
          <Hello onDelete={this.onDelete} key={counter.id} value={counter.value} id={counter.id} />
        )
       )}
				</div>
			)
	}
}