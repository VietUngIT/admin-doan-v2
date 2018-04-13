/**
*
* MoneyBanking
*
*/

import React from 'react';
// import styled from 'styled-components';
import Workbook from 'react-excel-workbook';

import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
  Icon,
} from 'antd';
var detail = false;
class MoneyBanking extends React.Component { 
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
    this.setState({
      visible: true,
    });
    detail = this.props.dataInput.filter((element)=>{
      if(element.id == id){
      
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
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
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
    var total = 0;
    var page = false;
    var total_mobile = 0;
    if(this.props.dataInput && this.props.dataInput.length > 0){
      print = (
        <div  style={{marginTop: '2%',marginLeft:'0%'}}>
          <Workbook filename={"CT_BankCharging"+"_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={this.props.dataInput} name="Chi tiết BankCharging">
              <Workbook.Column label="Nickname" value="nickName"/>
              <Workbook.Column label="Lượng tiền trừ" value={r => this.props.formatCurency(r.amount)}/>
              <Workbook.Column label="Lượng tiền cộng" value={r => this.props.formatCurency(r.moneyAdd)}/>
              <Workbook.Column label="Lượng tiền hiện tại" value={row => this.props.formatCurency(row.currentMoney )}/>
              <Workbook.Column label="Mã lỗi" value="status"/>
              <Workbook.Column label="Thời gian giao dịch" value={r => this.convertDate(r.createDate)}/>
            </Workbook.Sheet>
          </Workbook> 
        </div>
      )
      total_item = this.props.dataInput.length;
      page =(
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
          total += parseInt(row.amount);
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index} onClick={(id)=>this.showDetail(row.seri)}>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.amount)}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.moneyAdd)}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.currentMoney )}</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.status  }</td>
                   <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.createDate  }</td>
              </tr>
            )
          }
          
        })
        tableInput=(
          <div>
          <i><h3 style={{marginLeft:'0%',marginTop:'1%'}}>Tổng tiền đã nạp : {this.props.formatCurency(total)}</h3></i>
          <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
          <tbody style={{width:'95%'}}>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nickname</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Lượng tiền trừ</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Lượng tiền cộng</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Lượng tiền hiện tại</th>                
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Mã lỗi</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Ngày giao dịch</th>
            </tr>
            {item}
          </tbody>
          </table>  
          </div>
        )
        
      }else{
        var detail_slot = false;
      
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
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lượng tiền trừ trong thẻ</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.amount)}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lượng tiền được cộng</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.moneyAdd)}</td>                  
                  </tr>                
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lượng tiền hiện tại</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.currentMoney )}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mã lỗi</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.status}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày giao dịch</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.createDate}</td>                  
                  </tr>
                  </tbody>
                </table>  
              </div>
            )
          })
         
        }
        item = this.props.dataInput.map((row,index)=>{
          total_mobile += parseInt(row.amount);
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
              <tr key={index} onClick={(id)=>this.showDetail(row.id)}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.createDate}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.currentMoney )}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.status  }</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}><Icon type="plus-square-o"/></td>
              </tr>
            )
          }
          
         
        })
        tableInput=(
          <div>
          {detailInput}
          <i><h3 style={{marginLeft:'0%',marginTop:'1%'}}>Tổng tiền đã nạp : {this.props.formatCurency(total_mobile)}</h3></i>          
          <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
          <tbody style={{width:'95%'}}>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nickname</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Ngày giao dịch</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Lượng tiền hiện tại</th>                
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Mã lỗi</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>    

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

MoneyBanking.propTypes = {

};

export default MoneyBanking;
