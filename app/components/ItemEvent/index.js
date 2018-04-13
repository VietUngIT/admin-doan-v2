/**
*
* ItemEvent
*
*/

import React from 'react';
// import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon,
  Switch ,
} from 'antd';

class ItemEvent extends React.Component { 
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
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
    return result;
  }
  formatMoney(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  setEvenValue=(row)=>{
    var quyE = false;
    var nameGE = false;
    var GID = false;
    quyE = row.toString().match(/\d/g);
    
    if(quyE){
      var temp = quyE.join("").toString();       
      quyE = parseInt(quyE.join(""));   
      nameGE = row.toString().split(temp)[0];     
    }else{
      quyE = 0;
      nameGE = row;
    }
    
    switch(nameGE){
      case "baucua":
      {
        GID = 7;
        break;
      }
      case "minipoker":
      {
        GID = 1;
        break;
      }
      case "quanan":
      {
        GID = 2;
        break;
      }
      case "luongson":
      {
        GID = 3;
        break;
      }
      case "como":
      {
        GID = 4;
        break;
      }
      case "caoboi":
      {
        GID = 5;
        break;
      }
      case "caothap":
      {
        GID = 6;
        break;
      }
    }
    if(this.state.m_value ){
      this.props.setEvenValue(GID,quyE,this.state.m_value.split(".").join(""))
      // this.setState(
      //   {m_value: ""},
      // );
    // this.props.getEvenValue();
    
    }else{
      message.error("Nhập lượng tiền cộng vào hũ !")
    }

  }
  
  setFundValue(row){
    var quy = false;
    var nameG = false;
    var gid = false;
    quy = row.toString().match(/\d/g);
    
    if(quy){
      var t = quy.join("").toString();       
      quy = parseInt(quy.join(""));   
      nameG = row.toString().split(t)[0];     
    }else{
      quy = 0;
      nameG = row;
    }

    switch(nameG){
      case "baucua":
      {
        gid = 7;
        break;
      }
      case "minipoker":
      {
        gid = 1;
        break;
      }
      case "quanan":
      {
        gid = 2;
        break;
      }
      case "luongson":
      {
        gid = 3;
        break;
      }
      case "como":
      {
        gid = 4;
        break;
      }
      case "caoboi":
      {
        gid = 5;
        break;
      }
      case "caothap":
      {
        gid = 6;
        break;
      }
    }
    
    if(this.state.m_valueF ){
      this.props.setFundValue(gid,quy,this.state.m_valueF.split(".").join(""))

    }else{
      message.error("Nhập lượng tiền cộng vào quỹ !")
    }
  }
  onChangeCurrent=(event)=> {
    this.setState(
      {m_value: event.target.rawValue},
    );
    this.props.onChangeCurrent(this.props.row.gameName);
  }
  onChangeCurrentFund=(event)=> {

    this.setState(
      {m_valueF: event.target.rawValue},
    );

    this.props.onChangeCurrentFund(this.props.row.gameName);
  }
  render() {
    return (
     
              <tr onMouseEnter={this.hoverOn} style={{background:this.state.hover?"#f0f0f0":"white"}}
              onMouseLeave={this.hoverOff}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.row.gameName}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                    {this.formatMoney(this.props.row.fund)}                    
                </td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,width:this.props.isMobile?'25%':'15%'}}>
                  <div style={{display:'flex'}}>
                    <Cleave 
                      style={{flex : 1.5,height:35,marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                      options={{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand'
                      }}
                      onChange={this.onChangeCurrentFund.bind(this)} 
                      // placeholder = "Nhập lượng tiền" 
                    />
                    <Button 
                      icon="plus" style={{flex : 1,height:35,width:35,}} 
                      onClick={(r)=>this.setFundValue(this.props.row.gameName)}
                      disabled={(this.props.changed && this.props.row.gameName == this.props.gameName)?false:true }
                    >
                    </Button> 
                  </div>                
                </td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatMoney(this.props.row.pot)}</td>              
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,width:this.props.isMobile?'25%':'15%'}}>
                  <div style={{display:'inline-flex'}}>
                    <Cleave 
                      style={{
                        display:this.props.row.gameName.toString().split("1")[0]!=="baucua"?'':'none',
                        flex : 1,
                        height:35,marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
                      options={{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand'
                      }}
                      onChange={this.onChangeCurrent.bind(this)}
                      // placeholder = "Nhập lượng tiền" 
                    />
                    <Button 
                      icon="plus" style={{flex : 1,display:this.props.row.gameName.toString().split("1")[0]!=="baucua"?'':'none',height:35,width:35}} 
                      onClick={(r)=>this.setEvenValue(this.props.row.gameName)}
                      disabled={(this.props.changedE && this.props.row.gameName == this.props.gameNameE)?false:true }
                    >
                      
                    </Button>  
                  </div>                 
                </td>
              </tr> 
     
    );
  }
}

ItemEvent.propTypes = {

};

export default ItemEvent;
