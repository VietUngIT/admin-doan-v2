/**
*
* TaiXiu
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
  Modal,
} from 'antd';
var detail = false;
var nick = false;
import Workbook from 'react-excel-workbook';

class TaiXiu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,      
      visible: false,
      activePage : 1,
      
    };
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  showDetail=(id)=>{
    this.setState({
      visible: true,
    });
    detail = this.props.data.filter((element)=>{
      if(element.id == id){
          return element;
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }
  
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    var table=false;
    var detailSlot = false;
    var total_item = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;
    if(this.props.data && (this.props.data.length > 0 || this.props.data.size > 0)){
      var item = false;
      total_item = this.props.data.length;
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
      print = (
        <div  style={{marginTop: '2%',marginLeft:'5%'}}>
          <Workbook filename={"Mini_Game_Tài_Xỉu_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={this.props.data} name="Lịch sử mini game : Tài Xỉu">
              <Workbook.Column label="Phiên chơi" value="referenceId"/>
              <Workbook.Column label="Cửa đặt" value="betSide"/>
              <Workbook.Column label="Thời gian đặt" value={r=> "00:"+r.betTimeSecond}/>
              <Workbook.Column label="Đặt" value="betValue"/>             
              <Workbook.Column label="Nhận" value={r=>this.props.formatCurency(r.prize)}/>             
              <Workbook.Column label="Trả lại" value="refund"/>             
              <Workbook.Column label="Kết quả" value="result"/>             
              <Workbook.Column label="Thời gian trả thưởng" value={r=>this.props.convertTime(r.updateTime)}/>             
              
            </Workbook.Sheet> 
            
          </Workbook> 
        </div>
      )
      if(!this.state.isMobile){
        item = this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.referenceId}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.betSide}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>00:{row.betTimeSecond}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prize)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.refund)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.result}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
              </tr>
            )
          }
         
        })
        table=(
          <table style={{width:'90%',marginTop:'3%',marginLeft:'5%'}}>
          <tbody>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên game</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Cửa đặt</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian đặt</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đặt</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhận</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trả lại</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Kết quả</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian trả thưởng</th>
            </tr>
            {item}
            </tbody>
          </table>  
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
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Phiên game</th>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.referenceId}</td>                  
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Cửa đặt</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{r.betSide}</td>                    
                  </tr>
                  <tr>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian đặt</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>00:{r.betTimeSecond}</td>                  
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
        item = this.props.data.map((row,index)=>{
          detailSlot = (
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
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.referenceId}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prize)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.refund)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.result}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
              </tr>
            )
          }
          
        })
        table=(
          <div>
          {detailSlot}
          <table style={{width:'90%',marginTop:'3%',marginLeft:'5%'}}>
          <tbody>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên game</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhận</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trả lại</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Kết quả</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian trả thưởng</th>
            </tr>
            {item}
          </tbody>
          </table>  
          </div>
        )
      }
    }else{
      table=(<h3 style={{marginLeft:'5%',marginTop:'5%'}}>Không có dữ liệu</h3>)
    }
    return (
      <div>
        {table}
        {print}
        {page}
      </div>
    );
  }
}

TaiXiu.propTypes = {

};

export default TaiXiu;
