/**
*
* MoneyCard
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
  Icon,
} from 'antd';
var detail = false;
class MoneyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {        
      visible: false,
      isMobile: false,
      activePage : 1,
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
      if(element.updateTime == id){
      
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
    var total = 0;
    var itemsPerPage = 10;
    var total_item = 0;
    var print = false;
    var data_print = [];
    var ncc_print = false;
    var page_content = false;
    if(this.props.dataInput && (this.props.dataInput.length > 0 || this.props.dataInput.size > 0)){
      
      var date = false;
      var item = false;
      var ncc = false;
      var header_ncc = false;
      var header_table = false;
      this.props.dataInput.map((row,index)=>{
        if(index==0){
          ncc_print = row;
          
         if(row.length >0){
           header_ncc=(
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhà mạng</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng thẻ nạp</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền đã nạp</th>
            </tr>
           )
           ncc = row.map((r,i)=>{
            total +=parseInt(r.exchangeMoney);
            return(
             <tr key={i}>
               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.manhacungcap}</td>
               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.count}</td>                    
               <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(r.exchangeMoney)}</td>                  
              
             </tr>
            )
             
           })
         }
         
        }else{
          
            data_print = data_print.concat(row);
            
          
        }
      })
      total_item = data_print.length;
      
      if(data_print.length>0  ||ncc_print.length>0 ){
        print = (
          <div  style={{marginTop: '2%',marginLeft:'0%'}}>
            <Workbook filename={"CT_NapThe"+"_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
              <Workbook.Sheet data={data_print} name="Chi tiết nạp thẻ">
                <Workbook.Column label="Nickname" value="nickName"/>
                <Workbook.Column label="Seri" value="seri"/>
                <Workbook.Column label="Mã thẻ" value="mathe"/>
                <Workbook.Column label="Nhà cung cấp" value="manhacungcap"/>
                <Workbook.Column label="Lượng tiền được cộng" value={r => this.props.formatCurency(r.exchangeMoney)}/>              
                <Workbook.Column label="Thời gian giao dịch" value={r => this.convertDate(r.updateTime)}/>
              </Workbook.Sheet> 
              <Workbook.Sheet data={ncc_print} name="Thống kê nhà mạng">
                <Workbook.Column label="Nhà mạng" value="manhacungcap"/>
                <Workbook.Column label="Số lượng thẻ nạp" value="count"/>
                <Workbook.Column label="Tổng tiền đã nạp" value={r=>this.props.formatCurency(r.exchangeMoney)}/>              
              </Workbook.Sheet>
            </Workbook> 
          </div>
        )
        page_content=(
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
      }
     
     
      if(!this.state.isMobile){       
        
        item = this.props.dataInput.map((row,index)=>{  
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            if(index>=1){

              header_table = (
                <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Seri</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Mã thẻ</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Nhà mạng</th>                
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Nhà cung cấp </th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Lượng tiền được cộng</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Mã lỗi</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'left',padding:5}}>Trạng thái giao dịch</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:14,textAlign:'center'}}>Ngày giao dịch</th>
                </tr>
              )
             
              return (
                <tr key={index} onClick={(id)=>this.showDetail(row.seri)}>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.seri}</td>                    
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.mathe}</td>                  
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.manhacungcap}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.providerCard}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.exchangeMoney)}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.code_response}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.msg_response}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.updateTime)}</td>
                </tr>
              )
            }
          }        
          
        })
          
        tableInput=(
          <div>
          <h3 style={{width:'100%',marginTop:'1%',marginLeft:'0%'}}><i>Tổng tiền : {this.props.formatCurency(total)}</i></h3>

          <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
            <tbody style={{width:'95%'}}>
              {header_ncc}
              {ncc}
            </tbody>
          </table>  

          <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
            <tbody style={{width:'95%'}}>
              {header_table}
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
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Seri</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.seri}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mã thẻ</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.mathe}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhà cung cấp</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.manhacungcap}</td>                  
                  </tr>                  
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Lượng tiền được cộng</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.exchangeMoney)}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian giao dịch</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(r.updateTime)}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Trạng thái giao dịch</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.msg_response}</td>                  
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
            if(index>=1){
              header_table=(
                <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nickname</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhà cung cấp</th>                
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Lượng tiền được cộng</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Ngày giao dịch</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>    

                </tr>
              )
              return (
                <tr key={index} onClick={(id)=>this.showDetail(row.updateTime)}>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.nickName}</td>
                     <td style={{height:40,width:'30%',border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.manhacungcap}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.exchangeMoney)}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.updateTime)}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}><Icon type="plus-square-o"/></td>
                </tr>
              )
            }
          }
          
         
        })
        tableInput=(
          <div>
          {detailInput}
          <h3 style={{width:'100%',marginTop:'1%',marginLeft:'0%'}}><i>Tổng tiền : {this.props.formatCurency(total)}</i></h3>
         
          <table style={{width:'95%',marginTop:'2%',marginLeft:'0%'}}>
            <tbody style={{width:'95%'}}>
              {header_ncc}
              {ncc}
            </tbody>
          </table>  

          <table style={{width:'95%',marginTop:'3%',marginLeft:'0%'}}>
            <tbody style={{width:'95%'}}>
              {header_table}
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
        {page_content}
    
      </div>
    );
  }
}

MoneyCard.propTypes = {

};

export default MoneyCard;
