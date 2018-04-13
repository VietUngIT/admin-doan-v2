/**
*
* TabMoney
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
} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Workbook from 'react-excel-workbook';
class TabMoney extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      activePage : 1,
    };
  }
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),
    second = ('0' + d.getSeconds()).slice(-2),
    result, time;
    time = hh + ':' + min + ":" + second;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" "+time;
    return result;
  }
  
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  render() {
    var table;
    var total =0;
    var itemsPerPage = 10;
    var total_item = 0;
    if(this.props.loadMoney){
      table=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.dataMoney && this.props.dataMoney.length > 0){
        var item = false;
        var date = false;
        var nn = false;
        var count = false;
        var print  = false;
        var data_printf = [];
        total_item = this.props.dataMoney.length;
        table = this.props.dataMoney.map((row,index)=>{
        
          data_printf = (row.array)
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            total = this.formatCurency(row.total);
            item = row.array.map((r,i)=>{
              nn = r.nickName;
              count = r.count;
              return(
                <tr key={i}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.nickName}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{r.count}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.formatCurency(r.money)}</td>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.date)}</td>
                </tr>  
              )
    
            })
          }
          
          var temp=(
            <div key={index} style={{marginTop:'2%'}}>
             <h3 style={{width:'100%',marginTop:'1%',marginLeft:'2%'}}><i>Tổng tiền : {total}</i></h3>
              <table style={{marginLeft:'2%',height:'100%',width:'100%'}}>
                <tbody>
                <tr>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nickname</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Số lần nạp</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Tổng tiền nạp</th>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Thời gian giao dịch</th>
                </tr>
                {item}
                </tbody>
              </table>
            </div>  
          )
          
          return temp;
        })
        print = (
          <div  style={{marginTop: '2%',marginLeft:'2%'}}>
            <Workbook filename={"Tiền_nạp"+"_"+this.props.st+"_"+this.props.et+".xlsx"} element={<Button type="primary">Xuất file</Button>}>
              <Workbook.Sheet data={data_printf} name="Tiền nạp">
                <Workbook.Column label="Nickname" value="nickName"/>
                <Workbook.Column label="Số lần nạp" value="count"/>
                <Workbook.Column label="Tổng tiền nạp" value={r => this.formatCurency(r.money)}/>
                <Workbook.Column label="Thời gian giao dịch" value={r => this.convertDate(r.date)}/>
              </Workbook.Sheet>
            </Workbook> 
          </div>
        )
      }else{
        table=(<h3 style={{marginLeft:'10%',marginTop:'5%'}}>Không có dữ liệu !</h3>)
      }
    }
    
    
    return (
      <div>
       {table}
       {print}
       
        <div style={{float: 'right',margin: '3% 5%'}}>
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
      </div>
    );
  }
}

TabMoney.propTypes = {

};

export default TabMoney;
