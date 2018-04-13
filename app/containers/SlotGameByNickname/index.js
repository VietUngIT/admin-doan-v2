/*
 *
 * SlotGameByNickname
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSlotGameById from './selectors';
import messages from './messages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Modal,
  TimePicker,
  Select,
} from 'antd';
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
import {
  search_slot_game_by_nn,
} from './actions';
import {
  selectData,
  selectisLoad,
}from './selectors';
import {withRouter} from 'react-router' ;
import Workbook from 'react-excel-workbook';
var st = false;
var et = false;
var detail = false;
const format = 'HH:mm';
const Option = Select.Option;

export class SlotGameByNickname extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),      
      todateMoney : moment(),     
      gid : 1,
      isMobile: false,
      un : "",
      nickname : false,

      visible: false,
      detail : false,
      width: 0,
      activePage :1,
      fromTime : "",
      toTime : "",
    };
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onChangeToDate = this.onChangeToDate.bind(this);
 
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
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
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });
     
  }
  onChangeToDate=(date)=>{
    this.setState({
      todateMoney: date,
    });
     
  }
  onSelect=(value)=>{
    this.setState({nickname : value})
  }
  onChangeInput=(k)=>{
    this.setState({
      un: k.target.value.trim(),
    });
  }
  onChangGn = (e)=>{
    var g_name = (e.target.value);
   
    this.setState({
      gid: g_name,
    });
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  onClick=()=>{
    var _date = false;
    var _todate = false;
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""&&
    this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!==""){
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromTime;
     if(this.state.toTime){
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
      
     }else{
      _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
     }
     st = this.refs.fromDate.input.props.value.toString().trim();
     et = this.refs.toDate.input.props.value.toString().trim();
    }else{
      _todate = false;
      _date = false;
        message.error('Ngày chưa được chọn !');
    }
    if(_date &&_todate && this.state.gid && this.state.un){
      var someDate = new Date(_date).getTime();
      var toDate = new Date(_todate).getTime();
      
      this.props.search_slot_game_by_nn(someDate,toDate,this.state.un,this.state.gid);
      this.setState({activePage:1})
    
    }else{
      message.error('Nhập đầy đủ thông tin !');
    }
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
   this.setState({detail:detail})

  }
  printPrzeDetail=(r)=>{
    var kq= "";
    
    if(r.gameName!=="minipoker"){
      if(r.prizeDetail.split("|").length >= 2){
        if(r.prizeDetail.split("|")[1].split(":")[1]){
          kq = r.prizeDetail.split("|")[1].split(":")[1];
         }else{
          kq= "";
         }
      }
    }else{
      kq =  r.prizeDetail;
    }
   
    
    return kq;
  }
  handleChange = (value) => {
    this.setState({ un : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }

  render() {
    var table=false;
    var detailSlot = false;
    var total_item = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;
    if(this.props.suggest_data){
    
      var options_suggest = false;     
        options_suggest = this.props.suggest_data.map((r,index)=>{    
          return(          
               <Option 
                 key={r} 
                 value={r}                  
                 style={{background:''}}
               >
                 {r} 
               </Option>              
             )        
          })
     
       
    }
    var manager = (
      <Select
        mode="combobox"
        value={this.state.un}
        placeholder="Nhập nickname"
        style={{width:120,height:'35px !important'}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange }
        onSelect={this.onSelect}
        refs="selectSuggest"
      >
        {options_suggest}
      </Select>
     )
    if(this.props.load){
      table=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center> 
      )
    }else{
      if(this.props.data && this.props.data.length >0){
        var item = false;
        var item2 = false;
        var detail_prize = false;

        print = (
          <div  style={{marginTop: '2%',marginLeft:'5%'}}>
            <Workbook filename={"Slot_Game_"+st+"_"+et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
              <Workbook.Sheet data={this.props.data} name="Lịch sử Slot Game">
                <Workbook.Column label="Phiên chơi" value="id"/>
                <Workbook.Column label="Thời gian" value="updateTime"/>
                <Workbook.Column label="Miễn phí" value="isFree"/>             
                <Workbook.Column label="Mức cược" value={r=>this.formatCurency(r.betValue)}/>             
                <Workbook.Column label="Số dòng cược" value="lineBetCount"/>             
                <Workbook.Column label="Chi tiết dòng cược" value="lineString"/>             
                <Workbook.Column label="Số dòng thắng" value="lineWinCount"/>             
                <Workbook.Column label="Tiền thưởng" value={r=>this.formatCurency(r.prize)}/>             
                <Workbook.Column label="Chi tiết thưởng" value={r=>this.printPrzeDetail(r)}/>             
                <Workbook.Column label="Tổng tiền cược" value={r=>this.formatCurency(r.totalBet)}/>             
                <Workbook.Column label="Tổng tiền hiện tại" value={r=>this.formatCurency(r.totalMoney)}/>            
                
              </Workbook.Sheet> 
              
            </Workbook> 
          </div>
        )
        total_item = this.props.data.length;
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
        if(!this.state.isMobile){
          item = this.props.data.map((row,index)=>{
            var free = false;
            var prizeDetail_content = false;
            var minigame_content = false;
            var linewin_content = false;
            if(row.gameName !=="minipoker"){
              if(row.prizeDetail.split("|") >=3){
                if(row.prizeDetail.split("|")[2].split(":")[1]){
                  minigame_content =(
                    <tr>
                      <td>Mini Game: {row.prizeDetail.split("|")[2].split(":")[1]}</td>
                      <td></td>
                    </tr>
                  )  
                }
              }else{
                if(row.prizeDetail.split("|")[1].split(":")[1]){
                  linewin_content =(
                    <tr>
                      <td><span>Dòng thắng: {row.prizeDetail.split("|")[1].split(":")[1]}</span> </td>
                      <td><span></span></td>
                    </tr>
                  )  
                }
              }

              prizeDetail_content = (
                <table>
                    {linewin_content}
                    {minigame_content}
                    
                </table>  
              )
            }else{
              prizeDetail_content=(
                <div style={{paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>{row.prizeDetail}</span></div>
              )
            }
           
           
            if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
              if(row.isFree === "Yes"){
                free=(<img src={require("images/Tick.png")} style={{width:20,height:20}}/>)
              }
              return(
                <tr key={index}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.id}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.updateTime}</td>                
                  {/* <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{free}</td> */}
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.betValue)}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.lineBetCount}</td>
                  {/* <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.lineString}</td> */}
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.lineWinCount}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.prize)}</td>
                  {/* <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{prizeDetail_content}</td> */}
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalBet)}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalMoney)}</td>
                  {/* <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.pot)}</td> */}
                </tr>  
              )
            }
              
          })
          table = (
            <table style={{marginLeft:'2%',marginTop:'2%',width:'90%'}}>
              <tbody>
                <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                  {/* <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Miễn phí</th>              */}
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Mức cược</th> 
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số dòng cược</th> 
                  {/* <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết dòng cược</th>  */}
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số dòng thắng</th> 
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền thưởng</th> 
                  {/* <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chi tiết thưởng</th>  */}
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền cược</th> 
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền hiện có</th> 
                  {/* <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>GT hũ</th>  */}
                </tr>  
                {item}
              </tbody>  
            </table>  
          )
        }else{
          var detail_slot = false;
          
          if(detail ){
            
            detail.map((r,index)=>{
              var isfree = false;
              var prizeDetail_content_mobile = false;
              var minigame_content_mobile = false;
              var linewin_content_mobile = false;
              if(r.gameName !=="minipoker"){
                if(r.prizeDetail.split("|").length >=3){
                  if(r.prizeDetail.split("|")[2].split(":")[1]){
                    minigame_content_mobile =(
                      
                      <div style={{width:'80%'}}>
                      <div style={{paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Mini Game:</span></div>
                      <div style={{ width: '70%',minWidth: '70%',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.prizeDetail.split("|")[2].split(":")[1]}</span></div>
                    </div>
                    )  
                  }
                }else{
                  if(r.prizeDetail.split("|")[1].split(":")[1]){
                    linewin_content_mobile =(
                     
                      <div >
                      <div style={{paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Chi tiết dòng thắng:</span></div>
                      <div style={{display:'inline-block', width: '50%',minWidth: '50%',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.prizeDetail.split("|")[1].split(":")[1]}</span></div>
                    </div>
                    )  
                  }
                }
                
                
                prizeDetail_content_mobile = (
                  <table>
                    {minigame_content_mobile}   
                    {linewin_content_mobile}                 
                  </table>  
                )
              }else{
                prizeDetail_content_mobile=(
                  <div style={{paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.prizeDetail}</span></div>
                )
              }
            
              if(r.isFree === "Yes"){
                isfree=(<img src={require("images/Tick.png")} style={{width:20,height:20}}/>)
              }
              detail_slot = (
                <div>
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Phiên chơi</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.id}</span></div>
                  </div>
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Thời gian</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.updateTime}</span></div>
                  </div>
                  {/* <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Miễn phí</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{isfree}</span></div>
                  </div> */}
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Mức cược</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{this.formatCurency(r.betValue)}</span></div>
                  </div>
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Số dòng cược</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.lineBetCount}</span></div>
                  </div>
                  {/* <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Chi tiết dòng cược</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.lineString}</span></div>
                  </div> */}
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Số dòng thắng</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{r.lineWinCount}</span></div>
                  </div>
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Tiền thưởng</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{this.formatCurency(r.prize)}</span></div>
                  </div>
                  {/* <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Chi tiết thưởng</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{prizeDetail_content_mobile}</span></div>
                  </div> */}
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Tổng tiền cược</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{this.formatCurency(r.totalBet)}</span></div>
                  </div>
                  <div style={{border: 'gray solid 1px'}}>
                    <div style={{display: 'inline-block', width: '30%',paddingLeft: '5px',paddingRight: '5px'}}><span style={{overflowWrap: "break-word"}}>Tổng tiền hiện tại</span></div>
                    <div style={{display: 'inline-block', width: '70%',minWidth: '70%', borderLeft: 'gray solid 1px',padding: '5px'}}><span style={{overflowWrap: "break-word"}}>{this.formatCurency(r.totalMoney)}</span></div>
                  </div>
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
            var free = false;
            if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
              if(row.isFree === "Yes"){
                free=(<img src={require("images/Tick.png")} style={{width:20,height:20}}/>)
              }
                return(
                  <tr key={index} onClick={(id)=>this.showDetail(row.id)}>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.id}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.updateTime}</td>                
                    {/* <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{free}</td> */}
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.lineWinCount}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.prize)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalBet)}</td>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(row.totalMoney)}</td>
                  </tr>  
                )
            }
            
          })
          table = (
            <div>
              {detailSlot}
            <table style={{marginLeft:'2%',marginTop:'2%',width:'95%'}}>
              <tbody>
                <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Phiên chơi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Thời gian</th>
                  {/* <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Miễn phí</th>              */}
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số dòng thắng</th> 
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tiền thưởng</th> 
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền cược</th> 
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền hiện có</th> 
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
    }
    
    return (
      <div style={{width:'100%',height:'100%'}}>
        <h3 style={{marginLeft:'3%',marginTop:'1%'}}>Tra cứu lịch sử Slot game</h3>
          <table style={{marginLeft:'5%',marginTop:'1%'}}>
          <tbody>
            <tr>
              <td>Ngày bắt đầu
              </td>
                
              <td>Giờ bắt đầu
              </td>  
            </tr>  
            <tr>
              <td>
                <DatePicker
                  style={{color:'red', }}
                  ref="fromDate"
                  selected={this.state.dateMoney}
                  onChange={this.onChangeDate}
                  customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày bắt đầu"
                  withPortal
                  maxDate={moment()}
                />
              </td>
              <td>
                <TimePicker 
                    defaultValue={moment('00:00', format)} 
                    format={format} 
                    placeholder="Nhập giờ"
                    style={{height:35,width:120}}
                    onChange={this.changeTime}
                />
              </td>  
            </tr>
            <tr style={{height:10}}>
              <td colSpan={2}/>
            </tr>
            <tr>
              <td>Ngày kết thúc
              </td>
                
              <td>Giờ kết thúc
              </td>  
            </tr>  
            <tr>    
              <td>
                <DatePicker
                  ref="toDate"
                  selected={this.state.todateMoney}
                  onChange={this.onChangeToDate}
                  customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày kết thúc"
                  withPortal
                  maxDate={moment()}
                />
              </td>
              <td>
                <TimePicker  style={{height:35,width:120}} defaultValue={moment('23:59', format)} format={format} placeholder="Nhập giờ"  onChange={this.changeToTime}/>
              </td>
            </tr>
            <tr style={{height:10}}>
              <td colSpan={2}/>
            </tr>
            <tr>
              <td>
              {/* <Input placeholder="Nhậ­p Username" style={{height:35,width:120}} 
                ref="Input"
                onChange={this.onChangeInput}/> */}
                {manager}
              </td>
              <td>
              <select id="gn" onChange={(e)=>this.onChangGn(e)}
                    value={this.state.gn}
                    style={{marginLeft:'2%',height:'35px',width:120,border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
                    <option value={1}>Mini poker</option>
                    <option value={2}>Quán ăn</option>
                    <option value={3}>Lương sơn bạc</option>
                    <option value={4}>Cổ mộ</option>
                    <option value={5}>Cao bồi</option>
                   
                </select>
              </td>
              <td style={{width:10}}/>  
              <td>
                <Button icon="search" style={{height:35,width:35}} onClick={this.onClick}/>

              </td>
            </tr>  
            <tr style={{height:10,borderBottom:'1px dashed #e2e2e2'}}>
              <td colSpan={3}/>
            </tr>  
            </tbody>
          </table>           
         
          <div style={{height:'100%'}} >
            {table}
            {print}
          {page}
          </div>
          
        </div> 
    );
  }
}

SlotGameByNickname.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  load : selectisLoad(),
  suggest_data : selectSuggestData(),

});

function mapDispatchToProps(dispatch) {
  return {
    search_slot_game_by_nn:(st,et,un,gid)=>dispatch(search_slot_game_by_nn(st,et,un,gid)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SlotGameByNickname));
