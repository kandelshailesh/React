import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const images= require.context('./images',true)
export default class Status extends Component {
  render() {
    const imag=this.props.url;
    const imgsrc=`./${imag}`
    alert(imgsrc)
    return (
      <div>
      <br/>
      <div className="row">
      <div className="col-md-5 mt-4 mx-auto ">
      <img src={imgsrc} />
    
      </div>
      	</div>
        </div>
    
    );
  }
}

