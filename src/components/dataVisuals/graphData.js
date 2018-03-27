//import react 
import React , {Component} from 'react';

//component imports -- graph, along with some helpful functions
import Graph from './graphs'
import moment from 'moment';
import {DefaultChartObject, BadValue} from '../usefulFunctions/functions'

//dataset 
const csvdata = require('../../assets/data');

class GraphData extends Component {

    //current state of this class - holds chart data objects for 3 charts 
    state = {
        percentByCallTypeChart: {},
        numCallsByHourChart: {},
        avgResTimeChart: {},
    }

    componentWillMount(){

        //run series of promises, then use that data to create a graph object x3

        //call type percent chart 
        this.percentByCallTypeData().then((data)=>{
            this.percentByCallTypeChart(data);
        });

        //number of calls per hour chart
        this.numCallsByHourData().then((data)=>{
            console.log(data);
            this.numCallsByHourChart(data);
        });

        //avg resp time chart 
        this.avgResTimeData().then((data) =>{
            this.avgResTimeChart(data);
        });
    }

    //gets data for call percents chart
    percentByCallTypeData = () =>{

        //returns promise 
        return new Promise((resolve, reject)=>{

            //loop through csv 
            //map call types with count
            let map = new Map();
            let total = 0;
            for(let i=0; i<csvdata.length;i++){
                if(!BadValue(csvdata[i].call_final_disposition)){
                    let call_type = csvdata[i].call_type;
                    if(!map.has(call_type)){
                        map.set(call_type,1);
                    }else{
                        map.set(call_type, map.get(call_type)+1);
                    }
                    total++;
                }
            }

            //create new map for percentages
            //if a % value is <1%, then group into 'other category
            let adjPer = new Map();
            map.forEach((value,key)=>{
                let per = (value/total)*100;
                if(per >= 1){
                    adjPer.set(key,per);
                }else{
                    if(!adjPer.has('Other')){adjPer.set('Other',per);}
                    else{adjPer.set('Other', adjPer.get('Other')+per);}
                }
            })

            //resolve promise with map of percentages
            resolve(adjPer);
        })
    }

    //creates chart object using map of call type percentages
    percentByCallTypeChart = (map) => {

        //import default chart obj 
        let chartSettings = DefaultChartObject();

        //for each call type, push key and value into chart object 
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });

        //initialize chart object with settings, then set state
        chartSettings.datasets[0].label = 'Call Type'
        chartSettings.datasets[0].backgroundColor = ['#1e4f80','#2a5682','#3873ae','#4690da','#6aa6e1','#90bce8','#b5d2f0']
        this.setState({percentByCallTypeChart: chartSettings});
    }

    //gets map of number of calls by hour 
    numCallsByHourData = () => {

        //returns promise
        return new Promise((resolve,reject)=>{

            //for every call, get the hour value
            //then push into map of hours and count
            let map = new Map();
            for(let i=0; i<csvdata.length;i++){
                
                let originalDate = csvdata[i].received_timestamp;
                let dateSubstring = originalDate.substring(0,23);
                let date = moment.utc(dateSubstring);
                let hour = date.hour();
                if(!map.has(hour)){
                    map.set(hour,1);
                }else{
                    map.set(hour,map.get(hour)+1);
                }
            }
            //resolve map of number of calls by hour
            resolve(map);
        });
    }

    //creates chart object for number of calls by hour
    numCallsByHourChart = (map) => {
        
        //import default chart obj
        let chartSettings = DefaultChartObject();

        //push values into object from map
        for(let i=0; i<24; i++){
            chartSettings.labels.push(i);
            chartSettings.datasets[0].data.push(map.get(i));
        }

        //initialize some settings, then set state 
        chartSettings.datasets[0].label = 'Hour of Day'
        this.setState({numCallsByHourChart: chartSettings});
    }

    //get avg response time map for call group types 
    avgResTimeData = () => {

        //returns promise 
        return new Promise ((resolve, reject) => {

            //create map of totals and counts (so we can take avg)
            let totals = new Map();
            let count = new Map();

            //loop through csv data, filter out bad values
            for(let i=0; i<csvdata.length; i++){
                let type = csvdata[i].call_type_group;
                let originalStart = csvdata[i].received_timestamp;
                let originalEnd = csvdata[i].on_scene_timestamp;
                let startSub = originalStart.substring(0,23);
                let endSub = originalEnd.substring(0,23);
                let start = moment.utc(startSub);
                let end = moment.utc(endSub);

                if(!isNaN(end) && type.length !== 0){
                    
                    //keep adding to count and totals based on call group types
                    let diff = end.diff(start)/1000/60;
                    if(!totals.has(type)){
                        totals.set(type,diff);
                        count.set(type,1);
                    }else{
                        totals.set(type,totals.get(type)+diff);
                        count.set(type,count.get(type)+1);
                    }
                } 
            }

            //calculate map of avg times (divide totals by count)
            let avg = new Map();
            totals.forEach((value, key) =>{
                let num = count.get(key);
                let averageTime = value/num;
                avg.set(key,averageTime);
            });

            //resolve with map of avg times
            resolve(avg);
        })
    }

    //create chart obj for avg resp time 
    avgResTimeChart = (map) => {

        //import default chart obj
        let chartSettings = DefaultChartObject();

        //push values into chart obj
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });

        //initialize settings, then set state 
        chartSettings.datasets[0].label = 'Call Group Type'
        this.setState({avgResTimeChart: chartSettings});
    }

    //render the three graphs, pass data as props
    render(){
        return(
            <div>
                <Graph
                percentByCallTypeChart = 
                {this.state.percentByCallTypeChart}

                numCallsByHourChart = 
                {this.state.numCallsByHourChart}

                avgResTimeChart = 
                {this.state.avgResTimeChart}
                />
            </div>
        );
    }
}

//export component
export default GraphData;