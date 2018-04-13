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

class DiaLogCreateSubCategory extends React.Component {



  imageHandler=(e2)=>{
    var store = document.getElementById('imgstoresubcat');
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.replace(/data\:image\/png;base64,/, '');
    this.props.changeImageCreateSubCat(dataInBase64);
  }

  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }

  submitSubCat=()=>{

    if(this.refs.nameSubCat.value.trim()==''){
      console.log('this.refs.nameSubCat.value')
    }else{
      let discount = null;
      if(this.refs.discountSubCat.value.trim()=='') discount = 0;
      else discount = this.refs.discountSubCat.value.trim();
      let cid = document.getElementById("selectCat").value;
      this.props.addSubCategory(cid,this.refs.nameSubCat.value.trim(),discount,this.refs.descSubCat.value.trim(),this.refs.longDescSubCat.value.trim());
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
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitSubCat}
      />,
    ];

    var dropdownCat = null;
    if(this.props.listCategories && (this.props.listCategories.size >0 || this.props.listCategories.length>0)){

            dropdownCat = this.props.listCategories.map((item, index) => {
                    return (<option value={item.cid} key={index}>{item.name}</option>)
                  })
        }

    var content = null;
    content = (
      <div style={{width: '95%', minWidth: '60px', marginTop: '25px', display: 'flex'}}>

        <div style={{display:'inline-block', margin: '20px 15px 0 0', width: '200px'}}>
          <img  height={200} width={200} id="imgstoresubcat" src={require('./add-image.jpg')} />
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            containerElement="label"
            backgroundColor="#1565C0"
            style={{marginTop: '10px'}}
          >
            <input type="file" onChange={(e)=>this.loadImage(e)} style={styles.exampleImageInput}/>
          </RaisedButton>
        </div>
        <div style={{flexGrow: 1}}>
          <div style={{float:'left', marginBottom: '5px'}}>SubCategory name</div>
          <input type='text' ref="nameSubCat" placeholder='input name subcategory' style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',marginBottom: '20px',padding: '3px'}}/>
          <div style={{display: 'flex'}}>
            <div style={{flexGrow: '2',marginRight: '20px'}}>
              <div style={{float:'left', marginBottom: '5px'}}>Discount</div>
              <input type='number' min='0' ref="discountSubCat" style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',marginBottom: '20px',padding: '3px'}}/>
            </div>
            <div style={{flexGrow: '1'}}>
              <div style={{float:'left', marginBottom: '5px'}}>Category</div>
              <select id="selectCat" style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',minWidth: '45px', marginRight: '10px', padding: '5px'}}>
                {dropdownCat}
              </select>
            </div>
          </div>
          <div style={{float:'left', marginBottom: '5px'}}>Description</div>
          <input type='text' ref="descSubCat" placeholder='input description' style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',marginBottom: '20px',padding: '3px'}}/>
          <div style={{float:'left', marginBottom: '5px'}}>Long description</div>
          <div>
            <div>
              <textarea rows="4" ref="longDescSubCat" placeholder='input long description' style={{border: '1px solid #FF9800',width: '100%',borderRadius: '3px',padding: '5px'}}/>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        <center>
        <Dialog
         title="Create SubCategory"
         actions={actions}
         modal={false}
         open={this.props.open}
         onRequestClose={this.handleClose}
         >
          <center style={{borderTop: '1px solid'}}>{content}</center>
       </Dialog>
       </center>
      </div>
    );
  }
}

DiaLogCreateSubCategory.propTypes = {

};


export default DiaLogCreateSubCategory;
