/*
 *
 * DaiLy
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker,
  Modal,
} from 'antd';
import {
  load_DL,
  update_DL,
  add_DL,
  del_DL,
  load_manager,
} from './actions';
import {
  selectIsLoading,
  selectData,
  selectIsUpdate,
  selectIsAdd,
  selectTotalPage,
  selectManager,
}from './selectors';
import messages from './messages';
import ItemDaiLy from 'components/ItemDaiLy';
import AddDaiLy from 'components/AddDaiLy';
export class DaiLy extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1, 
      checked : false,
      checkedAll : false,
      del : false,
      id : [],   
      display_button : false,   

      visible : false,
      show : false,

      name :false,
      phone :false,
      fb :false,
      address :false,
      nickname :false,

      changed : false,
    };
  
  }
  componentWillMount=()=>{
    this.props.load_DL(1);
  }
  componentDidMount=()=>{
    this.props.load_DL(1);
    
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
    this.props.load_DL(page);
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
  ok=()=>{
    if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
      this.props.del(this.state.id);      
    }
    if(this.props.isDeleteSuccess){
      
    }
    this.cancel();
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
  }
  showConfirm=()=>{
    this.setState({
      del: true,
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
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  // onChangeNickName=(id)=>{
  //   // console.log("onChangeNumber --> : ",id)
  //   this.setState({nickname : id})
  //   this.setState({changed : true})
    
  // }
  onChangeName=(name)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({nickname : name})
    this.setState({changed : true})
    
  }
  onChangePhone=(name)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({nickname : name})
    this.setState({changed : true})
    
  }
  onChangeFB=(name)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({nickname : name})
    this.setState({changed : true})
    
  }
  onChangeAddress=(name)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({nickname : name})
    this.setState({changed : true})    
  }
  changeRouter=(id)=>{
    this.props.changeRoute(id);
  }
  render() {
    var contentList = false;
    var item = false;
    var total_item = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;
    var addNotifi = false;
    var updateNotifi = false;

    // if(this.props.isAdd){
    //   addNotifi = message.warning("Đang xử lý !");
    // }

    // if(this.props.isUpdate){
    //   updateNotifi = message.warning("Đang xử lý !");
    // }

    var addContent = (
      <div>  
        <Modal
        title="Thêm đại lý"
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        >
          <AddDaiLy addDL={this.props.add_DL} handleCancel={this.handleCancel} handleVisibleChange={this.handleVisibleChange}/>
        </Modal>
        <Button type="primary" onClick={this.showModal} style={{marginTop:"2%",marginLeft:'3%',height:35}}>Thêm đại lý </Button>
      </div>  
    )
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
              <ItemDaiLy 
                push = {this.changeRouter}
                key={index} 
                row={row}
                update = {this.props.update_DL}
                onChangeName={(id)=>this.onChangeName(id)} 
                onChangePhone={(id)=>this.onChangePhone(id)} 
                onChangeFB={(id)=>this.onChangeFB(id)} 
                onChangeAddress={(id)=>this.onChangeAddress(id)} 
                del_DL = {this.props.del_DL}
                nickname={this.state.nickname} 
                changed={this.state.changed}
                manager = {this.props.manager}
                load_manager = {this.props.load_manager}
              >
                
              </ItemDaiLy>
            )
         
        });
        
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{height:50,fontSize:18,textAlign:'center'}} colSpan={8}>Danh sách đại lý</th>                  
                </tr>  
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Tên</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>SĐT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Facebook</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Địa chỉ</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Người quản lý</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sửa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>                  
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
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={5}>Danh sách đại lý</th>                  
                </tr>  
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Tên</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Nickname</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>SĐT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Facebook</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Địa chỉ</th>
                </tr>  
                <tr>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={5}>Không có dữ liệu</td>
                </tr>  
              </tbody>  
            </table>  
          </div>
        )
      }
    }
    return (
      <div>
        {addNotifi}
        {updateNotifi}
        {/* {addContent} */}
        {contentList}
        {page}
      </div>
    );
  }
}

DaiLy.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  data: selectData(),
  isAdd : selectIsAdd(),
  isUpdate : selectIsUpdate(),
  total_page : selectTotalPage(),
  manager : selectManager(),
});

function mapDispatchToProps(dispatch) {
  return {
    load_DL:(page)=>dispatch(load_DL(page)),
    load_manager:()=>dispatch(load_manager()),
    changeRoute: (url) => dispatch(push(url)),
    update_DL:(na,p,a,f,nn,ma)=>dispatch(update_DL(na,p,a,f,nn,ma)),
    add_DL:(na,p,a,f,nn)=>dispatch(add_DL(na,p,a,f,nn)),
    del_DL:(nn)=>dispatch(del_DL(nn)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DaiLy);
