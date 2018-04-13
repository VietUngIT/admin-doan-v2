/**
*
* DetailDau
*
*/

import React from 'react';
// import styled from 'styled-components';


class DetailDau extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <table style={{width:'100%'}}>
        <tbody>
          <tr style={{background:'#ecf6fd'}}>
            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Tên game </th>
            <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5,fontStyle:'italic'}}>Số lượng tài khoản chơi </th>      
            
          </tr> 
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Lương sơn</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.luongson}</td>
          </tr>  
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cao bồi</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.caoboi}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cổ mộ</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.como}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Tiến lên</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.tienlen}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Sâm</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.sam}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Mậu binh</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.maubinh}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Ba cây</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.bacay}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Liêng</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.lieng}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Poker</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.poker}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Bài cao</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.baicao}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Xóc xóc</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.xocxoc}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Tài xỉu</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.taixiu}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Quán ăn</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.quanan}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Mini poker</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.minipoker}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Cao thấp</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.caothap}</td>
          </tr>
          <tr>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>Bầu cua</td>
            <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}}>{this.props.row.baucua}</td>
          </tr>
        </tbody>  
      </table>  
    );
  }
}

DetailDau.propTypes = {

};

export default DetailDau;
