/*
 *
 * CheckIp
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading, selectData, selectIsCouting, selectCount, selectIp } from './selectors';
import messages from './messages';
import { check_ip, count_ip } from './actions';
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
  Select,
  Alert,
  Form,
} from 'antd';
import { selectSuggestData } from '../App/selectors';
import { suggest_user_by_nickname } from '../App/actions';
const Option = Select.Option;
import ItemCountIp from 'components/ItemCountIp';
const TabPane = Tabs.TabPane;

export class CheckIp extends React.Component { 
  constructor(props){
    super(props);
    this.state={      
      activePage :1,   
      activePage2 :1,   
      key : "",
      nickname : false,
      ip : "",
    };
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  onChange2 = (page) => {
    this.setState({
      activePage2: page,
    });
  }
  onClick=()=>{
    if(this.refs.key.refs.input.value.trim() !=""){
      this.props.count_ip(this.refs.key.refs.input.value.trim())
    }else{
      message.error("Nhập ip !")
    }
  }
  onCheck=()=>{
    if(this.state.key.trim() !==""){
      this.props.check_ip(this.state.key.trim());
    }else{
      message.error("Nhập nickname !")
      
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
    time = hh + ':' + min;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" " +time;
    return result;
  }
  handleChange = (value) => {
    this.setState({ key : value });
    if(value !==""){
      this.props.suggest_user_by_nickname(value);
    }
    
  }
  onSelect=(value)=>{
    this.setState({nickname : value})
  }
  onChangeIp=(e)=>{
    this.setState({ip : e.target.value.trim()})
  }
  handleKeyPress=(target) =>{
    if(target.charCode==13){
        this.onClick();
    }

  };
  handleKeyPress2=(target) =>{
    if(target.charCode==13){
        this.onCheck();
    }

  };
  render() {
    var content = false;
    var content2 = false;
    var item = false;
    var item2 = false;
    var total_page = 0;
    var total_page2 = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;
    var page2 = false;
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
        value={this.state.key}
        placeholder="Nhập nickname"
        style={{width:200,height:'35px !important',marginTop:10}}
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
    var search = (
      <Form onKeyPress={this.handleKeyPress2}>
        <div style={{marginTop:'0%',marginLeft:'0%',fontSize:13}}>
          <table>
            <tbody>
              {/* <tr style={{height:20,borderBottom:'1px dashed #e2e2e2',width:'100%'}} >
                <td style={{borderBottom:'1px dashed #e2e2e2',width:'100%'}} colSpan={4}/>
              </tr> */}
              {/* <tr style={{height:10,borderBottom:'1px dashed #e2e2e2',width:'100%'}} >
              </tr> */}
              <tr>
                  <td colSpan={4}><b>Tra cứu các IP đã đăng nhập của nickname</b></td>
              </tr>
              <tr style={{marginBottom:10}}>
                
                <td >
                <div style={{marginRight:10}}>Nhập nickname : </div>
                </td>
                <td>
                  {manager} 
                </td>
                <td style={{width:10}} />
                <td>
                  <Button icon="search" onClick={this.onCheck} style={{width:35,height:35,borderRadius:5,marginTop:10}}/>
                </td> 
              </tr>
              </tbody>  
          </table>  
          
        </div>  
      </Form>
    )
    var search2=(
      <Form onKeyPress={this.handleKeyPress}>
        <div style={{marginTop:'0%',marginLeft:'0%',fontSize:13}}>
        <table>
          <tbody>
              
              <tr >
                  <td colSpan={4} ><b>Tra cứu số lần sử dụng IP để đăng ký</b></td>
              </tr>
              <tr>
                <td>
                  <div style={{marginRight:10}}>Nhập ip : </div>
                </td>
                <td>
                  <Input placeholder ="Nhập ip" ref="key" style={{width:200,height:35,marginRight:10,marginTop:10}} onChange={this.onChangeIp}/>
                </td>
                
                <td>
                  <Button icon="search" onClick={this.onClick} style={{width:35,height:35,borderRadius:5,marginTop:10}}/>
                </td>
              </tr>    
            </tbody>  
          </table>  
          
        </div>  
      </Form>
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
          <div style={{margin: '2% 0%'}}>
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
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{index+1}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.ip}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(parseInt(row.time))}</td>
            </tr>
          )
        }
        })

        content=(
          <div style={{overflow:'auto'}}>
            <h3 style={{marginLeft:'0%',width:'95%',marginTop:'2%'}}>Số lượng : {total_page}</h3>
            <table style={{marginLeft:'0%',width:'95%',marginTop:'2%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} colSpan={3}><i>Nickname : {this.state.key.trim()}</i></th>
                </tr>  
                <tr style={{overflow:'auto',background:"rgb(236, 246, 253)",fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>IP</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian sử dụng(gần nhất)</th>
                               
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        
        content=(
          <div style={{overflow:'auto'}}>
            
           <table style={{marginLeft:'0%',width:'95%',marginTop:'2%'}}>
             <tbody style={{overflow:'auto'}} >
               
               <tr style={{overflow:'auto',background:"rgb(236, 246, 253)",fontStyle:'italic'}}>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>IP</th>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian sử dụng(gần nhất)</th>
                             
               </tr>  
               <tr>
                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={3}>Không có dữ liệu</td>
               </tr>  
             </tbody>  
           </table>  
         </div>
        )
       
      }
    }
    if(this.props.isCouting){
      content2=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.count && this.props.count.length >0){
        var string = "Số lần IP "+ this.props.ip_ +" dùng để đăng ký : "+ this.props.count +" "; 
        total_page2 = this.props.count.length;
        page2 =(
          <div style={{margin: '2% 0%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_page2?total_page2:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage2}
                onChange={this.onChange2}
              />
              <div style={{display:total_page?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage2}/{total_page2>0?(total_page2%itemsPerPage==0?total_page2/itemsPerPage:parseInt(total_page2/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item2 = this.props.count.map((row,index)=>{
          if(index >= (this.state.activePage2-1) *itemsPerPage && index < (this.state.activePage2) *itemsPerPage ){ 
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{index+1}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.username}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.agent}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(parseInt(row.time))}</td>
            </tr>
          )
        }
        })

        content2=(
          <div style={{overflow:'auto'}}>
            <h3 style={{marginLeft:'0%',width:'95%',marginTop:'2%'}}>Số lượng : {total_page2}</h3>
            <table style={{marginLeft:'0%',width:'95%',marginTop:'2%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} colSpan={4}><i>IP : {this.props.ip_}</i></th>
                </tr>  
                <tr style={{overflow:'auto',background:"rgb(236, 246, 253)",fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Username</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>HĐH</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                               
                </tr>  
                {item2}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        
        content2=(
          <div style={{overflow:'auto'}}>
            
           <table style={{marginLeft:'0%',width:'95%',marginTop:'2%'}}>
             <tbody style={{overflow:'auto'}} >
               
               <tr style={{overflow:'auto',background:"rgb(236, 246, 253)",fontStyle:'italic'}}>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>HĐH</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                             
               </tr>  
               <tr>
                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={4}>Không có dữ liệu</td>
               </tr>  
             </tbody>  
           </table>  
         </div>
        )
       
      }
        // content2=(
        //   <div>
        //     
        //     <ItemCountIp data={this.props.count} ip={this.props.ip_}/>
        //   </div>
        //   // <Alert message={string} type="info"  style={{width:'95%',marginLeft:'3%',marginTop:'1%',fontStyle:'bold'}}/>
        // )
      
    }
    return (
      <div>
        <Tabs  type="card" style={{marginLeft:'3%',marginTop:'2%'}}>
          <TabPane tab="Tra cứu số lần sử dụng IP để đăng ký" key="1">
            {search2}
            {content2}
            {page2}
          </TabPane>
          <TabPane tab="Tra cứu các IP đã đăng nhập của nickname" key="2">
            {search}
            {content}
            {page}
          </TabPane>
        </Tabs>
        
        {/* <div style={{width:'95%',height:10,marginLeft:'3%',borderBottom:'1px dashed #e2e2e2',marginTop:10}}></div> */}
       
      </div>
    );
  }
}

CheckIp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  isCouting: selectIsCouting(),
  ip_ : selectIp(),
  data : selectData(),
  count : selectCount(),
  suggest_data : selectSuggestData(),

});

function mapDispatchToProps(dispatch) {
  return {
    check_ip:(nick)=>dispatch(check_ip(nick)),
    count_ip:(ip)=>dispatch(count_ip(ip)),
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIp);
