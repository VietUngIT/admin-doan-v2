/*
 *
 * Message
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import {
  selectData,
  selectIsGetAll,
  selectIsSendAll,
  selectIsSendSome,
  selectCheckDeleteMsg,
  selectSuggestData,
} from './selectors';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Popover,
  Modal,
  Dropdown,
  Icon,
  Select,
} from 'antd';
import {
  get_all_mess,
  send_all_mess,
  del_mess,
  send_some_mess,
  suggest_user_by_nickname,
} from './actions';
import {withRouter} from 'react-router' ;
const Option = Select.Option;
import styled from 'styled-components';

const span_ = styled.span`
  color: #e2e2e2;
  background : #ecf6fd;
 &:hover {
   color: #8f4c14;
  } `;
export class Message extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      show : false,
      checked : false,
      checkedAll : false,
      del : false,
      id : [],
      isSome : 'none',
      activePage : 1,
      nn : [],
      list :false,
      key :"",
      temp :"",
      delAll : false,
    };
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  componentDidMount(){
    this.props.get_all_mess();
  }
  componentWillMount(){
    this.props.get_all_mess();
    this.props.suggest_user_by_nickname("n");
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.isDeleteSuccess!==nextProps.isDeleteSuccess && nextProps.isDeleteSuccess===true){
      this.setState({
        id:[],
        checkedAll: false,
      })
      var i;
      for(i=0;i<document.getElementsByClassName("chk").length;i++){
        document.getElementsByClassName("chk")[i].checked = false
        
      }
    }
  }
  showModal = () => {
    this.setState({
      show: true,
    });
  }
  showConfirm=()=>{
    if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
      this.setState({
        del: true,
      });
    }else{
      message.warning("Chọn tin nhắn cần xóa !")
    }
   
  }
  ok=()=>{
    if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
      this.props.del_mess(this.state.id);
    }
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  handleOk = (e) => {
    this.setState({
      show: false,
    });
  }
  handleCancel = () => {
    this.setState({
      show: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  changeChecked=(e)=>{
    if(e.target.checked){
      this.setState({id:this.state.id.concat(e.target.value)})
    }else{
      this.setState({
        id:this.state.id.filter((item)=>{return item != e.target.value}),
        checkedAll: false,
      })

    }
  }
  changeCheckedAll=()=>{
    var i;
    var array = [];
    for(i=0;i<document.getElementsByClassName("chk").length;i++){
      document.getElementsByClassName("chk")[i].checked = !this.state.checkedAll;
      if(!this.state.checkedAll){
        array.push(document.getElementsByClassName("chk")[i].value);
      }
    }
    this.setState({id:array})
    this.setState({checkedAll:!this.state.checkedAll});
  }
  convertTime(time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date+' '+time ;
    return result;
  }
  formatCurency(price){
    var strPrice = price+'';
    var a = strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+ ' VNĐ';
    return a;
  }
  send=()=>{
    this.showModal();
    
    this.setState({isSome:'unset'})
  }
  sendAll=()=>{
    this.showModal();
    this.setState({isSome:'none'})
    
  }
  sendMess=()=>{
    if(this.state.isSome === "unset"){
      
      if(this.refs.tt.value.trim()!=="" && this.refs.mgs.value.trim()!=="" && this.state.nn.length>0){
          this.props.send_some_mess(this.state.nn,this.refs.tt.value.trim(),this.refs.mgs.value.trim());
          this.handleCancel();
          this.handleVisibleChange(false);
          // this.props.get_all_mess();
          this.clear();
      
      }else{
        message.error("Nhập đầy đủ nội dung !")
      }
    }else{
      if(this.refs.tt.value.trim()!=="" && this.refs.mgs.value.trim()!==""){
        var tt = this.refs.tt.value.trim();
        var mgs = this.refs.mgs.value.trim();
          this.props.send_all_mess(tt,mgs);    
          this.handleCancel();
          this.handleVisibleChange(false);
          // this.props.get_all_mess();
          this.clear();
      
      }else{
        message.error("Nhập đầy đủ nội dung-all !")
      }
    }
    

  }
  handleChange=(value)=>{
    if(value !==""){
      this.setState({key : value})      
      this.setState({temp : value})      
      // this.setState({nn:this.state.nn.concat(value)})
      this.props.suggest_user_by_nickname(value);
    }
   
    // this.setState({key : ""})      
    
  }
  onSelect=(value)=>{
    this.setState({key : value})      
    
  }
  okNN=()=>{
    var kq = false;
    if(this.state.nn.length==0){
      this.setState({nn:this.state.nn.concat(this.state.key)})

    }else{
      this.state.nn.map((r,index)=>{
        if(r !== this.state.key){
          kq = true;
        }else kq = false;
      })

      if(kq) this.setState({nn:this.state.nn.concat(this.state.key)})
      else message.warning("Nickname đã tồn tại !")
    }

    this.setState({key : ""})

  }
  delNN(r){
    this.setState({
      nn:this.state.nn.filter((item)=>{return item != r}),
    })
  }
  clear=()=>{
    this.refs.tt.value = "";
    this.refs.mgs.value = "";
    this.setState({nn : []});
  }
  showConfirmAll=()=>{
    
    this.setState({
      delAll: true,
    });
 
  }
  cancelAll=()=>{
    this.setState({
      delAll: false,
    });
  }
  delAll=()=>{
    let id_del_all =[];
    let id_all= "";
    this.props.allMes.map((row,index)=>{
      id_del_all.push(row.id);
    })

    if(id_del_all && (id_del_all.size>0 || id_del_all.length>0)){
      
      this.props.del_mess(id_del_all);

    }
    this.cancelAll();
  }
  render() {
    var content = false;
    var lu_content = false;
    var page = false;
    var total_item=0;
    var itemsPerPage = 15;
    var allNotifi = false;
    var someNotifi = false;
    var waiting = false;
    if(this.props.isSendAll || this.props.isSendSome || this.props.isDeleteSuccess){
      waiting=(
        <center>
          <div>Đang xử lý</div>
          <img src={require('images/loading1.gif')} style={{width:50,height:25}}/>
        </center>  
      )
    }
    var menu = (
      <ul style={{ border: "1px solid #e2e2e2",borderRadius: 5,width: 150,background: "#f7f7f7",color: "#404040"}} prefixCls ="">
        <li key="1" onClick={this.sendAll} style={{padding:10,background:'#e2e2e2'}}>Gửi cho toàn bộ user</li>
        <li key="2" onClick={this.send} style={{padding:10}}> Gửi cho 1 vài user </li>
      </ul>  
    )
    var options_suggest = false;     
    const children = [];
    if(this.props.suggest_data){
    
        options_suggest = this.props.suggest_data.map((r,index)=>{    
          children.push(          
               <Option 
                 key={r} 
                 value={r}                  
                 style={{background:''}}
               >
                 {r} 
               </Option>              
             )        
          })
     
       
    }else{
      
    }
    var manager = (
      <div style={{display:'flex'}}>
        <Select
          mode="combobox"
          value={this.state.key}
          style={{ flex : 15 }}
          placeholder="Chọn nickname cần gửi thư"
          onChange={this.handleChange}
          onSelect={this.onSelect}

          tokenSeparators={[',']}
          ref="suggest"
        >
          {children}
        </Select>
        <Button type="primary" style={{marginLeft:10,flex :1}} onClick={this.okNN}>OK</Button>
      </div>
    )
    if(this.props.isGetAll){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.allMes && this.props.allMes.length>0){
        total_item = this.props.allMes.length;
        
        var item = false;
        item =this.props.allMes.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                <input value={row.id}  onChange={(e)=>this.changeChecked(e)} className="chk" type="checkbox" />
              </td>
              <td style={{height:40,width:200,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',paddingLeft:5}}>{row.title}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',paddingLeft:5}}>{row.msg}</td>
              <td style={{height:40,width:300,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertTime(row.updateTime)}</td>
            </tr>  
          )
        }
        })
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
        content=(
          <table style={{width:'95%',marginLeft:'3%',marginRight:'3%',height:'100%',marginTop:'2%'}}>
            <tbody>
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,width:100,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>
                  <input checked={this.state.checkedAll} onChange={this.changeCheckedAll} ref="chkAll" type="checkbox"/>
                </th>
                <th style={{height:50,width:200,border:'1px solid #e2e2e2',fontSize:15,textAlign:'left',paddingLeft:5}}>Tiêu đề</th>            
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'left',paddingLeft:5}}>Nội dung thư</th>
                <th style={{height:50,width:300,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày gửi</th>
                
              </tr>
              {item}
            </tbody>
          </table>
        
        )
       
      }else{
        content = (
          <table style={{width:'95%',marginLeft:'3%',marginRight:'3%',height:'100%',marginTop:'2%'}}>
            <tbody>
              <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                <th style={{height:50,width:100,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>
                  <input checked={this.state.checkedAll} onChange={this.changeCheckedAll} ref="chkAll" type="checkbox"/>
                </th>
                <th style={{height:50,width:200,border:'1px solid #e2e2e2',fontSize:15,textAlign:'left',paddingLeft:5}}>Tiêu đề</th>            
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'left',paddingLeft:5}}>Nội dung thư</th>
                <th style={{height:50,width:300,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày gửi</th>
                
              </tr>
              <tr>
                <td colSpan={4} style={{height:50,width:300,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Không có dữ liệu </td>
              </tr>  
            </tbody>
          </table>
        )
      }
     
    var item_list=false;
    if(this.state.nn.length>0){
      item_list=this.state.nn.map((row,index)=>{
        return(
         <li key={index} style={{background:'#ecf6fd',padding:5,marginRight:5,borderRadius:5,height:25,display:'block',float:'left',marginTop:5}}>
          {row}
          <Icon type="close" style={{fontSize:11,marginLeft:5}} onClick={(id)=>this.delNN(row)}/>
         </li>  
          // <span key={index} style={{background:'#ecf6fd',padding:5,marginRight:5,borderRadius:5,height:25}}>
          //   {row}
          //   <Icon type="close" style={{fontSize:11,marginLeft:5}} onClick={(id)=>this.delNN(row)}/>
          // </span>
          
        )
      })
     
    }else{
      item_list =(<span style={{color:'#e2e2e2'}}><i>Chưa chọn nickname !</i></span>)
    }
    lu_content = (
      // <textarea 
      //   rows="3" 
      //   style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,display:`${this.state.isSome}`}} 
      //   placeholder="Nhập danh sách người nhận : username1,username2,.." ref="lu"
        
      // />
      
      <div style={{border:'1px solid #e2e2e2',padding:10,display:'grid'}}>
        <div style={{marginBottom:10,fontSize:13}}>Danh sách user nhận thư</div>
        <ul style={{marginBottom:10,width:'100%'}}>{item_list}</ul>

        {manager}
      </div>    
    )
  }
    return (
      <div>
        <div style={{width:'95%',marginLeft:'3%'}}>
        <Modal
          title="Soạn tin nhắn"
          style={{width:500,height:300}}
          width = {600}
          visible={this.state.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5}} placeholder="Nhập tiêu đề thư" ref="tt"/>
            <textarea rows="4" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5}} placeholder="Nhập nội dung thư" ref="mgs"/>
            <div style={{display:`${this.state.isSome}`,}}>
             {lu_content}
            </div>
          
              <center>
                  <Button type="primary" style={{marginTop:'2%'}} onClick={this.sendMess}>
                    Gửi tin nhắn 
                  </Button>
              </center>
              
          </div>
        </Modal>
        <Dropdown overlay={menu} placement="topRight" trigger={['click']} >
          <Button type="primary" style={{marginTop:'2%'}}>
            Soạn tin nhắn <Icon type="down" />
          </Button>
        </Dropdown>
        <Modal
          
          width = {600}
          visible={this.state.del}
          onOk={this.ok}
          onCancel={this.cancel}
          footer={[
            <div>
              <Button type="primary" onClick={this.ok} style={{marginLeft:'1%'}}>Đồng ý</Button>
              <Button type="danger" onClick={this.cancel} style={{marginLeft:'1%'}}>Hủy</Button>
            </div>  
          ]}
        >
          Bạn có muốn xóa tin nhắn không ?
        </Modal>
        <Modal
                
                width = {600}
                visible={this.state.delAll}
                onOk={this.delAll}
                onCancel={this.cancelAll}
                footer={[
                  <div>
                    <Button type="primary" onClick={this.delAll} style={{marginLeft:'1%'}}>Đồng ý</Button>
                    <Button type="danger" onClick={this.cancelAll} style={{marginLeft:'1%'}}>Hủy</Button>
                  </div>  
                ]}
              >
                Bạn có muốn xóa <b>hết</b> tin nhắn không ?
              </Modal>

        <Button type="danger" style={{marginLeft:10}} onClick={this.showConfirm}>Xóa</Button>
        <Button type="danger" style={{marginLeft:"1%",marginBottom:10}} onClick={this.showConfirmAll}>Xóa hết</Button>
        
        </div>  
        <div style={{marginLeft:'5%',width:'90%',height:(this.props.isSendAll||this.props.isSendSome)?50:0}}>
          {waiting}
        </div>
        {content}
        {page}

      </div>
    );
  }
}

Message.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allMes: selectData(),
  isGetAll : selectIsGetAll(),
  isDeleteSuccess: selectCheckDeleteMsg(),
  isSendAll : selectIsSendAll(),
  isSendSome : selectIsSendSome(),
  suggest_data : selectSuggestData(),

});

function mapDispatchToProps(dispatch) {
  return {
    get_all_mess:()=> dispatch(get_all_mess()), 
    send_all_mess:(tt,mgs)=> dispatch(send_all_mess(tt,mgs)),   
    del_mess :(id)=> dispatch(del_mess(id)),
    send_some_mess :(lu,tt,mgs)=>dispatch(send_some_mess(lu,tt,mgs)),    
    suggest_user_by_nickname:(key)=>dispatch(suggest_user_by_nickname(key)),

    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
