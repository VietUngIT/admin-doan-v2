/**
*
* AddBotMoney
*
*/

import React from 'react';
// import styled from 'styled-components';
import CurrencyInput from 'react-currency-input';
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
var bn = "";

class AddBotMoney extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      m_value : "",
    };
  }

  onChangeInputNick=(k)=>{
    bn = k.target.value.trim();
    
  }
  handleChange=(event, maskedvalue, floatvalue)=>{
    this.setState({m_value: maskedvalue});
  }
  onClick=()=>{
    if(bn !=""&& this.state.m_value){
      this.props.addBotMoney(this.state.m_value.split(".").join(""),bn);
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  convertDate (time) {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" "+time;
    return result;
  }
  render() {
    var content = false;
    var item = false;
    if(this.props.isAdd){
      <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
      </center>  
    }else{
      if(this.props.dataMoney && this.props.dataMoney.length > 0 ){
        item = this.props.dataMoney.map((row,index)=>{
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #ccc',fontSize:13,textAlign:'center',padding:5}}>
                {row.approver}
              </td> 
              <td style={{height:40,border:'1px solid #ccc',fontSize:13,textAlign:'center',padding:5}}>
                {row.botNickName}
              </td>  
              <td style={{height:40,border:'1px solid #ccc',fontSize:13,textAlign:'center',padding:5}}>
                {this.formatCurency(row.addMoney)}
              </td> 
              <td style={{height:40,border:'1px solid #ccc',fontSize:13,textAlign:'center',padding:5}}>
                {this.formatCurency(row.totalMoney)}
              </td>
              <td style={{height:40,border:'1px solid #ccc',fontSize:13,textAlign:'center',padding:5}}>
                {row.reason}
              </td>   
              <td style={{height:40,border:'1px solid #ccc',fontSize:13,textAlign:'center',padding:5}}>
                {this.convertDate(row.createTime)}
              </td> 
            </tr>  
          )
        })
  
        content=(
          <div style={{overflow:'auto'}}>
            <table style={{marginLeft:'2%',marginTop:'1%',width:'96%'}}>
              <tbody>              
                <tr>               
                  <th style={{height:50,border:'1px solid #ccc',fontSize:15,textAlign:'center',padding:5}}>Người tạo</th>
                  <th style={{height:50,border:'1px solid #ccc',fontSize:15,textAlign:'center',padding:5}}>Nickname Bot</th>
                  <th style={{height:50,border:'1px solid #ccc',fontSize:15,textAlign:'center',padding:5}}>Tiền thêm</th>
                  <th style={{height:50,border:'1px solid #ccc',fontSize:15,textAlign:'center',padding:5}}>Tổng tiền</th>
                  <th style={{height:50,border:'1px solid #ccc',fontSize:15,textAlign:'center',padding:5}}>Reason</th>
                  <th style={{height:50,border:'1px solid #ccc',fontSize:15,textAlign:'center',padding:5}}>Ngày tạo</th>
                  
                </tr>  
                {item}
              </tbody>
            </table>  
          </div>
          
        )
      }
    }
   
    return (
      <div>
        <table style={{marginLeft:'5%',marginTop:'1%'}}>
          <tbody>  
              
              <tr style={{fontSize:13}}>
                <td>Bot Nickname : </td>
                <td style={{width:10}}/>
                <td>
                  <Input placeholder="Nhậ­p nickname" style={{height:35,width:'87%',marginLeft:'1%'}} 
                    ref="InputNick"
                    onChange={this.onChangeInputNick}/>
                </td>  
              </tr>  
            
              <tr style={{height:20}} />        
              <tr style={{fontSize:13}}>
                <td>Lượng tiền thêm: </td>
                <td style={{width:10}}/>
                <td>
                 <CurrencyInput 
                    style={{height:35,width:'87%',marginRight:10,border:'1px solid #ccc',textAlign:'right',padding:5,borderRadius:5}}
                    value={this.state.m_value} 
                    onChangeEvent={this.handleChange} 
                    precision={0} 
                    thousandSeparator={"."} />
                </td> 
              </tr>  
                      
              <tr style={{height:20}} />
              
              <tr style={{marginBottom:10}}>
                <td><Button icon="plus" style={{height:35,marginRight:20}} onClick={this.onClick}>Thêm tiền</Button></td>
              </tr>
          </tbody>
        </table>        
      {content}
      </div>
    );
  }
}

AddBotMoney.propTypes = {

};

export default AddBotMoney;
