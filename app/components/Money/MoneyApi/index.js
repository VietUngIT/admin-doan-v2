/**
*
* MoneyApi
*
*/

import React from 'react';
// import styled from 'styled-components';
import Workbook from 'react-excel-workbook';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon
} from 'antd';
var detail = false;
class MoneyApi extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {        
      visible: false,
      isMobile: false,
      activePage:1,
      
    };
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({
       isMobile: true,
       width: window.innerWidth,
     });
    } else {
     this.setState({
       isMobile: false,
     });
    }
  }
 
  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
 
  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  showDetail=(id)=>{
    console.log("detail")
    this.setState({
      visible: true,
    });
    detail = this.props.dataInput.filter((element)=>{
      if(element.orderId == id){
      
          return element;
      }
    })

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
    result = date+" "+time ;
    return result;
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  render() {
    var tableInput = false;
    var detailInput = false;
    var itemsPerPage = 10;
    var total_item = 0;
    var print = false;
    var page  = false;
    var detail_slot = false;
    if(this.props.dataInput && this.props.dataInput.length > 0){
      print = (
        <div  style={{marginTop: '2%',marginLeft:'0%'}}>
          <Workbook filename={"CT_IAP"+"_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={this.props.dataInput} name="Chi tiết IAP">
              <Workbook.Column label="Nickname" value="nickName"/>
              <Workbook.Column label="Order ID" value="orderId"/>
              <Workbook.Column label="Product ID" value="productId"/>
              <Workbook.Column label="Loại" value="iapType"/>
              <Workbook.Column label="Thời gian giao dịch" value={r => this.convertDate(r.purchaseTime)}/>
            </Workbook.Sheet>
          </Workbook> 
        </div>
      )
      total_item = this.props.dataInput.length;
      page  = (
        <div style={{margin: '2% 5%'}}>
          <div style={{display: 'inline-block'}}>
            <Pagination
              style={{display: 'inline-block'}}
              total={total_item?total_item:0}
              pageSize={itemsPerPage}
              defaultCurrent={1}
              current={this.state.activePage}
              onChange={this.onChange}
            />
            <div style={{display:total_item?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
              {this.state.activePage}/{total_item>0?(total_item%itemsPerPage==0?total_item/itemsPerPage:parseInt(total_item/itemsPerPage)+1):0}

            </div>
          </div>
      </div>
      )
      var item = false;
      var date = false;
      if(!this.state.isMobile){
        item = this.props.dataInput.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index} onClick={(id)=>this.showDetail(row.seri)}>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.orderId}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.productId}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.iapType}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.purchaseTime)}</td>
              </tr>
            )
          }
          
        })
        tableInput=(
          <div>
          <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
          <tbody style={{width:'95%'}}>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Order ID</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Product ID</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Loại</th>                
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Thời gian giao dịch</th>    
            </tr>
            {item}
          </tbody>
          </table>  
          </div>
        )
        
      }else{
        
      
        if(detail ){
      
          detail.map((r,index)=>{
           
            detail_slot = (
              <div>
                <table style={{width: '100%'}}>
                <tbody>
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.nickName}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Order ID</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.orderId}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Product ID</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.productId}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Loại</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.iapType}</td>                  
                  </tr>                 
                  
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian giao dịch</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(r.purchaseTime)}</td>                  
                  </tr>
                  
                  </tbody>
                </table>  
              </div>
            )
          })
         
        }
        item = this.props.dataInput.map((row,index)=>{
          detailInput = (
            <Modal
                title="Chi tiết"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" type="primary" onClick={this.handleCancel}>OK</Button>,
                  
                ]}
              >
                {detail_slot}
                
            </Modal>
          )
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index} onClick={(id)=>this.showDetail(row.orderId)}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                  <td style={{height:40,width:'30%',border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.orderId}</td>
                  <td style={{height:40,width:'30%',border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.iapType}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.purchaseTime)}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}><Icon type="plus-square-o" /></td>
              </tr>
            )
          }            
         
        })
        tableInput=(
          <div>
          {detailInput}
          <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
          <tbody style={{width:'95%'}}>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Order ID</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Loại</th>                
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Thời gian giao dịch</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Chi Tiết</th>
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
        {tableInput}
        {print}
        {page}
      </div>
    );
  }
}

MoneyApi.propTypes = {

};

export default MoneyApi;
