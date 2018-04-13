/**
*
* DiaLogCreateBot
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { message } from 'antd';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

var warningText="";

class DiaLogCreateCategory extends React.Component {


  imageHandler=(e2)=>{
    var store = document.getElementById('imgstore');
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.replace(/data\:image\/png;base64,/, '');
    this.props.changeImage(dataInBase64);
  }

  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }

  createCategory=()=>{
    //message.error(content, duration, onClose)
    if(!this.props.createCategoriesName){
      message.error("Bạn phải nhập tên Category",5);
      console.log("Bạn phải nhập tên Category")
    }else{

      console.log("Đã tạo thành công")
      this.props.addCategory();
      message.success("Đã tạo thành công",10);
      this.props.closeDialog();
    }
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.createCategory}
      />,
    ];

    let valueNameCat=null;
    if(!this.props.createCategoriesName){
      valueNameCat="";
    } else {
      valueNameCat = this.props.createCategoriesName;
    }

    let valueDescCat=null;
    if(!this.props.createCategoriesDesc){
      valueDescCat="";
    } else {
      valueDescCat = this.props.createCategoriesDesc;
    }

    var content = null;
    content = (
      <div style={{width: '95%', minWidth: '60px', marginTop: '25px', display: 'flex'}}>
        <div style={{display:'inline-block', marginRight: '15px', width: '200px'}}>
          <img  height={200} width={200} style={{border: '1px solid #FF9800',}} id="imgstore" src={require('./add-image.jpg')} />
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            containerElement="label"
            backgroundColor="#1565C0"
            style={{marginTop: '10px'}}

          >
            <input type="file" id="imageCategory" onChange={(e)=>this.loadImage(e)} style={styles.exampleImageInput}/>
          </RaisedButton>
        </div>
        <div style={{flexGrow: 1}}>
          <div style={{float:'left', marginBottom: '5px'}}>Category name</div>
          <span style={{fontSize: '12px',color: 'red',float: 'right',paddingRight: '5px'}}>{this.props.createCategoriesName?"":"(*) Bạn phải nhập tên của Category"}</span>
          <input type='text' onChange={(e)=>this.props.changeNameCreateCat(e.target.value)} value={valueNameCat} placeholder='input name category' style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',marginBottom: '20px',padding: '3px'}}/>

          <div style={{float:'left', marginBottom: '5px'}}>Description</div>

          <div>
            <textarea rows="5" onChange={(e)=>this.props.changeDescCreateCat(e.target.value)} value={valueDescCat} placeholder='input description' style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',padding: '5px'}}/>
          </div>
        </div>
      </div>
    )

    return (
      <div >
        <Dialog
         title="Create Category"
         actions={actions}
         modal={false}
         open={this.props.open}
         onRequestClose={this.handleClose}

         >
          <center style={{borderTop: '1px solid'}}>{content}</center>
       </Dialog>
      </div>
    );
  }
}

DiaLogCreateCategory.propTypes = {

};

export default DiaLogCreateCategory;
