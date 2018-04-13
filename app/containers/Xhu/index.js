/*
 *
 * Xhu
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { selectIsLoading, selectData, selectIsSuccess } from './selectors';
import { load_list, add_xhu, del_xhu } from './actions';
import AddXhu from 'components/AddXhu';
import ItemListHu from 'components/ItemListHu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
const format = 'HH:mm';
import { Tabs,
  Input,
  Button,
  message,
  Pagination ,
  TimePicker ,
  Select,
  Modal,
} from 'antd';
import { routerActions } from 'react-router-redux/lib';
export class Xhu extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : moment(),
      fromTime : "",
      show : false,
      activePage : 1,
    }
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
    // if(this.props.isSuccess){
    //   this.setState({
    //     show: false,
    //   });
    // }else{
    //   this.setState({
    //     show: true,
    //   });
    // }
    this.setState({
          show: false,
        });
    
  }
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });     
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  convertDate (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    result = time ;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date +" "+time;
    return result;
  }

  search=()=>{
    var _date = false;
  
    if(this.refs.inputDate.input.props.value.toString().trim() && this.refs.inputDate.input.props.value.toString().trim()!=="")
    {
      _date = this.refs.inputDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 00:00";
    }else{
      _date = false;
       message.error('Ngày chưa được chọn !');
    }
    if(_date){
      var someDate = new Date(_date).getTime();
      this.props.load_list(someDate);
   }
   
  }

  componentWillMount=()=>{
    this.props.load_list();
    
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  convertDateTime = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date + " "+time;
    return result;
  }
  render() {
    var search=(
      <table style={{marginLeft:'3%',marginTop:'2%'}}>
        <tbody>
          <tr>
            <td>Ngày bắt đầu</td>
            <td></td>
          </tr> 
          <tr>
             
            <td>
                <DatePicker
                    style={{color:'red', }}
                    ref="inputDate"
                    selected={this.state.dateMoney}
                    onChange={this.onChangeDate}
                    customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                    dateFormat="DD/MM/YYYY"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={5}
                    isClearable={false}
                    placeholderText="Ngày bắt đầu"
                    withPortal
                    // maxDate={moment()}
                  />
              </td>
              <td>    
                <Button onClick={this.search} icon="search" style={{height:35,width:35}}              
                />  
            </td>  
          </tr>  
        </tbody>  
      </table>
    )
    var addContent = (
      <div>  
        <Modal
        title="Thêm sự kiện X hũ"
        style={{width:500,height:300}}
        width = {600}
        visible={this.state.show}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        >
          <AddXhu 
            handleCancel = {this.handleCancel}
            add_xhu = {this.props.add_xhu}
            isSuccess = {this.props.isSuccess}
          />
        </Modal>
        <Button type="primary" onClick={this.showModal} style={{marginTop:"2%",marginLeft:'3%',height:35}}>Thêm sự kiện</Button>
      </div>  
    )

    var itemsPerPage = 10;
    var total_item = 0;  
    var page = false;
    var contentList = false;


    if(this.props.data && this.props.data.length>0){
      var event100=[];
      var event1000=[];
      var event10000=[];
      var item = false;
      
        total_item = this.props.data.length;
            page=(
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
              <ItemListHu 
                row={row}
                key={index+1}
                index={index}
                add_xhu = {this.props.add_xhu}
              />
            )
            
          }
        })
        contentList =(
          <div style={{overflow:'auto'}}>
            <table style={{marginTop:'2%',width:'95%',marginLeft:'3%'}}>
              <tbody>
                <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'left',padding:5}}>Thời gian </th>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'left',padding:5}}>Tên sự kiện</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={3}>
                    Số lượng hũ giải thưởng
                  </th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={3}>
                    Số lượng hũ thường
                  </th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={3}>Giá trị X hũ</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'center',padding:5}}>Trạng thái</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'right',padding:5}}></th>
                </tr> 
                <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderTop:'',fontSize:13,textAlign:'left',padding:5}}/>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderTop:'',fontSize:13,textAlign:'left',padding:5}}/>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderTop:'',fontSize:13,textAlign:'left',padding:5}}/>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>100 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>1000 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>10.000 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>100 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>1000 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>10.000 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>100 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>1000 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>10.000 king</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',borderTop:'',fontSize:13,textAlign:'left',padding:5}}/>

                  <th style={{height:40,border:'1px solid #e2e2e2',borderTop:'',fontSize:13,textAlign:'left',padding:5}}/>
                  
                </tr>   
                    
                {item}
                  
              </tbody> 
            </table>
          </div>  
        )
              
     
    }else{
      contentList =(
        <table style={{marginTop:'2%',width:'95%',marginLeft:'2%'}}>
          <tbody>
            <tr style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'left',padding:5}}>Thời gian </th>
              <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'left',padding:5}}>Tên game</th>
              <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'left',padding:5}}>Tên sự kiện</th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} >
                Số lượng hũ
              

              </th>
              <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} >Giá trị X hũ</th>
              <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'center',padding:5}}>Trạng thái</th>
              <th style={{height:40,border:'1px solid #e2e2e2',borderBottom:'',fontSize:13,textAlign:'right',padding:5}}></th>
            </tr>  
            <tr>
              <td  colSpan={7} style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Không có dữ liệu</td>
            </tr>  
          </tbody> 
        </table>
      )
    }

    return (
      <div>

        <Button onClick={this.props.load_list} style={{marginTop:'2%',marginLeft:'3%',height:35}} type="primary">Refresh</Button>
        <h3 style={{marginTop:'2%',marginLeft:'3%'}}>Danh sách event X hũ </h3>
        
        {contentList}
        {page}
      </div>
    );
  }
}

Xhu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading : selectIsLoading(),
  isSuccess : selectIsSuccess(),
  data : selectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    load_list:()=>dispatch(load_list()),
    add_xhu:(ne,gn,day,hu100,hu1000,hu10000,x100,x1000,x10000,active)=>dispatch(add_xhu(ne,gn,day,hu100,hu1000,hu10000,x100,x1000,x10000,active)),
    del_xhu:(id)=>dispatch(del_xhu(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Xhu);
