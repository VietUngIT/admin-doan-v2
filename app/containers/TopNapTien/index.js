/*
 *
 * TopNapTien
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading, selectData } from './selectors';
import messages from './messages';
import { get_top_money, get_top_money_success } from './actions';
const format = 'HH:mm:ss';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import { Link, } from 'react-router';
import Workbook from 'react-excel-workbook';
var data_print =[];

var st_="";
var et_="";
export class TopNapTien extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1,
      type_ : "2",
      dateMoney : moment(),      
      todateMoney : moment(),     
     
      fromTime : "",
      toTime : "",
     
      sort_total : "asc",
      isSortTotal : false,

      sort_loinhuan : "asc",
      isSortLoiNhuan : false,

      sort_luongtien : "asc",
      isSortLuongTien : false,
    }
  }
  componentWillReceiveProps(nextProps){
    data_print =[];
   
    if(this.props.data != nextProps.data){
      if(nextProps.data && nextProps.data.length >0){ 
        
        nextProps.data.map((row,index)=>{
          var total_item =0;
          var tong_name1= 0;
          var tong_name2= 0;
          var tong_name3= 0;
          var tong_name4= 0;
          var tong_name5= 0;
          if(row.bacay !=="0/0/0/0"){
            tong_name1 +=Math.abs(parseInt(row.bacay.split("/")[0]));
            tong_name2 +=parseInt(row.bacay.split("/")[1]);
            tong_name3 +=parseInt(row.bacay.split("/")[2]);
            tong_name4 +=parseInt(row.bacay.split("/")[3]);
          }
          if(row.taixiu !=="0/0/0/0/0/0"){    
            tong_name1 +=Math.abs(parseInt(row.taixiu.split("/")[4]));
            tong_name2 +=parseInt(row.taixiu.split("/")[5]);
            tong_name3 +=parseInt(row.taixiu.split("/")[2]);
            tong_name4 +=parseInt(row.taixiu.split("/")[3]);
          }
          if(row.minipoker !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.minipoker.split("/")[0]));
            tong_name2 +=parseInt(row.minipoker.split("/")[1]);
            tong_name3 +=parseInt(row.minipoker.split("/")[2]);
            tong_name4 +=parseInt(row.minipoker.split("/")[3]);
          }
          if(row.baucua !=="0/0/0/0"){
           
            tong_name1 +=Math.abs(parseInt(row.baucua.split("/")[0]));
            tong_name2 +=parseInt(row.baucua.split("/")[1]);
            tong_name3 +=parseInt(row.baucua.split("/")[2]);
            tong_name4 +=parseInt(row.baucua.split("/")[3]);
          }
          if(row.caothap !=="0/0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.caothap.split("/")[4]));
            tong_name2 +=parseInt(row.caothap.split("/")[1]);
            tong_name3 +=parseInt(row.caothap.split("/")[2]);
            tong_name4 +=parseInt(row.caothap.split("/")[3]);
          }
          if(row.quanan !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.quanan.split("/")[0]));
            tong_name2 +=parseInt(row.quanan.split("/")[1]);
            tong_name3 +=parseInt(row.quanan.split("/")[2]);
            tong_name4 +=parseInt(row.quanan.split("/")[3]);
          }
          if(row.xocdia !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.xocdia.split("/")[0]));
            tong_name2 +=parseInt(row.xocdia.split("/")[1]);
            tong_name3 +=parseInt(row.xocdia.split("/")[2]);
            tong_name4 +=parseInt(row.xocdia.split("/")[3]);
          }
          if(row.luongson !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.luongson.split("/")[0]));
            tong_name2 +=parseInt(row.luongson.split("/")[1]);
            tong_name3 +=parseInt(row.luongson.split("/")[2]);
            tong_name4 +=parseInt(row.luongson.split("/")[3]);
          }
          if(row.caoboi !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.caoboi.split("/")[0]));
            tong_name2 +=parseInt(row.caoboi.split("/")[1]);
            tong_name3 +=parseInt(row.caoboi.split("/")[2]);
            tong_name4 +=parseInt(row.caoboi.split("/")[3]);
          }
          if(row.como !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.como.split("/")[0]));
            tong_name2 +=parseInt(row.como.split("/")[1]);
            tong_name3 +=parseInt(row.como.split("/")[2]);
            tong_name4 +=parseInt(row.como.split("/")[3]);
          }
          if(row.baicao !=="0/0/0/0"){
           
            tong_name1 +=Math.abs(parseInt(row.baicao.split("/")[0]));
            tong_name2 +=parseInt(row.baicao.split("/")[1]);
            tong_name3 +=parseInt(row.baicao.split("/")[2]);
            tong_name4 +=parseInt(row.baicao.split("/")[3]);
          }
          if(row.lieng !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.lieng.split("/")[0]));
            tong_name2 +=parseInt(row.lieng.split("/")[1]);
            tong_name3 +=parseInt(row.lieng.split("/")[2]);
            tong_name4 +=parseInt(row.lieng.split("/")[3]);
          }
          if(row.poker !=="0/0/0/0"){
            
            tong_name1 +=Math.abs(parseInt(row.poker.split("/")[0]));
            tong_name2 +=parseInt(row.poker.split("/")[1]);
            tong_name3 +=parseInt(row.poker.split("/")[2]);
            tong_name4 +=parseInt(row.poker.split("/")[3]);
          }
          if(row.tienlen !=="0/0/0/0"){
           
            tong_name1 +=Math.abs(parseInt(row.tienlen.split("/")[0]));
            tong_name2 +=parseInt(row.tienlen.split("/")[1]);
            tong_name3 +=parseInt(row.tienlen.split("/")[2]);
            tong_name4 +=parseInt(row.tienlen.split("/")[3]);
          }
          tong_name5+=row.napKingSMS + row.bank +row.napThe;
            if(tong_name5 >0){
              data_print.push({
                "nickName":row.nickName,
                "luongtien":tong_name1,
                "loinhuan":tong_name3,
                "tongtien":tong_name5,
              })
            }
            
        })
      }
    }
  }
  formatMoney(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }

  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  sortTotal=(data_print)=>{
    this.setState({isSortTotal:true})
    if(this.state.sort_total==""){
      this.setState({sort_total:"asc"})
    }else{
      if(this.state.sort_total==="asc"){
        this.setState({sort_total:"desc"})
      }
      if(this.state.sort_total==="desc"){
        this.setState({sort_total:"asc"})
      }
    }
    this.handleSortTotal(data_print);
  }
  handleSortTotal=(data_print)=>{
    if(this.state.sort_total=="asc" || this.state.sort_total==""){
     
      data_print =(data_print.sort(function (a, b) {
        if (parseInt(a.tongtien) < parseInt(b.tongtien)) return -1;
        else if (parseInt(a.tongtien) > parseInt(b.tongtien)) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_total=="desc"){
     
      data_print =(data_print.sort(function (a, b) {
        if (parseInt(a.tongtien) > parseInt(b.tongtien)) return -1;
        else if (parseInt(a.tongtien) < parseInt(b.tongtien)) return 1;
        return 0;
      }));
      
    }
  }
  sortLoiNhuan=(data_print)=>{
    this.setState({isSortLoiNhuan:true})
    if(this.state.sort_loinhuan==""){
      this.setState({sort_loinhuan:"asc"})
      
    }else{
      if(this.state.sort_loinhuan==="asc"){
        this.setState({sort_loinhuan:"desc"})
        
      }
      if(this.state.sort_loinhuan==="desc"){
        this.setState({sort_loinhuan:"asc"})
        
      }
    }
    
    this.handleSortLoiNhuan(data_print);
  }
  handleSortLoiNhuan=(data_print)=>{
    if(this.state.sort_loinhuan=="asc" || this.state.sort_loinhuan==""){
     
      data_print =(data_print.sort(function (a, b) {
        if (parseInt(a.loinhuan) < parseInt(b.loinhuan)) return -1;
        else if (parseInt(a.loinhuan) > parseInt(b.loinhuan)) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_loinhuan=="desc"){
     
      data_print =(data_print.sort(function (a, b) {
        if (parseInt(a.loinhuan) > parseInt(b.loinhuan)) return -1;
        else if (parseInt(a.loinhuan) < parseInt(b.loinhuan)) return 1;
        return 0;
      }));
      
    }
  }
  sortLuongTien=(data_print)=>{
    this.setState({isSortLuongTien:true})
    if(this.state.sort_luongtien==""){
      this.setState({sort_luongtien:"asc"})
      
    }else{
      if(this.state.sort_luongtien==="asc"){
        this.setState({sort_luongtien:"desc"})
        
      }
      if(this.state.sort_luongtien==="desc"){
        this.setState({sort_luongtien:"asc"})
        
      }
    }
    this.handleSortLuongTien(data_print);
  }
  handleSortLuongTien=(data_print)=>{
    
    if(this.state.sort_luongtien=="asc" || this.state.sort_luongtien==""){
     
      data_print =(data_print.sort(function (a, b) {
        if (parseInt(a.luongtien) < parseInt(b.luongtien)) return -1;
        else if (parseInt(a.luongtien) > parseInt(b.luongtien)) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_luongtien=="desc"){
     
      data_print =(data_print.sort(function (a, b) {
        if (parseInt(a.luongtien) > parseInt(b.luongtien)) return -1;
        else if (parseInt(a.luongtien) < parseInt(b.luongtien)) return 1;
        return 0;
      }));
      
    }
  }
  onClick=()=>{
    var _date = false;
    var _todate = false;
    var someDate = false;
    var toDate = false;
    // data_print=[];
    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""
    && this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!=="")
    {
      if(this.convertDate(new Date().getTime()) ===this.refs.toDate.input.props.value.toString().trim()){
        toDate = new Date().getTime();
      }else{
        _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59:59";
        toDate = new Date(_todate).getTime();
      }
     _date = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00:00";
      someDate = new Date(_date).getTime();

      st_ = this.refs.fromDate.input.props.value.toString().trim();
      et_ = this.refs.toDate.input.props.value.toString().trim() ;
  
      this.props.get_top_money(someDate,toDate);
      this.setState({activePage:1})
      this.setState({sort_loinhuan:"asc"})
      this.setState({isSortLoiNhuan:false})
      this.setState({sort_luongtien:"asc"})
      this.setState({isSortLuongTien:false})
      this.setState({sort_total:"asc"})
      this.setState({isSortTotal:false})
    }else{
      _date = 0;
      _todate = 0;
      message.error('Ngày chưa được chọn !');
    }

  }
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date;
    return result;
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
  render() {
    var contentList = false;
    var item = false;
    var itemsPerPage = 10;
    var page = false;
    var print1 = false;
    var total_item =0;
    var tong_name1= 0;
    var tong_name2= 0;
    var tong_name3= 0;
    var tong_name4= 0;
    var tong_name5= 0;
    var data_print_temp =[];
    // var data_print =[];
    
    var search = (
      <table style={{marginLeft:'5%',marginTop:'1%'}}>
        <tbody>
          <tr>
            <td>Ngày bắt đầu
            </td>
              
            <td>Ngày kết thúc
            </td>  
            <td>
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
            <td style={{width:10}}/>  
            <td>
              <Button icon="search" style={{height:35,width:35}} onClick={this.onClick}/>
            </td>
          </tr>
         
          </tbody>
        </table>           
       
    )
    if(this.props.isLoading){
      contentList=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length >0)
      {
        if(data_print.length>0){
          total_item = data_print.length;
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
    
          item = data_print.map((row,index)=>{
            if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
              return(
                <tr key={index}>
                  
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                      {index +1}
                    
                    </td>
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                      {row.nickName}           
                    </td>
                   
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                      {this.formatMoney(row.luongtien)}
                    
                    </td>
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                      {this.formatMoney(row.loinhuan)}
                    </td>
                    <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                      {this.formatMoney(row.tongtien)}
                    </td>
                   
                </tr>    
              )
            }
          })
          contentList = (
            <div style={{overflow:'auto'}}>
  
              <table style={{marginLeft:'5%',marginTop:'2%',width:'90%'}}>
                <tbody style={{overflow:'auto'}} >
                    
                  <tr style={{background:'#ecf6fd',fontStyle:'italic'}}>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                      <Link >STT </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                      <Link >Tên người dùng</Link>
                    </th>
                    
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                      <Link onClick={()=>this.sortLuongTien(data_print)}>Luồng tiền
                        
                        {this.state.isSortLuongTien?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortLuongTien? (this.state.sort_luongtien=="desc"?"up-square-o":"down-square-o"):""}></Icon> ):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}                                       
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                      <Link onClick={()=>this.sortLoiNhuan(data_print)}>Lợi nhuận
                             
                        {this.state.isSortLoiNhuan?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortLoiNhuan? (this.state.sort_loinhuan=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}                   
                      </Link>
                    </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                      <Link onClick={()=>this.sortTotal(data_print)}>Tổng tiền nạp
                           {this.state.isSortTotal?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortTotal? (this.state.sort_total=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}                   
                      </Link>
                    </th>
                  </tr>  
                  {item}
                </tbody>  
              </table>  
            </div>
          )
          print1 = (
            <div style={{marginBottom:10,marginLeft:'5%'}}>
              <Workbook filename={"Top_Nap_Tien_"+st_+"_"+et_+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                <Workbook.Sheet data={data_print} name="Top nạp tiền">
                  <Workbook.Column label="Nickname" value="nickName"/>             
                  <Workbook.Column label="Luồng tiền" value={r=>this.formatMoney(r.luongtien)}/>   
                  <Workbook.Column label="Lợi nhuận" value={r=>this.formatMoney(r.loinhuan)}/>             
                  <Workbook.Column label="Tổng tiền" value={r=>this.formatMoney(r.tongtien)}/>   
                
                </Workbook.Sheet> 
                
              </Workbook> 
            </div>
          ) 
        }else{
          contentList = (
            <div style={{overflow:'auto'}}>
  
              <table style={{marginLeft:'5%',marginTop:'2%',width:'90%'}}>
                <tbody>
                  <tr style={{background:'#ecf6fd'}}>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={4}>Không có dữ liệu</td>
                  </tr>  
                </tbody>  
              </table>  
            </div>
          )
        }
        
      }else{
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'5%',marginTop:'2%',width:'90%'}}>
              <tbody>
                <tr style={{background:'#ecf6fd'}}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={4}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        <h3  style={{marginLeft:'5%',marginTop:'2%'}}>Top nạp tiền</h3>
        {search}
        {contentList}
        {page}
        {print1}
      </div>
    );
  }
}

TopNapTien.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  data : selectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    get_top_money:(st,et)=>dispatch(get_top_money(st,et)),
    get_top_money_success:(data)=>dispatch(get_top_money_success(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNapTien);
