/*
 *
 * LucKyRotation
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  TimePicker
} from 'antd';
import {
  loadLuckyRolation,
  loadTyLeLuckyRolation,
  update,
} from './actions';
import {
  selectIsLoad,
  selectData,
  selectThaydoigiatrivongquay,
} from './selectors';
import ItemLucky from 'components/ItemLucky';
const format = 'HH:mm';

export class LucKyRotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      isMobile: false,   
      fdate : moment(),
      todate : moment(), 
      number :false,
      changed:false,
      activePage : 1,
      activePageTK : 1,
      isMobile: false,
      fromTime : "",
      toTime : "",
    };
  }
  changeTime=(time, timeString)=>{
    this.setState({fromTime:timeString.toString()})
  }
  changeToTime=(time, timeString)=>{
    this.setState({toTime:timeString})
  }
  updateDimensions() {
    if(window.innerWidth < 760) {
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
  onChangeTK = (page) => {
    this.setState({
      activePageTK: page,
    });
  }
  componentWillMount(){
 
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  componentDidMount=()=>{
    this.props.loadTyLeLuckyRolation();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    
  }
  
  onChangeDate=(date)=>{
    this.setState({fdate: date});
  }
  onChangeToDate=(date)=>{
    this.setState({todate: date});
  }
  convertDate = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date+" "+time ;
    return result;
  }
  onClick=()=>{
    var _fdate = false;
    var _todate= false;
    // console.log("Onclick")

    if(this.refs.fromDate.input.props.value.toString().trim() && this.refs.fromDate.input.props.value.toString().trim()!==""
      && this.refs.toDate.input.props.value.toString().trim() && this.refs.toDate.input.props.value.toString().trim()!==""){
        // console.log("Onclick--->")
      _fdate = this.refs.fromDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.fromTime;
      if(this.state.toTime){
        _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " " +this.state.toTime;
        
       }else{
        _todate = this.refs.toDate.input.props.value.toString().trim().split('/').reverse().join('/')+ " 23:59";
       }
      var fromDate = new Date(_fdate).getTime();
      var toDate = new Date(_todate).getTime();

      this.props.loadLuckyRolation(fromDate,toDate);
      this.setState({activePage:1})
      
    }else{
      _date = false;
      _todate = false;
      message.error('Ngày chưa được chọn !');
    }

  }
  onClickTyLe=(id)=>{
    // var temp = ;
    // console.log("ip",this.state.number)
    // console.log("id",id)
    this.props.update(id,this.state.number)
  }
  onChangeNumber=(id)=>{
    // console.log("onChangeNumber --> : ",id)
    this.setState({number : id})
    this.setState({changed : true})
    
  }
  render() {

    var search_content = false;
    var content = false;
    var contentGetThaydoigiatrihu = false;
    var total_item = 0;
    var total_itemtk = 0;
    var itemsPerPage = 10;
    var page = false;    
    var pageTK = false;    
    search_content = (
      <div>
        <table style={{marginLeft:'5%',marginTop:'1%'}}>
          <tbody>
            <tr>
              <td>
                <div>
                  <span style={{fontWeight: "bold",fontSize: "15px"}}>Ngày bắt đầu: </span>
                  <DatePicker
                    ref="fromDate"
                    selected={this.state.fdate}
                    onChange={this.onChangeDate}
                    customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                    dateFormat="DD/MM/YYYY"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={5}
                    isClearable={false}
                    placeholderText="Từ ngày"
                    withPortal
                    maxDate={moment()}
                  />
                </div>
              </td>
              <td>  
                <div>
                  <span style={{fontWeight: "bold",fontSize: "15px"}}>Giờ bắt đầu: </span>
                  <td>
                    <TimePicker 
                        defaultValue={moment('00:00', format)} 
                        format={format} 
                        placeholder="Nhập giờ"
                        style={{height:35,width:120}}
                        onChange={this.changeTime}
                    />
                  </td>  
                </div>
              </td> 
              <td style={{width:5}}/>
              </tr>
              <tr style={{height:10}} />
              <tr>
              <td>
                <div>
                  <span style={{fontWeight: "bold",fontSize: "15px"}}>Ngày kết thúc: </span>
                  <DatePicker
                    ref="toDate"
                    selected={this.state.todate}
                    onChange={this.onChangeToDate}
                    customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white'}}/>}
                    dateFormat="DD/MM/YYYY"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={5}
                    isClearable={false}
                    placeholderText="Đến ngày"
                    withPortal
                    maxDate={moment()}
                  />
                </div>
              </td>
              <td>  
                <div>
                  <span style={{fontWeight: "bold",fontSize: "15px"}}>Giờ kết thúc: </span>
                  <td>
                    <TimePicker 
                        defaultValue={moment('23:59', format)} 
                        format={format} 
                        placeholder="Nhập giờ"
                        style={{height:35,width:120}}
                        onChange={this.changeToTime}
                    />
                  </td>  
                </div>
              </td> 
              <td style={{width:5}}/>
              <td style={{verticalAlign: 'bottom'}}>
                <Button style={{marginRight:20,width:35,height:35}} onClick={this.onClick} icon="search"></Button>
              </td>
            </tr>  
          </tbody>
        </table>
        
      </div>           
    )
    if(this.props.isLoad){
      content = (
        <center>
          <img src={require('images/loading.gif')} style={{width:100,height:100}}/>
        </center>  
      )
    }else{
      var item = false;
      var itemGetThaydoigiatrivongquay = false;
      if(this.props.data && (this.props.data.length > 0 || this.props.data.size > 0)){
        // console.log("this.props.data: ",this.props.data)
        total_itemtk = this.props.data.length;
        pageTK =(
          <div style={{marginLeft: '5%',marginTop:'2%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_itemtk?total_itemtk:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePageTK}
                onChange={this.onChangeTK}
              />
              <div style={{display:total_item?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePageTK}/{total_itemtk>0?(total_itemtk%itemsPerPage==0?total_itemtk/itemsPerPage:parseInt(total_itemtk/itemsPerPage)+1):0}
  
              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.luongson1}</td>  
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.luongson2}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.luongson3}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.como1}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.como2}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.como3}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.caoboi1}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.caoboi2}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.caoboi3}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king1000}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king2000}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king5000}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king10000}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king20000}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king50000}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.king100000}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.truot}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.themLuot}</td> 
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{row.totalMoney}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>{this.convertDate(row.createTime)}</td> 
            </tr>
          )
        })
      }else{
        item = (
          <tr >
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan="20">
              Không có dữ liệu
            </td>
          </tr>
        )
      }
      if(this.props.Thaydoigiatrivongquay && (this.props.Thaydoigiatrivongquay.length > 0 || this.props.Thaydoigiatrivongquay.size > 0)){
        // console.log("this.props.data: ",this.props.data)
        total_item = this.props.Thaydoigiatrivongquay.length;
        page =(
          <div style={{margin: '3% 5%'}}>
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
        itemGetThaydoigiatrivongquay = this.props.Thaydoigiatrivongquay.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){
            return  (
                <ItemLucky 
                  row={row} key={index} 
                  update = {this.props.update} 
                  onChangeNumber={(id)=>this.onChangeNumber(id)} 
                  number={this.state.number} 
                  changed={this.state.changed}/>
            )
          }
        })
      }else{
        itemGetThaydoigiatrivongquay = (
          <tr >
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}} colSpan="6">
              Không có dữ liệu
            </td>
          </tr>
        )
      }
      content=(
        <table style={{marginLeft:'5%',width:'90%'}}>
        <tbody>
          <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Lương sơn 1</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Lương sơn 2</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Lương sơn 3</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Cổ mộ 1</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Cổ mộ 2</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Cổ mộ 3</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Cao bồi 1</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Cao bồi 2</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Cao bồi 3</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 1000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 2000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 5000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 10000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 20000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 50000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>K 100000</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Trượt</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Thêm lượt</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Tổng tiền</th>
            <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Ngày tạo</th>
          </tr>  
          {item}
        </tbody>
        </table>  
      )
      contentGetThaydoigiatrihu =(
        <table style={{marginLeft:'5%',width:'90%'}}>
          <tbody>
            <tr  style={{background:'rgb(236, 246, 253)',fontStyle:'italic'}}>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Name</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Max</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Value</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Approver</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>CreateTime</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center',padding:5}}>Action</th>
            </tr>  
            {itemGetThaydoigiatrivongquay}
          </tbody>
        </table>  
      )
    }

    return (
      <div>
        {search_content}
        <div style={{marginLeft:'5%',marginTop:'3%',width:'90%'}}><h2>Thông kê vòng quay may mắn</h2></div>
        <div style={{overflow:'auto',marginBottom:'2%'}}>
          {content}
        </div>
        {pageTK}        
        <div style={{marginLeft:'5%',marginTop:this.state.isMobile?'12%':'5%',width:'90%'}}><h2>Thay đổi giá trị cho vòng quay</h2></div>
        <div style={{overflow:'auto'}}>
         {contentGetThaydoigiatrihu}         
        </div>
        {page}
        
      </div>
    );
  }
}

LucKyRotation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoad: selectIsLoad(),
  data :selectData(),
  Thaydoigiatrivongquay :selectThaydoigiatrivongquay(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadLuckyRolation:(st,et)=>dispatch(loadLuckyRolation(st,et)),
    loadTyLeLuckyRolation:()=>dispatch(loadTyLeLuckyRolation()),
    update:(id,v)=>dispatch(update(id,v)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LucKyRotation);
