/**
*
* Daunow
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
  Modal,
  TimePicker,
  Icon,
} from 'antd';
const format = 'HH:mm:ss';
import moment from 'moment';
import ItemDpu from 'components/ItemDpu';
import ItemDau from 'components/ItemDau';
import {Bar,Line,Pie} from 'react-chartjs-2';
import { Link,browserHistory } from 'react-router';
import 'chartjs-plugin-datalabels';

class Daunow extends React.Component { 
  
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1, 
      isMobile : false,

      activePageDAU :1, 
      fromTime : "",
      toTime : "",
      dateMoney : moment().add(-1, 'days'),      
      todateMoney :moment().add(-1, 'days'), 
      visible : false,
      showDAU : false,
      chartDAU : false,

      sort_user : "asc",
      isSortUser : false,

      sort_nick : "asc",
      isSortNick : false,

      sort_hdh : "asc",
      isSortHDH : false,

      sort_ip : "asc",
      isSortIP : false,

      sort_active : "asc",
      isSortActive : false,

      sort_sdt : "asc",
      isSortSDT : false,

      sort_time : "asc",
      isSortTime : false,
    }
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onChangeToDate = this.onChangeToDate.bind(this);
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }
  componentDidMount=()=>{
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
   
  }
  componentWillMount=()=>{
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.props.count_dau(1);
  }
  componentWillReceiveProps(nextProps){
    
    if(this.props.data != nextProps.data){
    
      if(nextProps.data && nextProps.data.length >0){   
        var labels =[];
        var datasets =[];
        var data_dau =[];     
        nextProps.data.map((row,index)=>{
          return (
            labels.push(this.convertDateTime(row.date))    
          )
          
        }) 
                 
        nextProps.data.map((row,index)=>{
          return (        
            data_dau.push(row.total )
          )
              
        }) 
        datasets.push(
          {
            label:"DAU ",
            data:data_dau,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          },
        
        )
        this.setState({chartDAU:{labels,datasets}})
      }
    }
  }
  onFresh=()=>{
    this.props.count_dau(1);
    this.props.is_load_dau(true);

  }
  showModalDAU = () => {
    this.setState({
      showDAU: true,
    });
  }
  handleOkDAU = (e) => {
    this.setState({
      showDAU: false,
    });
  }
  handleCancelDAU = () => {
    this.setState({
      showDAU: false,
    });
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
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
  onChangeDAU = (page) => {
    this.setState({
      activePageDAU: page,
    });
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
    this.props.count_dau(page);

  }
  convertDateTime(time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),
    seconds = ('0' + d.getSeconds()).slice(-2),
    result, time;
    time = hh + ':' + min + ":" + seconds;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +"  "+ time;
    return result;
  }
  
  sortUserName=()=>{
    this.setState({isSortUser:true})
    if(this.state.sort_user==""){
      this.setState({sort_user:"asc"})
      
    }else{
      if(this.state.sort_user==="asc"){
        this.setState({sort_user:"desc"})
        
      }
      if(this.state.sort_user==="desc"){
        this.setState({sort_user:"asc"})
        
      }
    }
    
    this.handleSortUserName();
  }
  handleSortUserName=()=>{
    if(this.state.sort_user=="asc" || this.state.sort_user==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.username.toUpperCase() < b.username.toUpperCase() ) return -1;
        else if (a.username.toUpperCase()  > b.username.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_user=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.username.toUpperCase()  > b.username.toUpperCase() ) return -1;
        else if (a.username.toUpperCase()  < b.username.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
   
  }
  sortNickName=()=>{
    this.setState({isSortNick:true})
    if(this.state.sort_nick==""){
      this.setState({sort_nick:"asc"})
      
    }else{
      if(this.state.sort_nick==="asc"){
        this.setState({sort_nick:"desc"})
        
      }
      if(this.state.sort_nick==="desc"){
        this.setState({sort_nick:"asc"})
        
      }
    }
    
    this.handleSortNickName();
  }
  handleSortNickName=()=>{
    if(this.state.sort_nick=="asc" || this.state.sort_nick==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.nickname.toUpperCase()  < b.nickname.toUpperCase() ) return -1;
        else if (a.nickname.toUpperCase()  > b.nickname.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_nick=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.nickname.toUpperCase()  > b.nickname.toUpperCase() ) return -1;
        else if (a.nickname.toUpperCase()  < b.nickname.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
   
  }

  sortHDH=()=>{
    this.setState({isSortHDH:true})
    if(this.state.sort_hdh==""){
      this.setState({sort_hdh:"asc"})
      
    }else{
      if(this.state.sort_hdh==="asc"){
        this.setState({sort_hdh:"desc"})
        
      }
      if(this.state.sort_hdh==="desc"){
        this.setState({sort_hdh:"asc"})
        
      }
    }
    
    this.handleSortHDH();
  }
  handleSortHDH=()=>{
    if(this.state.sort_hdh=="asc" || this.state.sort_hdh==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.agent.toUpperCase()  < b.agent.toUpperCase() ) return -1;
        else if (a.agent.toUpperCase()  > b.agent.toUpperCase() ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_hdh=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.agent.toUpperCase()  > b.agent.toUpperCase() ) return -1;
        else if (a.agent.toUpperCase()  < b.agent.toUpperCase() ) return 1;
        return 0;
      }));
      
    }   
  }

  sortIP=()=>{
    this.setState({isSortIP:true})
    if(this.state.sort_ip==""){
      this.setState({sort_ip:"asc"})
      
    }else{
      if(this.state.sort_ip==="asc"){
        this.setState({sort_ip:"desc"})
        
      }
      if(this.state.sort_ip==="desc"){
        this.setState({sort_ip:"asc"})
        
      }
    }
    
    this.handleSortIP();
  }
  handleSortIP=()=>{
    if(this.state.sort_ip=="asc" || this.state.sort_ip==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.ip < b.ip) return -1;
        else if (a.ip > b.ip) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_ip=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.ip > b.ip) return -1;
        else if (a.ip < b.ip) return 1;
        return 0;
      }));
      
    }   
  }
  sortActive=()=>{
    this.setState({isSortActive:true})
    if(this.state.sort_active==""){
      this.setState({sort_active:"asc"})
      
    }else{
      if(this.state.sort_active==="asc"){
        this.setState({sort_active:"desc"})
        
      }
      if(this.state.sort_active==="desc"){
        this.setState({sort_active:"asc"})
        
      }
    }
    
    this.handleSortActive();
  }
  handleSortActive=()=>{
    if(this.state.sort_active=="asc" || this.state.sort_active==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.active < b.active ) return -1;
        else if (a.active  > b.active ) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_active=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.active  > b.active ) return -1;
        else if (a.active < b.active ) return 1;
        return 0;
      }));
      
    }   
  }
  sortSDT=()=>{
    this.setState({isSortSDT:true})
    if(this.state.sort_sdt==""){
      this.setState({sort_sdt:"asc"})
      
    }else{
      if(this.state.sort_sdt==="asc"){
        this.setState({sort_sdt:"desc"})
        
      }
      if(this.state.sort_sdt==="desc"){
        this.setState({sort_sdt:"asc"})
        
      }
    }
    
    this.handleSortSDT();
  }
  handleSortSDT=()=>{
    if(this.state.sort_sdt=="asc" || this.state.sort_sdt==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.mobile < b.mobile) return -1;
        else if (a.mobile > b.mobile) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_sdt=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (a.mobile > b.mobile) return -1;
        else if (a.mobile < b.mobile) return 1;
        return 0;
      }));
      
    }   
  }
  sortTime=()=>{
    this.setState({isSortTime:true})
    if(this.state.sort_time==""){
      this.setState({sort_time:"asc"})
      
    }else{
      if(this.state.sort_time==="asc"){
        this.setState({sort_time:"desc"})
        
      }
      if(this.state.sort_time==="desc"){
        this.setState({sort_time:"asc"})
        
      }
    }
    
    this.handleSortTime();
  }
  handleSortTime=()=>{
    if(this.state.sort_time=="asc" || this.state.sort_time==""){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (parseInt(a.time) < parseInt(b.time)) return -1;
        else if (parseInt(a.time) > parseInt(b.time)) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_time=="desc"){
     
      this.props.count_dpu_success(this.props.dpu.sort(function (a, b) {
        if (parseInt(a.time) > parseInt(b.time)) return -1;
        else if (parseInt(a.time) < parseInt(b.time)) return 1;
        return 0;
      }));
      
    }
   
  }
  render() {
    var contentList = false;
    var contentDPU = false;
    var contentChart = false;
    var total_item_dau = false;
    var total_dau = false;
    var total_item_dpu = false;
    var page = false;
    var itemsPerPage = 10;
    var item = false;
    var detailDAU = false;
    var total_content = false;
    var step = 1;
    var font = 12;
    // console.log(moment().add(-1, 'days'))
    var chartOptions= {	
    	scales: {
    		  yAxes: [{
          		ticks: {
                  suggestedMin: 0,
                  suggestedMax: 5,
                  beginAtZero:true,
                  stepSize: {step}
              },
              labelOffset: 1,
              stacked: true,
          }],
          xAxes: [{
            ticks: {
                fontSize: 10
            }
        }]
         
      },
      options: {
        legend: {
            labels: {
                defaultFontSize: 10
            }
        }
      }
    }
   
    if(this.props.isLoading){
      if(!this.props.data){
        contentList=(
          <center>
            <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
          </center>  
        )
      }else{
        if(this.props.isLoadDAU){
          contentList=(
            <center>
              <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
            </center>  
          )
        }else{
          if(this.props.data && this.props.data.length >0){
            total_dau = this.props.total_page_dau;
            total_item_dau = this.props.data.length;
            page =(
              <div style={{margin: '2% 0%'}}>
                <div style={{display: 'inline-block'}}>
                  <Pagination
                    style={{display: 'inline-block'}}
                    total={total_item_dau?total_item_dau:0}
                    pageSize={itemsPerPage}
                    defaultCurrent={1}
                    current={this.state.activePageDAU}
                    onChange={this.onChangeDAU}
                  />
                  <div style={{display:total_item_dau?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                    {this.state.activePageDAU}/{total_item_dau>0?(total_item_dau%itemsPerPage==0?total_item_dau/itemsPerPage:parseInt(total_item_dau/itemsPerPage)+1):0}
    
                  </div>
                </div>
              </div>
            )
            item = this.props.data.map((row,index)=>{
              
              if(index >= (this.state.activePageDAU-1) *itemsPerPage && index < (this.state.activePageDAU) *itemsPerPage ){ 
                return(
                  <ItemDau  row={row} key={index} index={index}/>
                )
              }
              
            })
            
            
            if(this.state.chartDAU ){
              contentChart=(
                <div style={{width:'90%',height:'100%',border:'1px solid #e2e2e2',padding:'1%',marginLeft:'0%',marginBottom:'2%'}}>
                  <Bar
                    data={this.state.chartDAU}
                    options={{
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true
                          }
                        }]
                      }
                    }}
                    width={200}
                    height={100}
                  />
                </div>
              )
            }
            total_content=(
              <tr>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>Tổng</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:15}}>{total_dau}</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:15}}></th>
              </tr>  
            )
    
            contentList = (
              <div style={{overflow:'auto',marginLeft:'0%',marginTop:'2%',}}>
                <table style={{width:'95%'}}>
                  <tbody style={{overflow:'auto'}}>
                  
                    <tr style={{overflow:'auto',background:'#ecf6fd'}}>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>Ngày</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Số lượt DAU</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                        
                    </tr>  
                    {item}
                    {total_content}
                  </tbody>  
                </table>  
              </div>
            )
          }else{
            contentList = (
              <div style={{overflow:'auto',marginLeft:'0%',marginTop:'2%',}}>
    
                <table style={{width:'95%'}}>
                  <tbody style={{overflow:'auto'}} >
                  
                    <tr style={{overflow:'auto',background:'#ecf6fd'}}>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>Ngày</th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượt DAU</th>
                        
                    </tr>  
                    <tr >
                      <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={2}>Không có dữ liệu</td>   
                    </tr>
                  </tbody>  
                </table>  
              </div>
            )
          }
        }
      }
      
      contentDPU=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length >0){
        total_dau = this.props.total_page_dau;
        total_item_dau = this.props.data.length;
        page =(
          <div style={{margin: '2% 0%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item_dau?total_item_dau:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePageDAU}
                onChange={this.onChangeDAU}
              />
              <div style={{display:total_item_dau?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePageDAU}/{total_item_dau>0?(total_item_dau%itemsPerPage==0?total_item_dau/itemsPerPage:parseInt(total_item_dau/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
         
          if(index >= (this.state.activePageDAU-1) *itemsPerPage && index < (this.state.activePageDAU) *itemsPerPage ){ 
            return(
              <ItemDau row={row} key={index} index={index}/>
            )
          }
          
        })
         
       
        if(this.state.chartDAU ){
          contentChart=(
            <div style={{width:'90%',height:'100%',border:'1px solid #e2e2e2',padding:'1%',marginLeft:'0%',marginBottom:'2%'}}>
               <Bar
                data={this.state.chartDAU}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }}
                width={200}
                height={100}
              />
              
            </div>
          )
        }
        total_content=(
          <tr>
            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>Tổng</th>
            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:15}}>{total_dau}</th>
            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:15}}></th>
          </tr>  
        )

        contentList = (
          <div style={{overflow:'auto',marginLeft:'0%',marginTop:'2%',}}>
            <table style={{width:'95%'}}>
              <tbody style={{overflow:'auto'}}>
               
                <tr style={{overflow:'auto',background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>Ngày</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Số lượt DAU</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                    
                </tr>  
                {item}
                {total_content}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        contentList = (
          <div style={{overflow:'auto',marginLeft:'0%',marginTop:'2%',}}>

            <table style={{width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
               
                <tr style={{overflow:'auto',background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:15}}>Ngày</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượt DAU</th>
                    
                </tr>  
                <tr >
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={2}>Không có dữ liệu</td>   
                </tr>
              </tbody>  
            </table>  
          </div>
        )
      }
//--------------------------------------------------------------
      if(this.props.dpu && this.props.dpu.length>0){
        total_item_dpu = this.props.total_page_dpu;
          var itemDPU = this.props.dpu.map((row,index)=>{
            
              return(
               
                  <ItemDpu row={row}  key={index} index={index+1+ (this.state.activePage-1)*itemsPerPage} convertDateTime={this.convertDateTime}/>
             
              )
            
          })
          var pageDPU =(
            <div style={{margin: '2% 0%'}}>
              <div style={{display: 'inline-block'}}>
                <Pagination
                  style={{display: 'inline-block'}}
                  total={total_item_dpu?total_item_dpu:0}
                  pageSize={itemsPerPage}
                  defaultCurrent={1}
                  current={this.state.activePage}
                  onChange={this.onChange}
                />
                <div style={{display:total_item_dpu?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                  {this.state.activePage}/{total_item_dpu>0?(total_item_dpu%itemsPerPage==0?total_item_dpu/itemsPerPage:parseInt(total_item_dpu/itemsPerPage)+1):0}
    
                </div>
              </div>
            </div>
          )
          contentDPU=(
            <div style={{overflow:'auto',marginLeft:'0%',marginTop:'2%',}}>
    
                <table style={{width:'95%'}}>
                  <tbody style={{overflow:'auto'}} >
                   
                    <tr style={{overflow:'auto',background:'#ecf6fd'}}>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>
                        <Link >STT
                          
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortUserName}>Tên người dùng
                          
                          {this.state.isSortUser?
                              ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortUser? (this.state.sort_user=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortNickName}>Tên hiển thị
                         
                          {this.state.isSortNick?
                              ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortNick? (this.state.sort_nick=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortSDT}>SĐT
                          
                          {this.state.isSortSDT?
                              (<Icon style={{marginLeft: '5px'}} type={this.state.isSortSDT? (this.state.sort_sdt=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortIP}>IP
                          
                          {this.state.isSortIP?
                              ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortIP? (this.state.sort_ip=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortActive}>Trạng thái
                          
                          {this.state.isSortActive?
                              ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortActive? (this.state.sort_active=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortHDH}>Hệ điều hành
                            
                            {this.state.isSortHDH?
                              ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortHDH? (this.state.sort_hdh=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        </Link>
                      </th>
                      <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>
                        <Link onClick={this.sortTime}>Thời gian
                            
                            {this.state.isSortTime?
                              ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortTime? (this.state.sort_time=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                              <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                        </Link>
                      </th>
                    </tr>  
                    {itemDPU}
                  </tbody>  
                </table>  
              </div>
          )
      }else{
        contentDPU=(
          <div style={{overflow:'auto',marginLeft:'0%',marginTop:'2%',}}>
  
              <table style={{width:'95%'}}>
                <tbody style={{overflow:'auto'}} >
                 
                  <tr style={{overflow:'auto',background:'#ecf6fd'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Tên người dùng</th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Tên hiển thị</th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>SĐT</th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>IP</th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Trạng thái</th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Hệ điều hành</th>
                  </tr>  
                  <tr>
                    <td colSpan={6} style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Không có dữ liệu</td>
                  </tr>  
                </tbody>  
              </table>  
            </div>
        )
      }
     
    }
    return (
      <div>
        <Button style={{height:35}} onClick={this.onFresh}>Refresh</Button>
        <h3 style={{marginLeft:"0%",marginTop:'2%'}}>Chỉ số DAU </h3>
        <div style={{flex:1}}>
            {contentList}
            {page}
          </div>
        {/* <div style={{display:this.state.isMobile?"":'flex'}}>
          <div style={{flex:1}}>
            {contentList}
            {page}
          </div>
          <div style={{flex:1.5,marginTop:'1%'}}>
              {contentChart}
            
          </div>  
        </div> */}
        <h3 style={{marginLeft:"0%",marginTop:'2%'}}>Chi tiết DPU </h3>
        {contentDPU}
        {pageDPU}
      </div>
    );
  }
}

Daunow.propTypes = {

};

export default Daunow;
