import React, {Component} from 'react';

import csvdata from '../../assets/data';
import zipcodes from '../../assets/zipcodes';

import {DefaultChartObject, BadValue} from '../usefulFunctions/functions'


import DispatchGraph from './dispatchGraph';

class TimeToDispatch extends Component {

    state = {
        dispatchGraphData: {}
    }

    constructor(){
        super();
        this.getDispatchLength().then((map)=>{
            this.dispatchGraph(map);
        })
    }

    getZipcodeMap = () => {
        let map = new Map();
        for(let i=0; i<zipcodes.length; i++){
            map.set(zipcodes[i].zipcode, zipcodes[i].district);
        }
        return map;
    }

    getDispatchLength = () =>{
        return new Promise((resolve, reject) =>{
            let zipcodeMap = this.getZipcodeMap();
            let count = new Map();
            let totals = new Map();
            for(let i=0; i<50; i++){
                let disposition = csvdata[i].final_call_disposition;
                if(!BadValue(disposition)){
                    let zipcode = csvdata[i].zipcode_of_incident;
                    let district = zipcodeMap.get(zipcode);
                    let start = new Date(csvdata[i].entry_timestamp);
                    let end = new Date(csvdata[i].dispatch_timestamp);

                    if(!isNaN(end) && zipcode !== 94134){
                        let diff = ((end.getTime()-start.getTime())/1000)/60;
                        if(!count.has(district)){
                            count.set(district,1);
                            totals.set(district,diff)
                        }
                        else{
                            count.set(district,count.get(district)+1);
                            totals.set(district,totals.get(district)+diff);
                        }
                    }
                }
            }
            let avgs = new Map();
            totals.forEach((value,key)=>{
                let average = value/count.get(key);
                avgs.set(key,average);
            });
            resolve(avgs);
        }) 
    }

    dispatchGraph = (map) =>{
        let chartSettings = DefaultChartObject();
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });
        chartSettings.datasets[0].label = 'Dispatch Times'
        this.setState({dispatchGraphData: chartSettings});
    }

    render(){
        return( 
        <div>
            <DispatchGraph 
                data = {this.state.dispatchGraphData}
            />
        </div>
        )
    }
}

export default TimeToDispatch;