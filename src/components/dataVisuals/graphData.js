import React , {Component} from 'react';

//component imports 
import Graph from './graphs'
import {DefaultChartObject, BadValue} from '../usefulFunctions/functions'


//dataset 
const csvdata = require('../../assets/data');

class GraphData extends Component {

    state = {
        percentByCallTypeChart: {},
        numCallsByHourChart: {},
        avgResTimeChart: {},
    }

    constructor(){
        super();
        this.percentByCallTypeData().then((data)=>{
            this.percentByCallTypeChart(data);
        });

        this.numCallsByHourData().then((data)=>{
            this.numCallsByHourChart(data);
        });

        this.avgResTimeData().then((data) =>{
            this.avgResTimeChart(data);
        });
    }

    percentByCallTypeData = () =>{

        return new Promise((resolve, reject)=>{
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
            resolve(adjPer);
        })
    }

    percentByCallTypeChart = (map) => {
        let chartSettings = DefaultChartObject();
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });
        chartSettings.datasets[0].label = 'Call Type'
        chartSettings.datasets[0].backgroundColor = ['#1e4f80','#2a5682','#3873ae','#4690da','#6aa6e1','#90bce8','#b5d2f0']
        this.setState({percentByCallTypeChart: chartSettings});
    }

    numCallsByHourData = () => {

        return new Promise((resolve,reject)=>{
            let map = new Map();
            for(let i=0; i<csvdata.length;i++){
                let date = new Date(csvdata[i].received_timestamp)
                let hour = date.getHours()
                if(!map.has(hour)){
                    map.set(hour,1);
                }else{
                    map.set(hour,map.get(hour)+1);
                }
            }
            resolve(map);
        });
    }

    numCallsByHourChart = (map) => {
        
        let chartSettings = DefaultChartObject();
        for(let i=0; i<24; i++){
            chartSettings.labels.push(i);
            chartSettings.datasets[0].data.push(map.get(i));
        }
        chartSettings.datasets[0].label = 'Hour of Day'
        this.setState({numCallsByHourChart: chartSettings});
    }

    avgResTimeData = () => {

        return new Promise ((resolve, reject) => {
            let totals = new Map();
            let count = new Map();
            for(let i=0; i<csvdata.length; i++){
                let type = csvdata[i].call_type_group;
                let start = new Date(csvdata[i].received_timestamp);
                let end = new Date(csvdata[i].on_scene_timestamp);

                if(!isNaN(end) && type.length !== 0){
                    let diff = ((end.getTime()-start.getTime())/1000)/60;
                    if(!totals.has(type)){
                        totals.set(type,diff);
                        count.set(type,1);
                    }else{
                        totals.set(type,totals.get(type)+diff);
                        count.set(type,count.get(type)+1);
                    }
                } 
            }
            let avg = new Map();
            totals.forEach((value, key) =>{
                let num = count.get(key);
                let averageTime = value/num;
                avg.set(key,averageTime);
            });
            resolve(avg);
        })
    }

    avgResTimeChart = (map) => {

        let chartSettings = DefaultChartObject();
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });
        chartSettings.datasets[0].label = 'Call Group Type'
        this.setState({avgResTimeChart: chartSettings});
    }

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
export default GraphData;