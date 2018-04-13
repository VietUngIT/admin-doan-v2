/*
 *
 * Banner
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
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
  selectIsLoading,
  selectData,
  selectIsDel,
  selectIsEdit,
  selectIsAdd,
  selectUrl,
  selectFileName,
  selectFile,
} from './selectors';
import {
  load_all_banner,
  add_banner,
  changeImage,
  del_banner,
  edit_banner,
  _img,
} from './actions';
import messages from './messages';
import ItemListBanner from 'components/ItemListBanner';
import AddBanner from 'components/AddBanner';

export class Banner extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {     
      activePage :1, 

      visible : false,
      show : false,
    }
  }
  componentDidMount=()=>{
    this.props.load_all_banner();
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
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
        title="Thêm banner"
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        >
          <AddBanner 
            url={this.props.url} 
            handleVisibleChange={this.handleVisibleChange}
            changeImage = {this.props.changeImage}
            add_banner = {this.props.add_banner}
            file = {this.props.file}
            fileName = {this.props.fileName}
            cancel = {this.handleCancel}
            _img = {this.props._img}
          />
        </Modal>
        <Button type="primary" onClick={this.showModal} style={{marginTop:"2%",marginLeft:'3%',height:35}}>Thêm banner</Button>
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
          
            return(
              <ItemListBanner 
                key={index} 
                row={row}
                del_Banner = {this.props.del_banner}
                edit_banner = {this.props.edit_banner}
                index={index+1}
              >
              </ItemListBanner>
            )
         
        });
        
        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Banner</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Url</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trạng thái</th>
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
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Banner</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trạng thái</th>
                  
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

Banner.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading : selectIsLoading(),
  isAdd : selectIsAdd(),
  isEdit : selectIsEdit(),
  isDel : selectIsDel(),
  data : selectData(),
  url : selectUrl(),
  fileName : selectFileName(),
  file : selectFile(),
});

function mapDispatchToProps(dispatch) {
  return {
    load_all_banner :()=>dispatch(load_all_banner()),
    add_banner :(u)=>dispatch(add_banner(u)),
    changeImage :(file,fileName,url)=>dispatch(changeImage(file,fileName,url)),
    edit_banner :(id,status,u)=>dispatch(edit_banner(id,status,u)),
    del_banner :(id)=>dispatch(del_banner(id)),
    _img:(img)=>dispatch(_img(img)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
