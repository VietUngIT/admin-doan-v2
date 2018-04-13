/*
 *
 * DuyetDl
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  selectIsLoading,
  selectTotalPage,
  selectIsDuyet,
  selectData,
  selectIsHuy,
  selectDataDetail,
} from './selectors';
import {
  load_duyet_dl,
  load_duyet_dl_confirm,
  load_duyet_dl_not_confirm,
  load_duyet_dl_cancel,
  huy_duyet_dl,
  duyet_dl,
  detail_duyet_dl,
} from './actions';
import {
  load_duyet_dl_success, duyetDLTab,
} from '../App/actions';
import messages from './messages';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker,
  Modal,
  Icon,
} from 'antd';
import ItemDuyetDl from 'components/ItemDuyetDl';
import { selectIsDuyetDLTab } from '../App/selectors';
export class DuyetDl extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1,
      type_ : "0",
    }
  }
  componentWillMount=()=>{
    this.props.load_duyet_dl_not_confirm(1);
    // this.props.load_duyet_dl_success(false);
    this.props.duyetDLTab(true);
    // console.log("will-dltab")
    
  }
  componentDidMount=()=>{
    this.props.load_duyet_dl_not_confirm(1);
    this.props.duyetDLTab(true);
    // console.log("did-dltab")
    
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
    if(this.props.isDuyet || this.props.isHuy){
      this.props.load_duyet_dl(page);
    }else{
      switch(this.state.type_){
        case "3":{
          this.props.load_duyet_dl_cancel(page);
          break;
        }
        case "2":{
          this.props.load_duyet_dl(page);
          break;
        }
        case "0" :{
          this.props.load_duyet_dl_not_confirm(page);
          break;
        }
        case "1" :{
          this.props.load_duyet_dl_confirm(page);
          break;
        }
      }
    }
    
  }
  onChangeFilter(e){
    this.setState({type_:e.target.value})
    switch(e.target.value){
      case "2":{
        this.props.load_duyet_dl(1);
        this.setState({
          activePage: 1,
        });
        break;
      }
      case "0" :{
        this.props.load_duyet_dl_not_confirm(1);
        this.setState({
          activePage: 1,
        });
        break;
      }
      case "1" :{
        this.props.load_duyet_dl_confirm(1);
        this.setState({
          activePage: 1,
        });
        break;
      }
      case "3" :{
        this.props.load_duyet_dl_cancel(1);
        this.setState({
          activePage: 1,
        });
        break;
      }
    }

 }  
 refreshList=()=>{
  switch(this.state.type_){
    case "2":{
      this.props.load_duyet_dl(1);
      this.setState({
        activePage: 1,
      });
      break;
    }
    case "0" :{
      this.props.load_duyet_dl_not_confirm(1);
      this.setState({
        activePage: 1,
      });
      break;
    }
    case "1" :{
      this.props.load_duyet_dl_confirm(1);
      this.setState({
        activePage: 1,
      });
      break;
    }
    case "3" :{
      this.props.load_duyet_dl_cancel(1);
      this.setState({
        activePage: 1,
      });
      break;
    }
  }
}
  render() {
    var contentList = false;
    var item = false;
    var itemsPerPage = 10;
    var page = false;
    var filter = (
      <div style={{marginTop:'2%',marginLeft:'3%',fontSize:13}}>
        <Icon type="filter" /> <span>Lọc : </span>
        <select 
          style={{border:'1px solid #e2e2e2',borderRadius:5,height:35}}
          onChange={(e)=>this.onChangeFilter(e)}
          value={this.state.type_}
        >
          <option value={2}>Tất cả</option>          
          <option value={0}>Chưa duyệt</option>
          <option value={1}>Đã duyệt</option>
          <option value={3}>Đã hủy</option>
        </select>  
        <Button style={{height:35,marginLeft:20,borderRadius:5}} onClick={this.refreshList} icon="reload">Refresh</Button>

      </div>  
    );

  
    if(this.props.isLoading){
      contentList=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length >0){
        // total_item = this.props.data.length;
        page =(
          <div style={{margin: '2% 3%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={this.props.total_page?this.props.total_page:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage}
                onChange={this.onChange}
              />
              <div style={{display:this.props.total_page?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{this.props.total_page>0?(this.props.total_page%itemsPerPage==0?this.props.total_page/itemsPerPage:parseInt(this.props.total_page/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
          
            return(
              <ItemDuyetDl 
                key={index} 
                index = {index}
                data_detail={this.props.data_detail}
                detail_duyet_dl = {this.props.detail_duyet_dl}
                row={row}                
                duyet_dl = {this.props.duyet_dl}
                huy_duyet_dl = {this.props.huy_duyet_dl}
                ac_page = {this.state.activePage}
                load_duyet_dl = {this.props.load_duyet_dl}
                >
              </ItemDuyetDl>
            )
         
        });
        
        contentList = (
          <div style={{overflow:'auto'}}>
            <h3 style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>Số lượng : {this.props.total_page}</h3>
            <table style={{marginLeft:'3%',marginTop:'0%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{fontSize:16,height:50,textAlign:'center',fontStyle:'bold'}} colSpan={8}>Danh sách đại lý duyệt chuyển khoản</th>                  
                </tr>  
                <tr style={{overflow:'auto',fontStyle:'italic',background:"rgb(236, 246, 253)"}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Từ</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đến</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số tiền chuyển</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',width:100}} colSpan={1}>Trạng thái</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                                    
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
                  <th style={{fontSize:16,height:50,textAlign:'center',fontStyle:'bold'}} colSpan={8}>Danh sách đại lý duyệt chuyển khoản</th>                  
                </tr>  
                <tr style={{overflow:'auto',fontStyle:'italic',background:"rgb(236, 246, 253)"}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Từ</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Đến</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số tiền chuyển</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',width:100}} colSpan={1}>Trạng thái</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>
                                    
                </tr>  
                <tr>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={6}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        {filter}
        {contentList}
        {page}
      </div>
    );
  }
}

DuyetDl.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading : selectIsLoading(),
  isDuyet : selectIsDuyet(),
  isHuy : selectIsHuy(),
  data : selectData(),
  total_page : selectTotalPage(),
  data_detail :   selectDataDetail(),
  isDuyetDLTab : selectIsDuyetDLTab(),

});

function mapDispatchToProps(dispatch) {
  return {
    load_duyet_dl :(page) => dispatch(load_duyet_dl(page)),
    load_duyet_dl_confirm:(page) => dispatch(load_duyet_dl_confirm(page)),
    load_duyet_dl_success:(data) => dispatch(load_duyet_dl_success(data)),
    load_duyet_dl_not_confirm:(page) => dispatch(load_duyet_dl_not_confirm(page)),
    load_duyet_dl_cancel:(page) => dispatch(load_duyet_dl_cancel(page)),
    duyet_dl :(id)=>dispatch(duyet_dl(id)),
    huy_duyet_dl:(id)=>dispatch(huy_duyet_dl(id)),
    detail_duyet_dl:(id)=>dispatch(detail_duyet_dl(id)),
    duyetDLTab:(value)=>dispatch(duyetDLTab(value)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DuyetDl);
