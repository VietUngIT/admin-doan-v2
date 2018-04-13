/*
 *
 * MoneyOutDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Tabs,
         Input,
         Button,
         message,
         Pagination ,
         TimePicker,
       } from 'antd';
import { createStructuredSelector } from 'reselect';
import {
  detail_ouput_money,
} from './actions';
import {  
  selectDataDetail,
  selectisLoadDetail,  
}from './selectors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router' ;
import TabDetail from 'components/Money/TabDetail';
import Workbook from 'react-excel-workbook';

const format = 'HH:mm';
var st_print_detail = false;
var et_print_detail = false;
var un_detail = "";

export class MoneyOutDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage : 1,
    };
  }
  componentWillMount=()=>{
    this.props.detail_ouput_money(this.props.params.st,this.props.params.et,(this.props.params.un!=="all")?this.props.params.un:"");
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
    result = date ;
    return result;
  }
  convertTime = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = time ;
    return result;
  }
  convertDateTime = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date+" "+time ;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  formatCard(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return a;
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  convertError(r){
    if(r.error===0){
      var cd = r.description.length;
      var nhamang = r.description.substr(15,cd-1).split("|")[0];
      var menhgia = r.description.substr(15,cd-1).split("|")[1];
      var seri = r.description.substr(15,cd-1).split("|")[2];            
      var mathe = r.description.substr(15,cd-1).split("|")[3];
      // if(nhamang=="VMS"){
      //   tt += parseInt(menhgia);
      //   count ++;
      // }
      return(
        <div>
          <div>Nhà mạng : {nhamang}</div>
          <div>Mệnh giá : {this.formatCard(menhgia)}</div>
          <div>Seri : {seri}</div>
          <div>Mã Thẻ : {mathe}</div>
        </div>  
      )
    }else{
      return r.description;
    }
    
  }
  convertE(r){
    var kq = "";
    if(r.error===0){
      var cd = r.description.length;
      var nhamang = r.description.substr(15,cd-1).split("|")[0];
      var menhgia = r.description.substr(15,cd-1).split("|")[1];
      var seri = r.description.substr(15,cd-1).split("|")[2];            
      var mathe = r.description.substr(15,cd-1).split("|")[3];
      
      kq = "Nhà mạng : "+ nhamang +"| Mệnh giá : "+this.formatCard(menhgia)+"| Seri : "+ seri +"| Mã Thẻ : "+  mathe+"."
      return kq;
    }else{
      return r.description;
    }
    
  }
  render() {
    var tableDetail =false;
    var itemsPerPage = 10;
    var total_item = 0;
    var data_print = [];
    var ncc_print= [];
    var print = false;
    var page = false;
    if(this.props.loadDetail){
      tableDetail=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.dataDetail && this.props.dataDetail.length > 0){
      
        var item = false;
        var date = false;
        var total = 0;
        var t_total = 0;
        var description = false;
        var ncc = false;
        var header_ncc = false;
        var header_table = false;
        var total_content = false;
        var sheet1 = false;
        var sheet2 = false;
        var item_tt = 0;
        
        total_item =this.props.dataDetail.length;
        
        tableDetail = this.props.dataDetail.map((row,index)=>{
            
            if(index==0){
              if(row.length >0){
                ncc_print = row;
                header_ncc=(
                 <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                   <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nhà mạng </th>
                   <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng thẻ </th>
                   <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền </th>
                 </tr>
                )
                ncc = row.map((r,i)=>{
                  t_total += r.amount ;
                  return(
                   <tr key={i}>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.provider}</td>
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.count}</td>                    
                     <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.amount)}</td>                  
                    
                   </tr>
                  )
                   
                 })
                 total_content =  (<i><h3 style={{marginLeft:'2%',marginTop:'2%'}}>Tổng tiền theo nhà mạng : {this.formatCurency(t_total)}</h3></i>);
              }else{
                header_ncc=(
                  <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                    <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nhà mạng</th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng thẻ </th>
                    <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tổng tiền </th>
                  </tr>
                 )
                ncc = (
                  <tr>
                    <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={3}>Không có dữ liệu</td>
                  </tr>  
                )
              }
              
               
            }else{
              if(row.array){                
                print = (
                  <div  style={{marginTop: '2%',marginLeft:'2%'}}>
                    <Workbook filename={"CT_rút_tiền"+"_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
                    <Workbook.Sheet data={data_print} name="Chi tiết rút tiền">
                      <Workbook.Column label="Nickname" value="nickName"/>
                      <Workbook.Column label="Số tiền" value={r => this.formatCurency(r.amount)}/>              
                      <Workbook.Column label="Mã lỗi" value="error"/>
                      <Workbook.Column label="Thời gian giao dịch" value={r => this.convertDateTime(r.date)}/>
                      <Workbook.Column label="Chi tiết" value={r=>this.convertE(r)}/>
                    </Workbook.Sheet> 
                    <Workbook.Sheet data={ncc_print} name="Thống kê nhà mạng">
                      <Workbook.Column label="Nhà mạng" value="provider"/>
                      <Workbook.Column label="Số lượng thẻ nạp" value="count"/>
                      <Workbook.Column label="Tổng tiền đã nạp" value={r=>this.formatCurency(r.amount)}/>
                    </Workbook.Sheet>
                    </Workbook> 
                  </div>
                )
                page = (
                  <div style={{margin: '2% 3%'}}>
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
                if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
                  date = this.convertDate(row.date);
                  total = this.formatCurency(row.total);
                  item_tt = row.array.length;
                  item = row.array.map((r,i)=>{  
                    data_print.push(r)        
                    description= this.convertError(r);       
                    // console.log("tt:",tt)          
                    // console.log("count:",count)          
                    return(
                      <tr key={i}>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{i+1}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.nickName}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.amount)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.error}</td>              
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertTime(r.date)}</td>
                        <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',paddingLeft:5}}>
                          {description}
                        </td>                    
                      </tr>  
                    )        
                  })
                  
                  var temp=(
                    <div key={index} style={{marginTop:'2%'}}>
      
                      <h3 style={{marginLeft:'2%'}}>Ngày : {date}</h3>
                      <i><h4 style={{marginLeft:'2%'}}>Tổng tiền trong ngày : {total}</h4></i>
                      <div style={{width:'100%',overflow:'auto',height:item_tt>7?'400px':'auto'}}>
                        <table style={{marginLeft:'2%',height:'100%',width:'97%'}}>
                        <tbody>
                          <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>STT</th>                            
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Số tiền</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Mã lỗi</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Thời gian</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Chi tiết</th>
                          </tr>
                          {item}
                        </tbody> 
                        </table>
                      </div>
                    </div>  
                  )
                  
                  return temp;
                }
              }else{
                return(
                  <div key={index} style={{marginTop:'2%'}}>                  
                    <div style={{width:'100%',overflowY:'auto',overflowX:'hidden'}}>
                      <table style={{marginLeft:'2%',height:'100%',width:'97%'}}>
                        <tbody>
                          <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Số tiền</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Mã lỗi</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Thời gian</th>
                            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Chi tiết</th>
                          </tr>
                          <tr>
                            <td colSpan={5} style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Không có dữ liệu</td>
                          </tr>  
                        </tbody> 
                      </table>
                    </div>
                  </div>  
                )
              }     
              
            }            
              
           
        })
        
      }else{
        tableDetail=(<h3 style={{marginLeft:'5%',marginTop:'5%'}}>Không có dữ liệu !</h3>)
      }
    }
    return (
      <div>
        {total_content}
        <table style={{width:'97%',marginLeft:'2%',marginTop:'1%'}}>
          <tbody style={{width:'100%'}}>
            {header_ncc}
            {ncc}
          </tbody>
        </table>  
        {tableDetail}
        {print}
        {page} 
      </div>
    );
  }
}

MoneyOutDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dataDetail : selectDataDetail(),  
  loadDetail : selectisLoadDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    detail_ouput_money:(date,todate,un)=> dispatch(detail_ouput_money(date,todate,un)),    
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyOutDetail);
