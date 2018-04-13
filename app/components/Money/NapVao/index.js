/**
*
* NapVao
*
*/

import React from 'react';
// import styled from 'styled-components';
import {
  Tabs,
  Input,
  Button,
  message,
  Pagination ,
  Dropdown,
  Modal,
} from 'antd';
import { Link,browserHistory } from 'react-router';

class NapVao extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <table style={{marginLeft:'5%',marginTop:'2%'}}>
          <tbody>
            <tr>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Nạp vào</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Số tiền nạp thành công</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Số tiền nạp lỗi</th>
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Doanh số thực tế</th>                
              <th style={{height:50,border:'1px solid #e2e2e2',fontSize:15,textAlign:'center'}}>Chi tiết </th>            
              
            </tr>  
            <tr >
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>SMS</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                <Link to={`/moneydetail/${this.props.un}-${this.props.st}-${this.props.et}-sms`}>Chi tiết</Link>
              </td>                
            </tr>
            <tr >
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Viettel</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                <Link to={`/moneydetail/${this.props.un}-${this.props.st}-${this.props.et}-card`}>Chi tiết</Link>
              </td>                
            </tr>
            <tr >
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>Megacard</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}></td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center'}}>
                <Link to={`/moneydetail/${this.props.un}-${this.props.st}-${this.props.et}-iap`}>Chi tiết</Link>
              </td>                
            </tr>
          </tbody>  
        </table>  
      </div>
    );
  }
}

NapVao.propTypes = {

};

export default NapVao;
