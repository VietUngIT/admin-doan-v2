/**
*
* EditPrize
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
  TimePicker ,
  Select,
} from 'antd';

class EditPrize extends React.Component { 
  editPrize=()=>{
    if(this.refs.name.value.trim()!==""){
      this.props.edit_prize(this.props.row.id,this.refs.name.value.trim());
      this.props.cancel();
    }else{
      message.error('Nhập đầy đủ thông tin !');

    }
  }
  render() {
    return (
      <div style={{fontSize:13}}>
        
        <textarea rows="2" 
          style={{width:'100%',border:'1px solid #e2e2e2',fontSize:13,padding:5,borderRadius:5}} 
          placeholder="Nhập giải thưởng" ref="name" defaultValue={this.props.row.prize}/>
            <center>
                <Button type="primary" style={{marginTop:'2%'}} onClick={this.editPrize}>
                  Sửa 
                </Button>
                
            </center>
      </div>
    );
  }
}

EditPrize.propTypes = {

};

export default EditPrize;
