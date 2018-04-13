/**
*
* DiaLogCreateBot
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { message, } from 'antd';

class DiaLogCreateBot extends React.Component {


  addBot=()=>{

    this.props.createBot(document.getElementById("selectDomain").value);
    this.props.closeDialog()
  }


  render() {


    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={ this.addBot }
      />,

    ];

    var selectDomain = null;
    var namebot= null;
    if(!this.props.nameBotChange){
      namebot="";
    }else{
      namebot=this.props.nameBotChange;
    }

    if(this.props.domains && (this.props.domains.size>0 || this.props.domains.length>0)){
      selectDomain = this.props.domains.map((item,index) => {
        return (<option value={item.id} key={index}>{item.name}</option>);
      });
    }

    var content = null;
    content = (
      <div style={{width: '90%', minWidth: '60px', marginTop: '25px'}}>
        <div style={{float:'left', marginBottom: '5px'}}>Tên bot</div>
        <input type='text' placeholder='Nhập vào tên của Bot' value={namebot} onChange={this.props.changeNameBot} style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',marginBottom: '20px',padding: '3px'}}/>
        <div style={{float:'left', marginBottom: '5px'}}>Chọn Domain</div>

        <div>
          <select id="selectDomain" style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',padding: '5px'}}>
            {selectDomain}
          </select>
        </div>
      </div>
    )

    return (
      <div>
        <center>
        <Dialog
         title="Tạo bot mới"
         actions={actions}
         modal={false}
         open={this.props.open}
         onRequestClose={this.props.closeDialog}
         >
          <center style={{borderTop: '1px solid'}}>{content}</center>
       </Dialog>
       </center>
      </div>
    );
  }
}

DiaLogCreateBot.propTypes = {

};

export default DiaLogCreateBot;
