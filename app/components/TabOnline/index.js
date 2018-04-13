/**
*
* TabOnline
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
import { Link,browserHistory } from 'react-router';

class TabOnline extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1,
      sort_king : "asc",
      isSortKing : false,
      hover: false,
      
    }
  }
  componentWillMount=()=>{
    this.props.get_user_online();
  }
  formatMoney(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return a;
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  sortKing=()=>{
    this.setState({isSortKing:true})
    if(this.state.sort_king==""){
      this.setState({sort_king:"asc"})
      
    }else{
      if(this.state.sort_king==="asc"){
        this.setState({sort_king:"desc"})
        
      }
      if(this.state.sort_king==="desc"){
        this.setState({sort_king:"asc"})
        
      }
    }
    
    this.handleSortKing();
  }
  handleSortKing=()=>{
    if(this.state.sort_king=="asc" || this.state.sort_king==""){
     
      this.props.get_user_online_success(this.props.data.sort(function (a, b) {
        if (parseInt(a.king) < parseInt(b.king)) return -1;
        else if (parseInt(a.king) > parseInt(b.king)) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_king=="desc"){
     
      this.props.get_user_online_success(this.props.data.sort(function (a, b) {
        if (parseInt(a.king) > parseInt(b.king)) return -1;
        else if (parseInt(a.king) < parseInt(b.king)) return 1;
        return 0;
      }));
      
    }
   
  }
  onRefresh=()=>{
      this.setState({sort_king:"asc"})
      this.setState({isSortKing:false})
      this.setState({activePage:1})
      this.props.get_user_online();

  }
  hoverOn=()=>{
    this.setState({
      hover: true,
    });
  }
  hoverOff=()=>{
    this.setState({
      hover: false,
    });
  }
  render() {
    var contentList = false;
    var item = false;
    var itemsPerPage = 10;
    var page = false;
    var total_item = 0;
    if(this.props.isLoading){
      contentList=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length >0)
      {
        total_item = this.props.data.length;
        page =(
          <div style={{margin: '2% 0%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_item?total_item:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage}
                onChange={this.onChange}
              />
              <div style={{display:this.props.total_page?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{total_item>0?(total_item%itemsPerPage==0?total_item/itemsPerPage:parseInt(total_item/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
            return(
              <tr>
                  <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>
                    {index +1}
                  </td>
                  <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                    {row.nickname}
                  </td>
                  <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                    {row.ip}
                  </td>
                  <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                    {row.OS}
                  </td>
                  <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                    {this.formatMoney(row.king)}
                  </td>
              </tr>    
            )
          }
        })
        contentList = (
          <div style={{overflow:'auto'}}>
            <h3 style={{marginTop:'1%'}}>Tổng số lượng : {total_item}</h3>
            <table style={{marginTop:'2%',width:'90%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr style={{background:'#ecf6fd'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên nhân vật</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>IP</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>HĐH</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>
                    
                    <Link onClick={this.sortKing} style={{color:'rgba(0, 0, 0, 0.65)'}}>King(hiện có)
                          
                          {this.state.isSortKing?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortKing? (this.state.sort_king=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                  </th>
                                    
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )

      }else{
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'0%',marginTop:'2%',width:'90%'}}>
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
        <Button style={{height:35}} onClick={this.onRefresh}>Refresh</Button>
        
        {contentList}
        {page}
      </div>
    );
  }
}

TabOnline.propTypes = {

};

export default TabOnline;
