/**
*
* Ccu
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Tabs,
         Input,
         Button,
       } from 'antd';
import DateTimeField from 'react-bootstrap-datetimepicker';
import { createStructuredSelector } from 'reselect';
import {onchange_stime,
  onchange_etime,
  search_current,
  search_history,
} from 'containers/CcuTab/actions';
import {Bar,Line,Pie} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {withRouter} from 'react-router' ;
// import 'chartjs-plugin-datalabels';

// import {AreaChart} from 'react-easy-chart';
class Ccu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      chartCCu:false,
      chartHis :false,
      isMobile: false,
      
    };
  }
  
  updateDimensions() {
    if(window.innerWidth < 760) {
     this.setState({isMobile: true,});
    } else {
     this.setState({isMobile: false,});
    }
  }
  
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillReceiveProps(nextProps){
    if(this.props.ccuLog != nextProps.ccuLog){
    
      if(nextProps.ccuLog && nextProps.ccuLog.length >0){
        let labels =[];
        let datasets =[];
        let data_ccu =[];
        nextProps.ccuLog.map((row,index)=>{
          return (
            labels.push(this.convertTime(row.date))
          )
          
        })
        nextProps.ccuLog.map((row,index)=>{
          return (
            data_ccu.push(
              row.ccu ,               
            
            )
          )
         
        })
        datasets.push(
          {
            label:"Ccu ",
            data:data_ccu,
            backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              pointBorderWidth:5,
              pointBorderHeight:5,
              pointBackgroundColor:'rgba(0,0,0,0.4)',
              pointStyle:"rectRounded",
              hoverBackgroundColor: 'rgba(255,99,100,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
            fill : false,
          },
         
        )
        this.setState({chartCCu:{labels,datasets}})
        
      }   
    }
    if(this.props.ccuHis != nextProps.ccuHis){
      if(nextProps.ccuHis && nextProps.ccuHis.length >0){
        let labels =[];
        let datasets =[];
        let dataHis =[];
        let length = nextProps.length; 
        nextProps.ccuHis.map((row,index)=>{
          
          labels.push(this.convertTime(row.date))
          
        })
        nextProps.ccuHis.map((row,index)=>{
          
          dataHis.push(
            row.ccu,               
          
          )
        })
        datasets.push(
         
          {
            label:"Ccu ",
            data:dataHis,
            backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              pointBorderWidth:5,
              pointBorderHeight:5,
              pointBackgroundColor:'rgba(0,0,0,0.4)',
              pointStyle:"rectRounded",
              hoverBackgroundColor: 'rgba(255,99,100,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
            fill : false,
          },
        )
        this.setState({chartHis:{labels,datasets}})
      } 
    }
         
    
  }
  
  convertTime = (time) => {
    var d = new Date(time),
    yyyy = d.getFullYear()% 100,
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),
    second = ('0' + d.getSeconds()).slice(-2),
    
    result, time;
    time = hh + ':' + min + ":"+second;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result = date+"\n"+time ;
    return result;
  }

  render() {
    
    var content1 =false;
    var content2 = false;
    var table=false;
    var step = 1;
    var font = 12;
    if(!this.state.isMobile){
      step = 1;
      
    }else{
      step = 5 ;
    }
    var chartOptions= {	
    	scales: {
    		  yAxes: [{
          		ticks: {
                  suggestedMin: 0,
                  suggestedMax: 5,
                  beginAtZero:true,
                  stepSize: {step}
              },
              labelOffset: 1,
              stacked: true,
          }],
          xAxes: [{
            ticks: {
                fontSize: 10
            }
        }]
         
      },
      options: {
        legend: {
            labels: {
                defaultFontSize: 10
            }
        }
    }
  }
  if(this.state.chartCCu ){
    content1=(
      <div style={{width:'90%',height:'100%',border:'1px solid #ccc',padding:'1%',marginLeft:'2%',marginBottom:'2%'}}>
         <Line
          data={this.state.chartCCu}
          options={chartOptions} 
          />
        <h3 style={{textAlign:'center'}}>  Lượng người truy cập hiện tại </h3>
      </div>
    )
  }else{
    content1=(<h3 style={{textAlign:'center'}}> Không có lượng người truy cập hiện tại </h3>)
    
  }
  if(this.state.chartHis){
    content2=(
      <div style={{width:'90%',border:'1px solid #ccc',padding:'1%',marginLeft:'2%'}}>
        <Line
          data={this.state.chartHis}
          options={chartOptions}
        />
        <h3 style={{textAlign:'center'}}> Lượng người truy cập trong ngày  </h3>
      </div>
    )
  }else{
    content2=(<h3 style={{textAlign:'center'}}> Không có lượng người truy cập trong ngày </h3>)
    
  }  
    
    
    return (
      
            <div style={{marginTop:'2%',marginLeft:'3%'}}>
              {content1}
              {/* {content2} */}
            </div>  
          
    );
  }
}

Ccu.propTypes = {

};
const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    search_history:()=> dispatch(search_history()),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ccu));
