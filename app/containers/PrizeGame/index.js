/*
 *
 * PrizeGame
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPrizeGame, { selectData, selectIsLoading } from './selectors';
import messages from './messages';
import { get_prize, edit_prize, del_prize, add_prize } from './actions';
import ItemPrize from 'components/ItemPrize';
import AddPrize from 'components/AddPrize';
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
import { Link,browserHistory } from 'react-router';
import { selectEventName } from '../EventParent/selectors';
import { get_event_name } from '../EventParent/actions';

export class PrizeGame extends React.Component { 
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
    this.props.get_prize(this.props.params.eid);
    // this.props.get_event_name(this.props.params.ename)
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
        title="Thêm giải thưởng"
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        >
          <AddPrize 
            add_prize={this.props.add_prize}
            cancel={this.handleCancel}
            id_e={this.props.params.eid}
          />
        </Modal>
        <Link to="/event-game"><Button style={{marginTop:"2%",marginLeft:'3%',height:35}}>Quay lại</Button></Link>
        
        <Button type="primary" onClick={this.showModal} style={{marginTop:"2%",marginLeft:'3%',height:35}}>Thêm giải thưởng</Button>
        
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
              <ItemPrize 
                key={index} 
                row={row}
                del_prize = {this.props.del_prize}
                index={index+1}
                edit_prize={this.props.edit_prize}
                get_event_name = {this.props.get_event_name}
              >
              </ItemPrize>
            )
          }
        })

        contentList = (
          <div style={{overflow:'auto'}}>

            <table style={{marginLeft:'3%',marginTop:'2%',width:'95%'}}>
              <tbody style={{overflow:'auto'}} >
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'bold'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} colSpan={5}>Sự kiện : {this.props.params.ename}</th>
                </tr>
                <tr style={{overflow:'auto',fontStyle:'italic'}}>
                
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Top</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Giải thưởng</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sửa</th>               
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
                <tr style={{overflow:'auto',background:'rgb(236, 246, 253)',fontStyle:'bold'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} colSpan={5}>Sự kiện : {this.props.params.ename}</th>
                </tr>
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Top</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Giải thưởng</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Xóa</th>                  
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Sửa</th>                    
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
        {/* Su kien {this.props.event_name} */}
        {addContent}
        {contentList}
        {page}
      </div>
    );
  }
  
}

PrizeGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  isLoading : selectIsLoading(),
  event_name : selectEventName(),
});

function mapDispatchToProps(dispatch) {
  return {
    get_prize:(id)=>dispatch(get_prize(id)),
    edit_prize:(id,prize)=>dispatch(edit_prize(id,prize)),
    add_prize:(id,top,prize)=>dispatch(add_prize(id,top,prize)),
    del_prize:(id)=>dispatch(del_prize(id)),
    get_event_name:(name)=>dispatch(get_event_name(name)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrizeGame);
