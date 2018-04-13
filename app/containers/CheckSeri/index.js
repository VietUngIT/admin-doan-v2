/*
 *
 * CheckSeri
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading, selectData } from './selectors';
import messages from './messages';
import { check_seri } from './actions';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Menu,
  Modal,
  Icon,
} from 'antd';

export class CheckSeri extends React.Component { 
  constructor(props){
    super(props);
    this.state={      
      activePage :1,   
      type : "s" ,
    };
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' King';
    return a;
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
    result = date +" " +time;
    return result;
  }
  onChangeType=(e)=>{
    this.setState({type:e.target.value});
  }
  onClick=()=>{
    if(this.refs.key.refs.input.value.trim() !=""){
      this.props.check_seri(this.refs.key.refs.input.value.trim(),this.state.type?this.state.type:"s")
    }else{
      message.error("Nhập seri hoặc mã thẻ !")
    }
  }
  render() {
    var content = false;
    var item = false;
    var total_page = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;

    var search = (
      
      <div style={{marginTop:'2%',marginLeft:'3%',fontSize:13}}>
        <Input placeholder ="Nhập seri hoặc mã thẻ" ref="key" style={{width:200,height:35,marginRight:10}}/>
        <select id="type" onChange={(e)=>this.onChangeType(e)}  value={this.state.type}                
          style={{height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',marginRight:10}}>
          <option value={"s"} > Seri</option>
          <option value={"c"} > Mã thẻ</option>                           
                            
        </select> 
        <Button icon="search" onClick={this.onClick} style={{width:35,height:35,borderRadius:5}}/>
      </div>  
    )
    if(this.props.isLoading){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && (this.props.data.length >0 || this.props.data.size >0)){
        
        total_page = this.props.data.length;
        page =(
          <div style={{margin: '2% 3%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_page?total_page:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage}
                onChange={this.onChange}
              />
              <div style={{display:total_page?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{total_page>0?(total_page%itemsPerPage==0?total_page/itemsPerPage:parseInt(total_page/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.nickName}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.seri}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.mathe}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.manhacungcap}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.error_msg}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.formatCurency(row.exchangeMoney)}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.count}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(row.updateTime)}</td>
            </tr>
          )
        }
        })

        content=(
          <div style={{overflow:'auto'}}>
            
            <table style={{marginLeft:'3%',width:'95%',marginTop:20}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:"2%"}}>Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Seri</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mã thẻ</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhà mạng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mã lỗi</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Số tiền</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Số lượng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày</th>
                               
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        content=(
          <div style={{overflow:'auto'}}>
            
           <table style={{marginLeft:'3%',width:'95%',marginTop:20}}>
             <tbody style={{overflow:'auto'}} >
               
               <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:"2%"}}>Nickname</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Seri</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mã thẻ</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhà mạng</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Mã lỗi</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Số tiền</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Số lượng</th>
                 <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày</th>
                             
               </tr>  
               <tr>
                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={8}>Không có dữ liệu</td>
               </tr>  
             </tbody>  
           </table>  
         </div>
        )
       
      }
    }
    return (
      <div>
       {search}
       {content}
       {page}
      </div>
    );
  }
}

CheckSeri.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  data : selectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    check_seri:(key,type)=> dispatch(check_seri(key,type)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckSeri);
