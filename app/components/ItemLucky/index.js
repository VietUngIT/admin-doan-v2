/**
*
* ItemLucky
*
*/

import React from 'react';
// import styled from 'styled-components';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Menu,
  Modal,
  Icon,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ItemLucky extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
    
      number :false,
      changed:false,
    };
  }
  convertDate = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date+" "+time ;
    return result;
  }
  onChangeNumber=(e)=>{
    // console.log("onChangeNumber")
    this.setState({number : e.target.value})
    this.props.onChangeNumber(this.props.row.id)    
  }
  onClickTyLe=(id)=>{
    // var temp = ;
    // console.log("ip",this.state.number)
    // console.log("id",id)
    this.props.update(id,this.state.number)
  }
  render() {

    return (
      <tr >
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.name}</td>
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,width:'15%'}}>
          <Input style={{textAlign:'center',padding:5}} defaultValue={this.props.row.max} type = "number" min = {0} ref={this.props.row.id} onChange={this.onChangeNumber}/>
        </td> 
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.value}</td> 
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.approver}</td>
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.convertDate(this.props.row.createTime)}</td>
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
          <Button  disabled={(this.props.changed && this.props.row.id == this.props.number)?false:true } onClick={(id)=>this.onClickTyLe(this.props.row.id)} type="primary">Update</Button>
        </td> 
      </tr>
    );
  }
}

ItemLucky.propTypes = {

};

export default ItemLucky;
