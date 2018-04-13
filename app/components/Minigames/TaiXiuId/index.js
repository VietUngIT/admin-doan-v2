/**
*
* TaiXiuId
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
  Modal,
  Icon
} from 'antd';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
var st = false;
var et = false;
var g_name = "TaiXiu";
var detail = false;

class TaiXiuId extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,      
      visible: false,
      activePageTai : 1,
      activePageXiu : 1,
      
    };
  }
  onChange = (page) => {
    this.setState({
      activePageTai: page,
    });
  }
  onChangeX = (page) => {
    this.setState({
      activePageXiu: page,
    });
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }
  showDetail=(id)=>{
    this.setState({
      visible: true,
    });
    detail = this.props.data.data.filter((element)=>{
      if(element.updateTime == id){
          return element;
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    var tableTai=false;
    var tableXiu=false;
    var detailSlot = false;
    var total_item_tai = 0;
    var total_item_xiu = 0;
    var itemsPerPage = 15;
    var print = false;
    var sumBetTaiSide = false;
    var refundTaiValue = false;
    var sumBetXiuSide = false;
    var refundXiuValue = 0;
    var result =  false;
    var time =  false;
    var itemTai = false;
    var itemXiu = false;
    var data_tai = [];
    var data_xiu = [];
    var header =false;
    var detailT = false;
    var detailX = false;
    
    if(this.props.data){
      // console.log("txid",this.props.data )
      var item = false;
      sumBetTaiSide = this.props.data.sumBetTaiSide;
      refundTaiValue = this.props.data.refundTaiValue;
      sumBetXiuSide = this.props.data.sumBetXiuSide;
      refundXiuValue = this.props.data.refundXiuValue;
      time = this.props.data.time;
      header = (
        <div style={{marginLeft:'2%',marginTop: '2%'}}>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Thời gian : {this.props.convertTime(time)}</h3>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tổng tiền cược Tài : {this.props.formatCurency(sumBetTaiSide)}</h3>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tổng tiền cược Xỉu : {this.props.formatCurency(sumBetXiuSide)}</h3>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Trả thưởng Tài : {this.props.formatCurency(refundTaiValue)}</h3>
          <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Trả thưởng Xỉu: {this.props.formatCurency(refundXiuValue)}</h3>
        </div>  
      )
      
      if(this.props.data.data && this.props.data.data.length>0){
         this.props.data.data.map((row,index)=>{
          if(row.betSide=="Tai"){
            data_tai.push(row)
          }else{
            data_xiu.push(row)
          }
        })
          if(data_tai && data_tai.length >0){
            total_item_tai = data_tai.length; 
            if(!this.state.isMobile){
              itemTai = data_tai.map((row,index)=>{
                if(index >= (this.state.activePageTai-1) *itemsPerPage && index < (this.state.activePageTai) *itemsPerPage ){
                  return (
                    <tr key={index}>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.nickName}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>00:{row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prize)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.refund)}</td>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
                    </tr>
                  )
                }
              
            })
            tableTai=(
              <div style={{width:'100%'}}>
              <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
              <tbody>
                <tr >
                  <th colSpan={6} style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tài</th>
                </tr>
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian đặt</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đặt</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhận</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trả lại</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>                
                </tr>
                {itemTai}
                </tbody>
              </table>  
              <div style={{float: 'right',margin: '3% 5%'}}>
                <div style={{display: 'inline-block'}}>
                  <Pagination
                    style={{display: 'inline-block'}}
                    total={total_item_tai?total_item_tai:0}
                    pageSize={itemsPerPage}
                    defaultCurrent={1}
                    current={this.state.activePageTai}
                    onChange={this.onChange}
                  />
                  <div style={{display:total_item_tai?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                    {this.state.activePageTai}/{total_item_tai>0?(total_item_tai%itemsPerPage==0?total_item_tai/itemsPerPage:parseInt(total_item_tai/itemsPerPage)+1):0}
  
                  </div>
                </div>
              </div>
            </div>
            )
          } else{
            if(detail ){
              
              detail.map((r,index)=>{
               
                detailT = (
                  <div>
                    <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.nickName}</td>                  
                      </tr>
                    
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian đặt</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>00:{row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Đặt</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.betValue)}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhận</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.prize)}</td>                    
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Trả lại</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.refund)}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Kết quả</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.result}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian hoàn tiền</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.convertTime(r.updateTime)}</td>                  
                      </tr>
                      </tbody>
                    </table>  
                  </div>
                )
              })
             
            }
            itemTai = data_tai.map((row,index)=>{
              if(index >= (this.state.activePageTai-1) *itemsPerPage && index < (this.state.activePageTai) *itemsPerPage ){
                return (
                  <tr key={index} onClick={(updateTime)=>this.showDetail(row.updateTime)}>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.nickName}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>00:{row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
                  </tr>
                )
              }
            
          })
          tableTai=(
            <div style={{width:'100%'}}>
            <Modal
                title="Chi tiết"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" type="primary" onClick={this.handleCancel}>OK</Button>,
                  
                ]}
              >
                {detailT}
                
            </Modal>
            <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
            <tbody>
              <tr >
                <th colSpan={4} style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tài</th>
              </tr>
              <tr>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian đặt</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đặt</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>                
              </tr>
              {itemTai}
              </tbody>
            </table>  
            <div style={{float: 'right',margin: '3% 5%',width:'-webkit-fill-available'}}>
              <div style={{display: 'inline-block'}}>
                <Pagination
                  style={{display: 'inline-block'}}
                  total={total_item_tai?total_item_tai:0}
                  pageSize={itemsPerPage}
                  defaultCurrent={1}
                  current={this.state.activePageTai}
                  onChange={this.onChange}
                />
                <div style={{display:total_item_tai?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                  {this.state.activePageTai}/{total_item_tai>0?(total_item_tai%itemsPerPage==0?total_item_tai/itemsPerPage:parseInt(total_item_tai/itemsPerPage)+1):0}

                </div>
              </div>
            </div>
          </div>
          )
          }    
           
          
        }
        if(data_xiu && data_xiu.length >0){
          total_item_xiu = data_xiu.length;
          if(!this.state.isMobile){
            itemXiu = data_xiu.map((row,index)=>{
              
              if(index >= (this.state.activePageXiu-1) *itemsPerPage && index < (this.state.activePageXiu) *itemsPerPage ){
                return (
                  <tr key={index}>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.nickName}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>00:{row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prize)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.refund)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
                                
                  </tr>
                )
              }
                        
            })
            tableXiu=(
            <div style={{width:'100%'}}>
                        
              <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
                <tbody>
                  <tr >
                    <th colSpan={6} style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xỉu</th>
                  </tr>
                  <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian đặt</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đặt</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhận</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trả lại</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                  </tr>
                  {itemXiu}
                </tbody>
              </table>  
              <div style={{float: 'right',margin: '3% 5%'}}>
                <div style={{display: 'inline-block'}}>
                  <Pagination
                    style={{display: 'inline-block'}}
                    total={total_item_xiu?total_item_xiu:0}
                    pageSize={itemsPerPage}
                    defaultCurrent={1}
                    current={this.state.activePageXiu}
                    onChange={this.onChangeX}
                  />
                  <div style={{display:total_item_xiu?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                      {this.state.activePageXiu}/{total_item_xiu>0?(total_item_xiu%itemsPerPage==0?total_item_xiu/itemsPerPage:parseInt(total_item_xiu/itemsPerPage)+1):0}
                
                  </div>
                </div>
              </div>
            </div>
           )
          } else{
            if(detail ){
              
              detail.map((r,index)=>{
               
                detailX = (
                  <div>
                    <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.nickName}</td>                  
                      </tr>
                    
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian đặt</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>00:{row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Đặt</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.betValue)}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhận</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.prize)}</td>                    
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Trả lại</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.formatCurency(r.refund)}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Kết quả</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.result}</td>                  
                      </tr>
                      <tr>
                        <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian hoàn tiền</th>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.props.convertTime(r.updateTime)}</td>                  
                      </tr>
                      </tbody>
                    </table>  
                  </div>
                )
              })
             
            }

            itemXiu = data_xiu.map((row,index)=>{
              if(index >= (this.state.activePageXiu-1) *itemsPerPage && index < (this.state.activePageXiu) *itemsPerPage ){
                return (
                  <tr key={index} onClick={(updateTime)=>this.showDetail(row.updateTime)}>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.nickName}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>00:{row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
                  </tr>
                )
              }
            
          })

          tableXiu=(
            <div style={{width:'100%'}}>
            <Modal
                title="Chi tiết"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" type="primary" onClick={this.handleCancel}>OK</Button>,
                  
                ]}
              >
                {detailX}
                
            </Modal>
            <table style={{width:'95%',marginTop:'3%',marginLeft:'2%'}}>
            <tbody>
              <tr >
                <th colSpan={4} style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xỉu</th>
              </tr>
              <tr>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian đặt</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đặt</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>                
              </tr>
              {itemXiu}
              </tbody>
            </table>  
            <div style={{float: 'right',margin: '3% 5%',width:'-webkit-fill-available'}}>
              <div style={{display: 'inline-block'}}>
                <Pagination
                style={{display: 'inline-block'}}
                total={total_item_xiu?total_item_xiu:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePageXiu}
                onChange={this.onChangeX}
              />
              <div style={{display:total_item_xiu?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                  {this.state.activePageXiu}/{total_item_xiu>0?(total_item_xiu%itemsPerPage==0?total_item_xiu/itemsPerPage:parseInt(total_item_xiu/itemsPerPage)+1):0}
            
              </div>
              </div>
            </div>
          </div>
          )

          } 
        
        
      }
      print = (
        <div  style={{marginLeft:'2%',marginBottom:'2%',marginTop:'2%'}}>
         <Workbook filename={"Mini_Game_Tài_Xỉu_"+this.props.key_input+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={data_tai} name="Lịch sử Tài">
              <Workbook.Column label="Phiên game" value="referenceId"/>
              <Workbook.Column label="Nickname" value="nickName"/>
              <Workbook.Column label="Cửa đặt" value="betSide"/>
              <Workbook.Column label="Thời gian đặt" value={r=> "00:"+ row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}/>
              <Workbook.Column label="Đặt" value="betValue"/>             
              <Workbook.Column label="Nhận" value={r=>this.props.formatCurency(r.prize)}/>             
              <Workbook.Column label="Trả lại" value={r=>this.props.formatCurency(r.refund)}/>             
              <Workbook.Column label="Thời gian" value={r=>this.props.convertTime(r.updateTime)}/>             
              
            </Workbook.Sheet> 
            <Workbook.Sheet data={data_xiu} name="Lich sử Xỉu">
              <Workbook.Column label="Phiên game" value="referenceId"/>            
              <Workbook.Column label="Nickname" value="nickName"/>
              <Workbook.Column label="Cửa đặt" value="betSide"/>
              <Workbook.Column label="Thời gian đặt" value={r=> "00:"+ row.betTimeSecond>9?row.betTimeSecond:"0"+row.betTimeSecond}/>
              <Workbook.Column label="Đặt" value="betValue"/>             
              <Workbook.Column label="Nhận" value={r=>this.props.formatCurency(r.prize)}/>             
              <Workbook.Column label="Trả lại" value={r=>this.props.formatCurency(r.refund)}/>             
              <Workbook.Column label="Thời gian" value={r=>this.props.convertTime(r.updateTime)}/>             
              
            </Workbook.Sheet> 
          </Workbook> 
        </div>
      )
      }
    }
    return (
      <div>
        {header}
        <div style={{display:this.state.isMobile?'':'-webkit-inline-box',width:this.state.isMobile?'100%':'50%'}}>
          {tableTai}
          {tableXiu}
        </div>
        {print}
        
      </div>
    );
  }
}

TaiXiuId.propTypes = {

};

export default TaiXiuId;
