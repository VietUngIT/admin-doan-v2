/*
 *
 * SlotGameById
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectSlotGameById from './selectors';
import messages from './messages';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
} from 'antd';
import {

} from './actions';
import {

}from './selectors';
export class SlotGameById extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateMoney : false,      
      todateMoney : false,     
      sid : false,
      
    };
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onChangeToDate = this.onChangeToDate.bind(this);
 
  }
 
  onChangeDate=(date)=>{
    this.setState({
      dateMoney: date,
    });
     
  }
  onChangeToDate=(date)=>{
    this.setState({
      todateMoney: date,
    });
     
  }
  onChangeInput=(k)=>{
    this.setState({
      sid: k.target.value,
    });
  }
  render() {
    var table=false;
    return (
      <div style={{width:'100%',height:'100%'}}>
          <table style={{marginLeft:'10%',marginTop:'3%'}}>
            <tr>
              <td>
                <DatePicker
                  style={{color:'red', }}
                  ref="fromDate"
                  selected={this.state.dateMoney}
                  onChange={this.onChangeDate}
                  customInput={<Input  style={{width:'80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày bắt đầu"
                />
              </td>  
              <td>
                <DatePicker
                  ref="toDate"
                  selected={this.state.todateMoney}
                  onChange={this.onChangeToDate}
                  customInput={<Input  style={{width: '80%',height:'35px',border:'1px solid #e2e2e2',borderRadius:'5px',background:'white',flex: 1}}/>}
                  dateFormat="DD/MM/YYYY"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  isClearable={false}
                  placeholderText="Ngày kết thúc"
                />
              </td>
            </tr>
            <tr style={{height:10}}>
              <td colSpan={2}/>
            </tr>
            <tr>
              <td>
              <Input placeholder="Nhậ­p Slot Id" style={{height:35,width:120}} 
                ref="Input"
                onChange={this.onChangeInput}/>
              </td>
              <td>
                <Button icon="search" style={{height:35,width:35}} onClick={this.onClick}/>

              </td>
            </tr>    
          </table>           
         
          <div style={{height:'100%'}} >
            {table}
          </div>
        </div> 
    );
  }
}

SlotGameById.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SlotGameByID: makeSelectSlotGameById(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlotGameById);
