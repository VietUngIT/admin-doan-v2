/**
*
* ItemBackUp
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Link, } from 'react-router';
import{Icon} from 'antd'
// import { Link as LinkImport } from 'react-router-dom';
class ItemBackUp extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      hover : false,

    }
  }
  hoverOn=()=>{
    this.setState({
      hover: true,
    });
  }
  hoverOff=()=>{
    this.setState({
      hover: false,
    });
  }
  download=()=>{

  }
  render() {
    return (
      <tr onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
      onMouseLeave={this.hoverOff}>
        
        <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            {this.props.index}
        </td> 
        
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
         
          {this.props.row.date.split(".csv")[0]}
          
         </td>   
         <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
            <a href={this.props.row.url} onClick={this.download}>
              
              <div><Icon type="cloud-download-o" style={{fontSize:30}}/></div>
              <div>{this.props.row.url} </div>
            </a>
         </td>  
         
      </tr>
    );
  }
}

ItemBackUp.propTypes = {

};

export default ItemBackUp;
