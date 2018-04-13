/*
 *
 * MessageTx
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {
  selectIsSuccessMes,
  selectIsSuccessBet,
  selectData,
  selectIsLoading,
} from './selectors';
import messages from './messages';
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
import {
  add_message,
  set_bet_sum,
  get_message,
  del_message,
  edit_message,
} from './actions';
import CurrencyInput from 'react-currency-input';
import ItemMgsTx from 'components/ItemMgsTx';
export class MessageTx extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      mgs : "",
      isMobile: false,
      m_value : "",
      type : 1,
      array_mgs :"",
      activePage :1, 
      checked : false,
      checkedAll : false,
      del : false,
      id : [],
      id_del : "",
      type_get :1,
      id_all :[],
      delAll : false,
    };
  }
  updateDimensions() {
    if(window.innerWidth < 1025) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }  
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
   
 
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.props.get_message(1);
    
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
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
  ok=()=>{
    if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
      this.state.id.map((row,index)=>{
        if(row !=="" && index < this.state.id.length-1){
          this.state.id_del += (row +",");
        }else{
          this.state.id_del += row;
        }
      })
      this.props.del_mesage(this.state.id_del);
      this.props.get_message(this.state.type_get);

    }
    this.cancel();
    this.setState({id:[]})
    this.setState({id_del:""})
    this.setState({checkedAll:false})
  }
  cancelAll=()=>{
    this.setState({
      delAll: false,
    });
  }
  cancel=()=>{
    this.setState({
      del: false,
    });
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
  showConfirm=()=>{
    if(this.state.id && (this.state.id.size>0 || this.state.id.length>0)){
      this.setState({
        del: true,
      });
    }else{
      message.warning("Chọn tin nhắn cần xóa !")
    }
   
  }
  showConfirmAll=()=>{
    
      this.setState({
        delAll: true,
      });
   
   
  }
  onChangeMess=(e)=>{
    // if(e.charCode==13){
      
    // }
    // console.log("e.charCode",e)
    this.setState({mgs:e.target.value});
  }
  handleChange=(event, maskedvalue, floatvalue)=>{
    this.setState({m_value: maskedvalue});
  }
  onClickBet=()=>{
    if(this.state.m_value){
      this.props.set_bet_sum(this.state.m_value.split(".").join(""));
    }else{
      message.error("Nhập đầy đủ thông tin !")
    }
  }

  onClick=(target)=>{
    if(this.refs.mess.value.trim() !==""){
      
      
      if(this.refs.mess.value.trim().split('\n').length >0){
        this.refs.mess.value.trim().split('\n').map((row,index)=>{
          if(row !=="" && index <this.refs.mess.value.trim().split('\n').length-1){
            this.state.array_mgs += (row +"-->");
          }else{
            this.state.array_mgs += row;
          }
        })
      }
      
      this.props.add_message(this.state.array_mgs,this.state.type);
      this.props.get_message(this.state.type_get?this.state.type_get:1);

      this.setState({array_mgs:[]})
    }else{
      message.error("Nhập đầy đủ thông tin !")
      
    }
  }
  onChangeType=(e)=>{
    this.setState({type:e.target.value});
  }
  onChangeTypeGet=(e)=>{
    this.setState({type_get:e.target.value});
    this.props.get_message(e.target.value);
    this.setState({
      id:[],
      id_del:"",
      checkedAll: false,
    })
  }
  onClickClear=()=>{
    this.refs.mess.value = "";
  }
  delAll=()=>{
    let id_del_all =[];
    let id_all= "";
    this.props.data.map((row,index)=>{
      id_del_all.push(row.id);
    })

    if(id_del_all && (id_del_all.size>0 || id_del_all.length>0)){
      id_del_all.map((row,index)=>{
        if(row !=="" && index < id_del_all.length-1){
          id_all += (row +",");
        }else{
          id_all += row;
        }
      })
      this.props.del_mesage(id_all);
      this.props.get_message(this.state.type_get);

    }
    this.cancelAll();
  }
  render() {
    var item = false;
    var total_page = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;
    var type_content = false;

    var contentAddBet = (
      <div style={{marginLeft:'3%',marginTop:'2%'}}>
        <span style={{fontSize:13,marginBottom:'3%'}}>Nhập lượng tiền cược:</span><br/>
        <CurrencyInput
          style={{height:35,width:200,marginRight:10,border:'1px solid #e2e2e2',textAlign:'right',padding:5,borderRadius:5}}
          value={this.state.m_value} 
          onChangeEvent={this.handleChange} 
          precision={0} 
          thousandSeparator={"."} />
        <Button icon="plus" style={{height:35,marginRight:20,marginTop:'1%'}} onClick={this.onClickBet}>Cập nhật</Button>            
      </div>  
    )
    var contentBetSuccess = false;
    var contentBetSuccess = false;
    var contentMesSuccess = false;

    var contentAdd = (
      <div style={{marginLeft:'3%',marginTop:'2%'}}>
        <span style={{fontSize:13,marginBottom:'3%'}}>Nhập message:</span><br/>
        <textarea rows="15" 
          style={{textAlign:'left',padding:5,width:this.state.isMobile?'95%':'80%',border:'1px solid #e2e2e2' ,borderRadius : 3}}
          ref="mess"  onChange={this.onChangeMess} placeholder="Nhập tin nhắn vào đây!"/><br/>
        <select id="type" onChange={(e)=>this.onChangeType(e)}                  
          style={{height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}>
          <option value={1} > Loại tin nhắn sau khi biết kết quả</option>
          <option value={0} > Loại tin nhắn khi đang chờ kết quả</option>                           
                            
        </select>  
        <br/>
        <Button icon="plus" style={{height:35,marginRight:20,marginTop:'1%'}} type="primary" onClick={this.onClick}>Thêm</Button>            
        <Button icon="delete" style={{height:35,marginRight:20,marginTop:'1%'}} type="danger" onClick={this.onClickClear}>Xóa hết</Button>            
      </div>  
    )

    var listMgs = false;
    if(this.props.isLoading){
      listMgs=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      type_content=(
        
        <div style={{marginTop:'5%',marginLeft:'3%',fontSize:13}}>
          <Icon type="filter" /> <span>Lọc : </span>
          <select id="type" onChange={(e)=>this.onChangeTypeGet(e)}  value={this.state.type_get}                
            style={{height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',marginBottom:10}}>
            <option value={1} > Loại tin nhắn sau khi biết kết quả</option>
            <option value={0} > Loại tin nhắn khi đang chờ kết quả</option>                           
                              
          </select> 
        </div>  
      )
      if(this.props.data && this.props.data.length>0){
        
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
        item=this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
           
            return(
              <ItemMgsTx row={row} index={index+1} key={index} del_mgs={this.props.del_mesage} edit_message={this.props.edit_message}
                type_get={this.state.type_get?this.state.type_get:1} get_message={this.props.get_message} changeChecked={this.changeChecked}
              />
            )
          }
        })

        listMgs = (
          <div style={{overflow:'auto'}}>
            {type_content} 
              
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
            <Button type="danger" style={{marginLeft:"3%",marginBottom:10}} onClick={this.showConfirm}>Xóa</Button>
            <Button type="danger" style={{marginLeft:"1%",marginBottom:10}} onClick={this.showConfirmAll}>Xóa hết</Button>
            <table style={{marginLeft:'3%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:18,textAlign:'center'}} colSpan={8}>Danh sách tin nhắn hiện có</th>                  
                </tr> 
                
                <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,width:"2%"}}>
                   <input checked={this.state.checkedAll} onChange={this.changeCheckedAll} ref="chkAll" type="checkbox"/>
                  </th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5,width:"2%"}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nội dung</th>
                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sửa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>                  
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        listMgs = (
          <div style={{overflow:'auto'}}>
            {type_content} 
              
            <table style={{marginLeft:'3%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{height:50,border:'1px solid #e2e2e2',fontSize:18,textAlign:'center'}} colSpan={8}>Danh sách tin nhắn hiện có</th>                  
                </tr> 
                <tr>
                  <td style={{height:50,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={8}>Không có dữ liệu</td>                  
                </tr> 
              </tbody>  
            </table> 
          </div>
        )
      }
    }
    return (
      <div>
        {contentAddBet}
        {contentAdd}
        
        {listMgs}
        {page}
      </div>
    );
  }
}

MessageTx.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isSuccessMes : selectIsSuccessMes(),
  isSuccessBet : selectIsSuccessBet(),
  isLoading : selectIsLoading(),
  data : selectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    add_message :(mgs,type)=> dispatch(add_message(mgs,type)),
    set_bet_sum :(bet)=>dispatch(set_bet_sum(bet)),
    get_message :(t)=>dispatch(get_message(t)),
    edit_message :(mgs,id)=>dispatch(edit_message(mgs,id)),
    del_mesage :(id)=>dispatch(del_message(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTx);
