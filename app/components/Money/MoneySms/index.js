/**
*
* MoneySms
*
*/

import React from 'react';
// import styled from 'styled-components';

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
import Workbook from 'react-excel-workbook';
import { Link } from 'react-router/lib';

class MoneySms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {        
      visible: false,
      isMobile: false,
      activePage : 1,
    };
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
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
      if(element.moid == id){
      
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
  render() {
    var tableInput = false;
    var detailInput = false;
    var itemsPerPage = 10;
    var total_item = 0;
    var print = false;
    var total = 0;
    var total_mobile = 0;
    var page = false;
    if(this.props.dataInput && this.props.dataInput.length > 0){
      var item = false;
      var date = false;
      print = (
        <div  style={{marginTop: '2%',marginLeft:'0%'}}>
          <Workbook filename={"CT_NapKingSMS"+"_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={this.props.dataInput} name="Chi tiết NapKingSMS">
              <Workbook.Column label="Nickname" value="nickName"/>
              <Workbook.Column label="SĐT" value="sdt"/>
              <Workbook.Column label="short Code" value="shortcode"/>
              <Workbook.Column label="Chi tiết sms" value="telcocode"/>
              <Workbook.Column label="Lượng tiền nạp" value={r => this.props.formatCurency(r.amount)}/>
              <Workbook.Column label="Chi tiết trạng thái giao dịch" value="msg"/>          
              
              <Workbook.Column label="Thời gian giao dịch" value={r => this.convertDate(r.createTime)}/>
            </Workbook.Sheet>
          </Workbook> 
        </div>
      )
      total_item = this.props.dataInput.length;
      page =(
        <div style={{margin: '2% 0%'}}>
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
      if(!this.state.isMobile){
        item = this.props.dataInput.map((row,index)=>{
          total += parseInt(row.amount);
        
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index} onClick={(id)=>this.showDetail(row.seri)}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>+{row.sdt}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.shortcode}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.telcocode}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.contentReceive}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.amount)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.msg =="requeststatus=200"?"Success":"Error"}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.createTime)}</td>
              </tr>
            )
          }
         
        })
        tableInput=(
          <div>
          <i><h3 style={{marginLeft:'0%',marginTop:'1%'}}>Tổng tiền : {this.props.formatCurency(total)}</h3></i>
           <div style={{overflow:'auto'}}> 
            <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
            <tbody style={{width:'95%'}}>
              <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nickname</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>SĐT</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>short Code</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhà mạng</th>                
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết sms</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Lượng tiền nạp</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết giao dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian giao dịch</th>
                
              </tr>
              {item}
            </tbody>
            </table>  
          </div>
          {print}
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
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>SĐT</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>+{r.sdt}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>shortcode</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.shortcode}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhà mạng</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.telcocode}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết sms</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.contentReceive}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lượng tiền nạp</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.amount)}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết giao dịch</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.msg =="requeststatus=200"?"Success":"Error"}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày giao dịch</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{ this.convertDate(r.createTime)}</td>                  
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
              <tr key={index} onClick={(id)=>this.showDetail(row.moid)}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                  <td style={{height:40,width:'30%',border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>+{row.sdt}</td>
                  <td style={{height:40,width:'30%',border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.shortcode}</td>
                  <td style={{height:40,width:'30%',border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.telcocode}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.createTime)}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}><Icon type="plus-square-o"/></td>
              </tr>
            )
          }
          
        })
        tableInput=(
          <div>
          {detailInput}
          <i><h3 style={{marginLeft:'0%',marginTop:'1%'}}>Tổng tiền :{this.props.formatCurency(total_mobile)}</h3></i>
          <div style={{overflow:'auto'}}>
            <table style={{width:'98%',marginTop:'2%',marginLeft:'0%'}}>
            <tbody>
              <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nickname</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>SĐT</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>short Code</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhà mạng</th>                
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Ngày giao dịch</th>
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi Tiết</th>
              </tr>
              {item}
            </tbody>
            </table>  
          </div>
          {print}
          </div>
        )
      }
      
    }
    return (
      <div>
      {/* <center><h1 style={{marginLeft:'2%',marginTop:'1%'}}>Chi tiết nạp SMS</h1></center>
      <Link to={"/moneytotal"}><Button style={{marginLeft:'2%',marginTop:'1%'}} >Quay lại</Button></Link> */}
      {tableInput}
      {page}
      </div>
    );
  }
}

MoneySms.propTypes = {

};

export default MoneySms;
