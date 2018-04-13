/*
 *
 * Notification
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
  selectIsDelSuccess,
} from './selectors';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Popover,
  Modal,
  Icon,
} from 'antd';
import {
  get_all_noti,
  add_noti,
  del_all_noti,
  edit_noti,
  del_noti,
} from './actions';
import {withRouter} from 'react-router' ;
const confirm = Modal.confirm;
export class Notification extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      show : false,
      del: false,
      edit : false,
      b_edit : "",
      id_edit : false,
      id :[],
      checkedAll : false,
      activePage : 1,
      delAll : false,

    };
  }
  componentDidMount(){
    this.props.get_all_noti();
  }
  componentWillMount(){
    //this.props.get_all_noti();
    
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
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  showModal = () => {
    this.setState({
      show: true,
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
      del: false,
      
    });
  }
  handleOkEdit = (e) => {
    this.setState({
      edit: false,
      show: false,
      
    });
  }
  handleCancelEdit = () => {
    this.setState({
      edit: false,
      del: false,
      show: false,
      
    });
  }
  Cancel=()=>{
    this.setState({
      del: false,
    });
  }
  ok=()=>{
  
      if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
        this.props.del_noti(this.state.id);
        this.Cancel();
      
      }else{
        message.warning("Chọn thông báo cần xóa !")
      }
    
      
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
    this.props.data.map((row,index)=>{
      id_del_all.push(row.id);
    })

    if(id_del_all && (id_del_all.size>0 || id_del_all.length>0)){
      
      this.props.del_noti(id_del_all);

    }
    this.cancelAll();
  }
  showDeleteConfirm=()=> {
    this.setState({
      del: true,
    });
  }
  AddNoti=()=>{
    // console.log("add",this.refs.et.value)
    if(this.refs.et.value.trim()!=="" && this.refs.b.value.trim()!==""){
      var et = this.refs.et.value.trim();
      var b = this.refs.b.value.trim();
      this.props.add_noti(b,et);
      this.props.get_all_noti();
      this.refs.et.value = "";
      this.refs.b.value = "";
      this.handleCancel();
      this.Cancel();

    }else{
      message.error("Nhập đầy đủ nội dung !")
    }
  }
  Edit=(id)=>{
    this.setState({
      edit: true,
    });
    this.props.data.filter((element)=>{
      if(element.id == id){
        this.setState({b_edit:element.notification})
        this.setState({id_edit:element.id})
      }
    })
  }
  editNoti=()=>{
    
    if(this.refs.b_edit.value.trim()!==""){
      
      this.props.edit_noti(this.state.id_edit,this.refs.b_edit.value.trim());
      this.handleCancelEdit();
    }else{
      message.error("Nhập đầy đủ nội dung !")
    
    }
  }
  onChangeEdit=(key)=>{
    this.setState({b_edit:key.target.value})
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
  render() {
    var content = false;
    var page = false;
    var total_item=0;
    var itemsPerPage = 15;
    
    if(this.props.isGetAll){
      content=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length>0){
        var item = false;
        total_item = this.props.data.length;
        item =this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                <input value={row.id}  onChange={(e)=>this.changeChecked(e)} className="chk" type="checkbox" />
              </td>
              
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',paddingLeft:5}}>{row.notification}</td>  
              <td style={{height:40,width:40,border:'1px solid #e2e2e2',fontSize:20,textAlign:'center'}}>
                <Icon type="edit" onClick={(id)=>this.Edit(row.id)}></Icon>
              </td>              
                          
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
              <tr>
                <th style={{height:50,width:40,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>
                  <input checked={this.state.checkedAll} onChange={this.changeCheckedAll} ref="chkAll" type="checkbox"/>
                </th>
                
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'left',paddingLeft:5}}>Thông báo</th>            
                <th style={{height:50,width:40,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}></th>            
              </tr>
              {item}
            </tbody>
          </table>
        )
      }else{
        content=(
          <table style={{width:'95%',marginLeft:'3%',marginRight:'3%',height:'100%',marginTop:'2%'}}>
            <tbody>
              <tr>
                <th style={{height:50,width:40,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>
                  <input checked={this.state.checkedAll} onChange={this.changeCheckedAll} ref="chkAll" type="checkbox"/>
                </th>
                
                <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'left',paddingLeft:5}}>Thông báo</th>            
                <th style={{height:50,width:40,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}></th>            
              </tr>
              <tr>
                <td colSpan={3} style={{height:50,width:40,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Không có dữ liệu </td>
              </tr>  
            </tbody>
          </table>
        )
      }
    }
    return (
      <div>
        <div style={{width:'95%',marginTop:'2%',marginLeft:'3%'}}>
        
        <Modal
          title="Thêm thông báo"
          style={{width:'50%',height:'10%'}}
          width = {600}
          visible={this.state.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5}} placeholder="Nhập dòng chữ cần chạy" ref="b"/>
            <input type="number" min={0} style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5}} placeholder="Nhập số ngày" ref="et"/>
            
            <center><Button type="primary" style={{marginTop:'2%'}} onClick={this.AddNoti}>Hoàn tất</Button></center>
            
          </div>
        </Modal>
        <Modal
          title="Sửa thông báo"
          style={{width:'50%',height:'10%'}}
          width = {600}
          visible={this.state.edit}
          onOk={this.handleOkEdit}
          onCancel={this.handleCancelEdit}
          footer={[]}
        >
          <div>
            <textarea rows="2" style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5}} placeholder="Nhập dòng chữ cần chạy" 
              ref="b_edit" value={this.state.b_edit} onChange={this.onChangeEdit}/>
            
            <center><Button type="primary" style={{marginTop:'2%'}} onClick={this.editNoti}>Sửa</Button></center>
            
          </div>
        </Modal>
        <div>
          <Button type="primary" onClick={this.showModal }>Thêm</Button>
          <Modal
          style={{width:500,height:300}}
          width = {600}
          visible={this.state.del}
          onOk={this.ok}
          onCancel={this.Cancel}
          footer={[
            <div>
              <Button type="primary" onClick={this.ok} style={{marginLeft:'1%'}}>Đồng ý</Button>
              <Button type="danger" onClick={this.Cancel} style={{marginLeft:'1%'}}>Hủy</Button>
            </div>  
          ]}
        >
          Bạn có muốn xóa thông báo không ?
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
                Bạn có muốn xóa <b>hết</b> thông báo không ?
              </Modal>
          <Button type="danger" onClick={this.showDeleteConfirm} style={{marginLeft:'1%'}}>Xóa</Button>
          <Button type="danger" style={{marginLeft:"1%",marginBottom:10}} onClick={this.showConfirmAll}>Xóa hết</Button>

        </div>
        </div>  
        {content}
        {page}
      </div>
    );
  }
}

Notification.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isGetAll: selectIsGetAll(),
  data : selectData(),
  isDeleteSuccess : selectIsDelSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    get_all_noti:()=>dispatch(get_all_noti()),
    add_noti:(b,et)=>dispatch(add_noti(b,et)),
    del_all_noti:()=>dispatch(del_all_noti()),
    del_noti :(id)=>dispatch(del_noti(id)),
    edit_noti :(id,b)=>dispatch(edit_noti(id,b)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification));
