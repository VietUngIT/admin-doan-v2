/*
 *
 * Backup
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectData, selectIsLoading } from './selectors';
import messages from './messages';
import { back_up, back_up_success } from './actions';
import ItemBackUp from 'components/ItemBackUp';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker,
  Modal,
  Icon
} from 'antd';
import { Link, } from 'react-router';

export class Backup extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1, 
      sort_time : "asc",
      isSortTime : false,
    }
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
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
     
      this.props.back_up_success(this.props.data.sort(function (a, b) {
        let string_a = a.date.split(".csv")[0].split("_")[1]+"/"+a.date.split(".csv")[0].split("_")[0]+"/"+a.date.split(".csv")[0].split("_")[2];
        let string_b = b.date.split(".csv")[0].split("_")[1]+"/"+b.date.split(".csv")[0].split("_")[0]+"/"+b.date.split(".csv")[0].split("_")[2];
        let a_ = (new Date(string_a).getTime());
        let b_ = (new Date(string_b).getTime());
        
        if (a_ < b_) return -1;
        else if (a_ > b_) return 1;
        return 0;
      }));
      
    }
    if(this.state.sort_time=="desc"){
     
      this.props.back_up_success(this.props.data.sort(function (a, b) {
        let string_c = a.date.split(".csv")[0].split("_")[1]+"/"+a.date.split(".csv")[0].split("_")[0]+"/"+a.date.split(".csv")[0].split("_")[2];
        let string_d = b.date.split(".csv")[0].split("_")[1]+"/"+b.date.split(".csv")[0].split("_")[0]+"/"+b.date.split(".csv")[0].split("_")[2];
        let c_ = (new Date(string_c).getTime());
        let d_ = (new Date(string_d).getTime());
        if (c_ > d_) return -1;
        else if (c_ < d_) return 1;
        return 0;
      }));
      
    }
   
  }
  back_up=()=>{
      this.setState({sort_time:"asc"})
      this.setState({isSortTime:false})
      this.props.back_up();
  }
  render() {
    var contentList = false;
    var item = false;
    var total_item = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;

    if(this.props.isLoading){
      contentList=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length >0){
        total_item = this.props.data.length;
        page =(
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
        item = this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 

            return(
              <ItemBackUp 
                key={index} 
                row={row}
               
                index={index+1}
              >
              </ItemBackUp>
            )
          }
        });
        
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                    <Link onClick={this.sortTime} style={{color:'rgba(0, 0, 0, 0.65)'}}>Thời gian
                          
                          {this.state.isSortTime?
                           (<Icon style={{marginLeft: '5px'}} type={this.state.isSortTime? (this.state.sort_time=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                           <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>} 
                      </Link>
                  </th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Download</th>                     
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody>
                
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Ngày</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Download</th>   
                  
                </tr>  
                <tr>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={3}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        <Button icon="cloud-download-o" style={{marginLeft:'3%',marginTop:'2%',height:35}} type="primary" onClick={this.back_up}>Backup</Button>
        {contentList}
        {page}
      </div>
    );
  }
}

Backup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  isLoading: selectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    back_up:()=>dispatch(back_up()),
    back_up_success:(data)=>dispatch(back_up_success(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Backup);
