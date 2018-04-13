/*
 *
 * DuyetCard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading, selectData, selectIsDuyet, selectIsHuy, selectIsGetListNCC, selectIsChangeNCCSuccess, selectDataNCC } from './selectors';
import messages from './messages';
import { get_card_list, duyet_card, huy_duyet_card, get_card_list_success, change_ncc_card,get_list_ncc_card } from './actions';
import ItemDuyetCard from 'components/ItemDuyetCard';
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
import { Link,browserHistory } from 'react-router';

export class DuyetCard extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1,
      type_ : "unconfirmed",
      changed:false,
      number : [],
      sort_time : "asc",
      isSortTime : false,
      ncc : false,
      isChange : false,
    }
  }
  onChangeNumber=(id)=>{
    this.setState({number :this.state.number.concat(id)})
    this.setState({changed : true})
    
  }
  componentWillMount=()=>{
    this.props.get_card_list("unconfirmed");
    this.props.get_list_ncc_card();
    
  }
  componentDidMount=()=>{
    
  }
  componentWillReceiveProps=(nextprops)=>{
    if(this.props.data_ncc !== nextprops.data_ncc){
      this.setState({ncc:nextprops.data_ncc})
    }
    if(this.props.isChangeNCC !== nextprops.isChangeNCC){
      this.setState({isChange:!nextprops.data_ncc})
    }
  }
  refreshList=()=>{
    this.props.get_card_list(this.state.type_);
    this.setState({
      activePage: 1,
    });
    this.setState({isSortTime : false})
    this.setState({sort_time : "asc"})
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  onChangeFilter(e){
    this.setState({type_:e.target.value})
    this.setState({activePage:1})
    this.setState({isSortTime : false})
    this.setState({sort_time : "asc"})
    
    this.props.get_card_list(e.target.value) 

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
   
    this.props.get_card_list_success(this.props.data.sort(function (a, b) {
      if (parseInt(a.updateTime) < parseInt(b.updateTime)) return -1;
      else if (parseInt(a.updateTime) > parseInt(b.updateTime)) return 1;
      return 0;
    }));
    
  }
  if(this.state.sort_time=="desc"){
   
    this.props.get_card_list_success(this.props.data.sort(function (a, b) {
      if (parseInt(a.updateTime) > parseInt(b.updateTime)) return -1;
      else if (parseInt(a.updateTime) < parseInt(b.updateTime)) return 1;
      return 0;
    }));
    
  }
 
}
onChangeNCC=(e)=>{
  this.setState({ncc : e.target.value})
  this.setState({isChange : true})
}
saveNCC=()=>{
  this.props.change_ncc_card(this.state.ncc)
}
  render() {
    var contentList = false;
    var item = false;
    var itemsPerPage = 10;
    var total_item = 0;
    var page = false;
    var waiting = false;
    var ncc_content = (
      <div style={{display:'-webkit-box',marginLeft:'3%',marginTop:'2%',overflow:'auto'}}>
        <h4 style={{height:35,fontSize:13,lineHeight:3}}>Nhà cung cấp thẻ hiện tại:</h4>
        <select value={this.state.ncc} onChange={this.onChangeNCC} style={{width:120,height:35,borderRadius:5,border:'1px solid #e2e2e2',marginLeft : 10}}>
          <option value={"alego"}>Ngân lượng</option>
          <option value={"epay"}>Epay</option>
        </select>
        <Button onClick={this.saveNCC} disabled={!this.state.isChange} style={{height:35,marginLeft : 10}} type="primary">Lưu</Button>
      </div>  
    )
    if(this.props.isDuyet || this.props.isHuy){
      waiting=(
        <center>
          <div>Đang xử lý</div>
          <img src={require('images/loading1.gif')} style={{width:50,height:25}}/>
        </center>  
      )
    }
    var filter = (
      <div style={{marginTop:'2%',marginLeft:'3%',fontSize:13}}>
        <Icon type="filter" /> <span>Lọc : </span>
        <select 
          style={{border:'1px solid #e2e2e2',borderRadius:5,height:35}}
          onChange={(e)=>this.onChangeFilter(e)}
          value={this.state.type_}
        >
          <option value={"all"}>Tất cả</option>          
          <option value={"unconfirmed"}>Chưa duyệt</option>
          <option value={"confirmed"}>Đã duyệt</option>
          <option value={"reported"}>Đã hủy</option>
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
      if(this.props.data && this.props.data.length >0)
      {
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
              <div style={{display:this.props.total_page?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{total_item>0?(total_item%itemsPerPage==0?total_item/itemsPerPage:parseInt(total_item/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
            return(
              <ItemDuyetCard 
                row={row} 
                key={index}
                index={index}
                duyet_card={this.props.duyet_card} 
                huy_duyet_card={this.props.huy_duyet_card} 
                get_card_list={this.props.get_card_list}
                onChangeNumber={(id)=>this.onChangeNumber(id)} 
                changed={this.state.changed}
                number={this.state.number} 

              />
            )
          }
        })
        contentList = (
          <div style={{overflow:'auto'}}>
            <h3 style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>Số lượng : {total_item}</h3>
            <table style={{marginLeft:'3%',marginTop:'1%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{fontSize:16,height:50,textAlign:'center',fontStyle:'bold'}} colSpan={10}>Danh sách duyệt thẻ</th>                  
                </tr> 
                <tr style={{background:'#ecf6fd',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Admin</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>User</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhà mạng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>NCC thẻ</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>Số lượng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>Số tiền</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chú thích</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>
                    <Link onClick={this.sortTime} style={{color:'rgba(0, 0, 0, 0.65)'}}>Ngày xin duyệt                           
                        {this.state.isSortTime?
                          ( <Icon style={{marginLeft: '5px'}} type={this.state.isSortTime? (this.state.sort_time=="desc"?"up-square-o":"down-square-o"):""}></Icon>):
                            <img src={require('images/sort.png')} style={{width:13,height:13,marginLeft:5}}/>}
                    </Link>
                  </th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày duyệt/hủy</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',width:100}} colSpan={1}>Trạng thái</th>
                                    
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
                <tr style={{background:'#ecf6fd',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Admin</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>User</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nhà mạng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>Số lượng</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'right',padding:5}}>Số tiền</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Chú thích</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày xin duyệt</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Ngày duyệt/hủy</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',width:100}} colSpan={1}>Trạng thái</th>                 
                </tr>  
                <tr style={{}}>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={10}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        {ncc_content}
        
        {filter}
        <div style={{marginLeft:'5%',width:'90%',height:(this.props.isDuyet||this.props.isHuy)?50:0}}>
          {waiting}
        </div>  
        {contentList}
        {page}
      </div>
    );
  }
}

DuyetCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  data: selectData(),
  isDuyet : selectIsDuyet(),
  isHuy: selectIsHuy(),
  isGetNCC : selectIsGetListNCC(),
  isChangeNCC : selectIsChangeNCCSuccess(),
  data_ncc : selectDataNCC(),
});

function mapDispatchToProps(dispatch) {
  return {
    get_card_list:(t)=>dispatch(get_card_list(t)),
    duyet_card:(id)=>dispatch(duyet_card(id)),
    get_card_list_success:(data)=>dispatch(get_card_list_success(data)),
    huy_duyet_card:(id)=>dispatch(huy_duyet_card(id)),
    get_list_ncc_card:()=>dispatch(get_list_ncc_card()),
    change_ncc_card:(id)=>dispatch(change_ncc_card(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DuyetCard);
