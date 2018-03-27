//import react
import React, {Component} from 'react';

//import csv 
import csvdata from '../../assets/data';

//get zipcodes json
import zipcodes from '../../assets/zipcodes';

//useful data filter functions
import {DefaultChartObject, BadValue} from '../usefulFunctions/functions'

//graph that displays dispatch times by district 
import DispatchGraph from './dispatchGraph';

class TimeToDispatch extends Component {

    //initial state 
    state = {
        dispatchGraphData: {}
    }

    componentDidMount(){
        //run promises for dispatch times functions 
        this.getDispatchLength().then((map)=>{
            this.dispatchGraph(map);
        })
    }

    //get a map of all zipcodes and corresponding districts
    getZipcodeMap = () => {
        let map = new Map();
        //set district values for each zipcode 
        for(let i=0; i<zipcodes.length; i++){
            map.set(zipcodes[i].zipcode, zipcodes[i].district);
        }
        return map;
    }

    //gets avg dispatch time for each district 
    getDispatchLength = () =>{
        return new Promise((resolve, reject) =>{

            //get zipcode map, set up count and totals maps
            let zipcodeMap = this.getZipcodeMap();
            let count = new Map();
            let totals = new Map();

            //filter out bad values
            for(let i=0; i<50; i++){
                //for each valid value:
                //determine zipcode 
                //determine dispatch time 
                //set values for count and totals maps 
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

            //get map of avgs (totals/count) for each district
            let avgs = new Map();
            totals.forEach((value,key)=>{
                let average = value/count.get(key);
                avgs.set(key,average);
            });

            //resolve with map of avg times for each district
            resolve(avgs);
        }) 
    }

    //sets chart settings for avg dispatch time by district 
    dispatchGraph = (map) =>{

        //get default chart object 
        let chartSettings = DefaultChartObject();

        //set values for chart obj
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });
        
        //initialize other settings, then set state 
        chartSettings.datasets[0].label = 'Dispatch Times'
        this.setState({dispatchGraphData: chartSettings});
    }

    //render chart of avg dispatch times for each district -- pass data as props
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

//export component 
export default TimeToDispatch;