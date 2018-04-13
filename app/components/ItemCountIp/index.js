/**
*
* ItemCountIp
*
*/

import React from 'react';
// import styled from 'styled-components';


class ItemCountIp extends React.Component { 
  constructor(props){
    super(props);
    this.state={      
      activePage :1,   
      key : "",
      nickname : false,
      ip : "",
    };
  }
  onChange = (page) => {
    this.setState({
      activePage: page,
    });
  }
  render() {
    var content = false;
    var content2 = false;
    var item = false;
    var total_page = 0;
    var itemsPerPage = 10;
    var print = false;
    var page = false;
    
      if(this.props.data && (this.props.data.length >0 || this.props.data.size >0)){
        console.log("data:",this.props.data)
        total_page = this.props.data.length;
        page =(
          <div style={{margin: '2% 3%'}}>
            <div style={{display: 'inline-block'}}>
              <Pagination
                style={{display: 'inline-block'}}
                total={total_page?total_page:0}
                pageSize={itemsPerPage}
                defaultCurrent={1}
                current={this.state.activePage}
                onChange={this.onChange}
              />
              <div style={{display:total_page?"inline-block":'none',float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
                {this.state.activePage}/{total_page>0?(total_page%itemsPerPage==0?total_page/itemsPerPage:parseInt(total_page/itemsPerPage)+1):0}

              </div>
            </div>
          </div>
        )
        item = this.props.data.map((row,index)=>{
          if(index >= (this.state.activePage-1) *itemsPerPage && index < (this.state.activePage) *itemsPerPage ){ 
          return(
            <tr key={index}>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{index+1}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.username}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{row.agent}</td>
              <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>{this.convertDate(parseInt(row.time))}</td>
            </tr>
          )
        }
        })

        content=(
          <div style={{overflow:'auto'}}>
            
            <table style={{marginLeft:'3%',width:'95%',marginTop:20}}>
              <tbody style={{overflow:'auto'}} >
                <tr>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}} colSpan={3}><i>IP : {this.props.ip}</i></th>
                </tr>  
                <tr style={{overflow:'auto'}}>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Username</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>HĐH</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                               
                </tr>  
                {item}
              </tbody>  
            </table>  
          </div>
        )
      }else{
        
        content=(
          <div style={{overflow:'auto'}}>
            
           <table style={{marginLeft:'3%',width:'95%',marginTop:20}}>
             <tbody style={{overflow:'auto'}} >
               
               <tr style={{overflow:'auto'}}>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>STT</th>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Nickname</th>
               <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>HĐH</th>
                  <th style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'left',padding:5}}>Thời gian</th>
                             
               </tr>  
               <tr>
                 <td style={{height:40,border:'1px solid #e2e2e2',fontSize:13,textAlign:'center',padding:5}} colSpan={3}>Không có dữ liệu</td>
               </tr>  
             </tbody>  
           </table>  
         </div>
        )
       
      }
    
    return (
      <div>
        {content}
        {page}
      </div>
    );
  }
}

ItemCountIp.propTypes = {

};

export default ItemCountIp;
