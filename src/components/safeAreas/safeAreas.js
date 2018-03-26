import React,{Component} from 'react';
import csvdata from '../../assets/data';
import zipcodes from '../../assets/zipcodes';

import SafeAreasGraph from './safeAreasGraph';

import {DefaultChartObject, BadValue} from '../usefulFunctions/functions'

class SafeAreas extends Component {

    state = {
        scoreGraph: {}
    }

    constructor(){
        super();
        this.getDistrictScoreMap().then((map)=>{
            this.setScoreGraph(map);
        });
    }

    getZipcodeMap = () => {
        let map = new Map();
        for(let i=0; i<zipcodes.length; i++){
            map.set(zipcodes[i].zipcode, zipcodes[i].district);
        }
        return map;
    }

    getDispatchValue = (unit) => {

        if(unit === 'CHIEF'){
            return 1.38;
        }else if(unit === 'ENGINE'){
            return 40.55;
        }else if(unit === 'INVESTIGATION'){
            return 0;
        }else if(unit === 'MEDIC'){
            return 34.84;
        }else if(unit === 'PRIVATE'){
            return 13.11;
        }else if(unit === 'RESCUE CAPTAIN'){
            return 4.67;
        }else if(unit === 'RESUCUE SQUAD'){
            return 1.78;
        }else if(unit === 'SUPPORT'){
            return .04;
        }else if(unit ==='TRUCK'){
            return 3.59;
        }else{
            return 0;
        }
    }

    getDistrictScoreMap = () =>{

        return new Promise((resolve, reject) =>{
            let zipcodes = this.getZipcodeMap();
            let total = 0;
            let districts = new Map();
            for(let i=0; i<csvdata.length; i++){
                let disposition = csvdata[i].final_call_disposition;
                if(!BadValue(disposition)){
                    let zipcode = csvdata[i].zipcode_of_incident;
                    let dispatch = csvdata[i].unit_type;
                    let weight = this.getDispatchValue(dispatch);
                    total+=weight;
                    let district = zipcodes.get(zipcode);
                    if(!districts.has(district)){
                        districts.set(district,weight);
                    }else{
                        districts.set(district,districts.get(district)+weight);
                    }
                }

            }
            let scoreMap = new Map();
            districts.forEach((value,key)=>{
                scoreMap.set(key,(1-value/total)*100);
            })
            console.log(scoreMap);
            resolve(scoreMap);
        }) 
        
    }

    setScoreGraph = (map) => {
        let chartSettings = DefaultChartObject();
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });
        chartSettings.datasets[0].label = 'Safest Areas'
        this.setState({scoreGraph: chartSettings});
    }


    render(){

        return (
            <SafeAreasGraph
                data = {this.state.scoreGraph}
            />
        );
    }




}

export default SafeAreas;