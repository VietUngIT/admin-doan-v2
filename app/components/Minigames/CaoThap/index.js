/**
*
* CaoThap
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
import Workbook from 'react-excel-workbook';
var detail = false;
class CaoThap extends React.Component { 
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
    var cd = false;
    var ID = false;
    var SO = false;
    var CHAT = false;
    var item = false;
    var name = false;
    var chat = false;
    if(this.props.data && (this.props.data.length > 0 || this.props.data.size > 0)){
      print = (
        <div  style={{marginTop: '2%',marginLeft:'5%'}}>
          <Workbook filename={"Mini_Game_Cao_Thấp_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
            <Workbook.Sheet data={this.props.data} name="Lịch sử mini game : Cao Thấp">
              <Workbook.Column label="Phiên chơi" value="id"/>
              <Workbook.Column label="Card" value="card"/>
              <Workbook.Column label="Choose" value="choose"/>             
              <Workbook.Column label="Bet Value" value={r=>this.props.formatCurency(r.betValue)}/>             
              <Workbook.Column label="Prize" value={r=>this.props.formatCurency(r.prize)}/>             
              <Workbook.Column label="Step" value="step"/>             
              <Workbook.Column label="Thời gian" value={r=>this.props.convertTime(r.updateTime)}/>             
              
            </Workbook.Sheet> 
            
          </Workbook> 
        </div>
      )
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
      if(!this.state.isMobile || this.state.isMobile){
        item = this.props.data.map((row,index)=>{
          switch(row.choose){
            case "0" :{
              cd = "Thấp"
              break;
            }
            case "1" :{
              cd = "Cao"
              break;
            }
            case "START" :{
              cd = "Bắt đầu"
              break;
            }
          }
          if(row.card >=0 && row.card < 52){
            ID = row.card;
            SO = parseInt(ID/4) +2;
            CHAT =parseInt(ID % 4);
            switch(CHAT){
              case 0:{
                chat = "bích"
                break;
              }
              case 1:{
                chat = "chuồn"
                break;
              }
              case 2:{
                chat = "rô"
                break;
              }
              case 3:{
                chat = "cơ"
                break;
              }
            }
            if(SO < 11){
              name = SO.toString() +" "+ chat;              
            }else{
              switch(SO){
                case 11:{
                  name = "J "+ chat;     
                  break;
                }
                case 12:{
                  name = "Q "+ chat;     
                  break;
                }
                case 13:{
                  name = "K "+ chat;     
                  break;
                }
                case 14:{
                  name = "A "+ chat;     
                  break;
                }
              }
            }
          }

          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return (
              <tr key={index}>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.id}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{name}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{cd}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prize)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.step}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.convertTime(row.updateTime)}</td>
              </tr>
            )
          }
          
        })
        table=(
          <div style={{overflow:'auto'}}>
            <table style={{width:'90%',marginTop:'3%',marginLeft:'5%'}}>
            <tbody>
              <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên game</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Kết quả</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Cửa đặt</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Mức cược</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhận</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Bước</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
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
                <table style={{width: '100%',}}>
                <tbody>
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Phiên chơi</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{r.id}</td>
                  </tr>  
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{this.props.convertTime(r.updateTime)}</td>               
                  </tr>  
                    
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>card</th> 
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{r.card}</td>                    
                  </tr>  
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>choose</th> 
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{r.choose}</td>                  
                  </tr>  
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Đặt</th> 
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{this.props.formatCurency(r.betValue)}</td>                  
                  </tr>  
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>step</th> 
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{r.step}</td>                  
                  </tr>  
                  <tr style={{width:'100%'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>prize</th> 
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5, flex: 1}}>{this.props.formatCurency(r.prize)}</td>                  
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
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.id}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.card}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.choose}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.betValue)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.props.formatCurency(row.prize)}</td>
                <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.step}</td>
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
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Card</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Choose</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đặt</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nhận</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>step</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
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

CaoThap.propTypes = {

};

export default CaoThap;
