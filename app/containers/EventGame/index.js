/*
 *
 * EventGame
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectIsLoading, selectData } from './selectors';
import messages from './messages';
import { get_even, add_even, edit_even, del_even } from './actions';
import ItemEventGame from 'components/ItemEventGame';
import AddEventGame from 'components/AddEventGame';
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
import { get_event_name, get_even_parent } from '../EventParent/actions';
import { selectDataParent, selectIsLoadingParent } from '../EventParent/selectors';

export class EventGame extends React.Component { 
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
    this.props.get_even();
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
    var page = false;
    var addContent = (
      <div>  
        <Modal
        title="Thêm sự kiện"
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        >
          <AddEventGame 
            add_even={this.props.add_even}
            cancel={this.handleCancel}
          />
        </Modal>
        <Button type="primary" onClick={this.showModal} style={{marginTop:"2%",marginLeft:'3%',height:35}}>Thêm sự kiện</Button>
      </div>  
    )
    if(this.props.isLoading){
      contentList=(
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      if(this.props.data && this.props.data.length>0){
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
        item =this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
            return(
              <ItemEventGame 
                key={index} 
                row={row}
                del_event = {this.props.del_even}
                index={index+1}
                edit_even={this.props.edit_even}
                get_event_name={this.props.get_event_name}
                get_even={this.props.get_even}
              >
              </ItemEventGame>
            )
          }
        })

        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Game</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Sự kiện</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Số lượng</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Bắt đầu</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Kết thúc</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trạng thái</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sửa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Giải thưởng</th>                  
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
                <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Game</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sự kiện</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Bắt đầu</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Kết thúc</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Trạng thái</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sửa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Chi tiết</th>   
                </tr>
                <tr>
                  <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan={9}>Không có dữ liệu</td>
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

EventGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  // data: selectDataParent(),
  data: selectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    get_even:()=>dispatch(get_even()),
    // get_even:()=>dispatch(get_even_parent()),
    add_even:(gn,ne,st,en,count)=>dispatch(add_even(gn,ne,st,en,count)),
    edit_even:(id,ne,st,en,status)=>dispatch(edit_even(id,ne,st,en,status)),
    del_even:(id)=>dispatch(del_even(id)),
    get_event_name:(name)=>dispatch(get_event_name(name)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventGame);
