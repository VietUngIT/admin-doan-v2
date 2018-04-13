/**
*
* ItemAccount
*
*/

import React from 'react';
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
import { Link, } from 'react-router';


class ItemAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      
      hover : false,
    };
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
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" " + time;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return a;
  }
  get_Admin=()=>{
    this.props.getAdmin(this.props.row.userNickName,"")
    this.props.showHide();
    this.props.scrollTo();
  }
  render() {
    var role = false;
    var ac = false;
    var txtType = false;
    
    var newValue = false;
    var oldValue = false;
    switch(this.props.row.type){
      case "role":{
        txtType = "vai trò";
        switch(this.props.row.newValue){
          case "0" :{
            newValue = "Người chơi";
            break;
          }
          case "1" :{
            newValue = "Đại lý";
            break;
            
          }
          case "2" :{
            newValue = "Admin";
            break;
          }
          case "3" :{
            newValue = "Super Admin";
            break;
          }
          case "4" :{
            newValue = "MOD";
            break;
          }
          case "5" :{
            newValue = "GM";
            break;
          }
        }
        switch(this.props.row.oldValue){
          case "0" :{
            oldValue = "Người chơi";
            break;
          }
          case "1" :{
            oldValue = "Đại lý";
            break;
            
          }
          case "2" :{
            oldValue = "Admin";
            break;
          }
          case "3" :{
            oldValue = "Super Admin";
            break;
          }
          case "4" :{
            oldValue = "MOD";
            break;
          }
          case "5" :{
            oldValue = "GM";
            break;
          }
        }
        break;
      }
      case "active":{
        txtType = "trạng thái";
        switch(this.props.row.newValue){
          case "0" :{
            newValue = "Chưa active";
            break;
          }
          case "2" :{
            newValue = "Đã active";
            break;
          }
          case "1" :{
            newValue = "Đã update";
            break;
          }
          
        }
        switch(this.props.row.oldValue){
          case "0" :{
            oldValue = "Chưa active";
            break;
          }
          case "2" :{
            oldValue = "Đã active";
            break;
          }
          case "1" :{
            oldValue = "Đã update";
            break;
          }
          
        }
        break;
      }
      case "lock":{
        txtType = "lock/unlock";
        switch(this.props.row.newValue){
          case "0" :{
            newValue = "Chưa khóa";
            break;
          }
          case "1" :{
            newValue = "Đã khóa";
            break;
          }
                   
        }
        switch(this.props.row.oldValue){
          case "0" :{
            oldValue = "Chưa khóa";
            break;
          }
          case "1" :{
            oldValue = "Đã khóa";
            break;
          }
          
        }
        
        break;
      }
      case "totalMoney":{
        txtType = "tổng tiền";
        newValue = this.formatCurency(this.props.row.newValue);
        oldValue = this.formatCurency(this.props.row.oldValue);
        break;
      }
      case "lockedMoney":{
        txtType = "tiền trong két";
        newValue = this.formatCurency(this.props.row.newValue);
        oldValue= this.formatCurency(this.props.row.oldValue);
        break;
      }
      default:{
        txtType = this.props.row.type;
        newValue = this.props.row.newValue;
        oldValue = this.props.row.oldValue;
        break;
      }
    }
    return (
      <tr onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
      onMouseLeave={this.hoverOff}>
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
          {this.props.stt+1 }
        </td>  
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          {this.props.row.admin}
        </td>  
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          <Link onClick={this.get_Admin}>{this.props.row.userNickName}</Link>
        </td>  
         
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          {txtType}
        </td> 
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          {oldValue}
        </td> 
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          {newValue}
        </td> 
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          {this.props.row.reason}
        </td> 
      
        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
          {this.convertDate(this.props.row.createTime)}
        </td>   
       
      </tr>       
    );
  }
}

ItemAccount.propTypes = {

};

export default ItemAccount;
