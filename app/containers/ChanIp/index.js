/*
 *
 * ChanIp
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectData, selectIsLoading } from './selectors';
import messages from './messages';
import { load_ip, add_ip, del_ip } from './actions';
import ItemIp from 'components/ItemIp';
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
export class ChanIp extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1, 

      visible : false,
      show : false,
      ip :"",
      reason :"",
    }
  }
  componentWillMount=()=>{
    this.props.load_ip();
  }
  onChangeIp=(e)=>{
    this.setState({ip:e.target.value.trim()})
    // console.log(e.target.value)
  }
  onChangeReason=(e)=>{
    this.setState({reason:e.target.value})
    // console.log(e.target.value)
    
  }
  add=()=>{
    if(this.state.ip !=="" && this.state.reason !==""){
      this.props.add_ip(this.state.ip,this.state.reason)
    }
    this.handleCancel();
    this.setState(
      {ip :"",reason :""}
    )
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
    });
  }
  render() {
    var contentList = false;
    var item = false;
    var total_item = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;

    var addContent = (
      <div>  
        <Modal
        title="Thêm IP"
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        >
          <Input placeholder="Nhập IP" onChange={this.onChangeIp} style={{height:35,width:'95%',border:'1px solid #e2e2e2',borderRadius:5}} value={this.state.ip}/>
          <textarea rows="3" placeholder="Nhập lý do chặn" onChange={this.onChangeReason} style={{width:'95%',border:'1px solid #e2e2e2',marginTop:10,borderRadius:5,padding:5}} value={this.state.reason}/>
          <center><Button onClick={this.add} style={{height:35}} type="primary">Lưu</Button></center>
        </Modal>
        <Button type="primary" onClick={this.showModal} style={{marginTop:"2%",marginLeft:'3%',height:35}}>Thêm IP</Button>
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
              <ItemIp 
                key={index} 
                row={row}
                del_ip = {this.props.del_ip}
                index={index+1}
              >
              </ItemIp>
            )
          }
        });
        
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>IP</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Admin</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chú thích</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Ngày</th>
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
                <tr style={{fontSize:14,background:"rgb(236, 246, 253)",fontStyle:'italic',fontStyle:'italic'}}>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>IP</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Admin</th>                  
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chú thích</th>
                <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>   
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
        {addContent}
        {contentList}
        {page}
      </div>
    );
  }
}

ChanIp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  isLoading : selectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    load_ip:()=>dispatch(load_ip()),
    add_ip:(ip,reason)=>dispatch(add_ip(ip,reason)),
    del_ip:(ip)=>dispatch(del_ip(ip)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChanIp);
