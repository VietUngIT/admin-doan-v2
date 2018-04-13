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
  inputBorder: {
    border: '1px solid #FF9800',
    width: '100%',
    borderRadius: '3px',
    marginBottom: '10px',
    padding: '3px',
  },
};

class DiaLogCreateProduct extends React.Component {





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
        onTouchTap={this.props.closeDialog}
      />,
    ];

    var content = null;
    content = (
      <div style={{width: '95%', minWidth: '60px', marginTop: '25px', display: 'flex'}}>
        <div style={{display:'inline-block', margin: '40px 15px 0 0', width: '200px'}}>
          <img  height={200} width={200} src={require('./add-image.jpg')} />
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            containerElement="label"
            backgroundColor="#1565C0"
            style={{marginTop: '10px'}}
          >
            <input type="file" style={styles.exampleImageInput}/>
          </RaisedButton>
        </div>

        <div style={{flexGrow: 1}}>
          <div style={{display: 'flex'}}>
            <div style={{marginRight: '20px', flexGrow: 1}}>
              <div style={{float:'left', marginBottom: '5px'}}>Product name</div>
              <input type='text' placeholder='input name product' style={styles.inputBorder}/>
            </div>
            <div style={{flexGrow: 1}}>
              <div style={{float:'left', marginBottom: '5px'}}>Code</div>
              <input type='text' placeholder='input code' style={styles.inputBorder}/>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <div style={{marginRight: '20px', flexGrow: 1}}>
              <div style={{float:'left', marginBottom: '5px'}}>Price</div>
              <input type='number' placeholder='input price' style={styles.inputBorder}/>
            </div>
            <div style={{flexGrow: 1}}>
              <div style={{float:'left', marginBottom: '5px'}}>Discount</div>
              <input type='number' placeholder='input discount' style={styles.inputBorder}/>
            </div>
          </div>

          <div style={{float:'left', marginBottom: '5px'}}>Description</div>
          <input type='text' placeholder='input description' style={styles.inputBorder}/>

          <div style={{float:'left', marginBottom: '5px'}}>Long description</div>
          <div>
            <textarea rows="4" placeholder='input long description' style={styles.inputBorder}/>
          </div>
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
         onRequestClose={this.handleClose}
         >
          <center style={{borderTop: '1px solid'}}>{content}</center>
       </Dialog>
       </center>
      </div>
    );
  }
}

DiaLogCreateProduct.propTypes = {

};

export default DiaLogCreateProduct;
