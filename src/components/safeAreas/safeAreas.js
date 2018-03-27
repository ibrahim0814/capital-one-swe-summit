//import react 
import React,{Component} from 'react';

//csv data from file
import csvdata from '../../assets/data';

//json of zipcodes and corresponding district 
import zipcodes from '../../assets/zipcodes';

//graph component for safe areas 
import SafeAreasGraph from './safeAreasGraph';

//useful methods for filtering data 
import {DefaultChartObject, BadValue} from '../usefulFunctions/functions'

class SafeAreas extends Component {

    //initial state -- graph obj 
    state = {
        scoreGraph: {}
    }

    componentDidMount(){

        //run promises for data, then put that data into map obj
        this.getDistrictScoreMap().then((map)=>{
            this.setScoreGraph(map);
        });
    }

    //create and return a map of zipcodes and their corresponding districts
    getZipcodeMap = () => {
        let map = new Map();

        //loop through, set in map 
        for(let i=0; i<zipcodes.length; i++){
            map.set(zipcodes[i].zipcode, zipcodes[i].district);
        }
        return map;
    }

    //get weighted value of dispatch
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

    //get a map with scores of all the districts
    getDistrictScoreMap = () =>{

        //returns promise 
        return new Promise((resolve, reject) =>{

            //get the zipcode map, set up total and district map
            let zipcodes = this.getZipcodeMap();
            let total = 0;
            let districts = new Map();

            //for valid values, get zipcode, and dispatch
            //determine district based on zipcode 
            //determine dispatch weight, set set in dispatch map
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
            //set up final score map -- basically invert values to show safest district
            let scoreMap = new Map();
            districts.forEach((value,key)=>{
                scoreMap.set(key,(1-value/total)*100);
            })
            
            //resolve with score map
            resolve(scoreMap);
        }) 
        
    }

    //set chart data obj for district scores 
    setScoreGraph = (map) => {

        //get default chart object 
        let chartSettings = DefaultChartObject();

        //import into chart settings 
        map.forEach((value, key) => {
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(value);
        });

        //initialize other settings, then set data 
        chartSettings.datasets[0].label = 'Safest Areas'
        this.setState({scoreGraph: chartSettings});
    }


    //render safest areas graph -- pass in data as prop
    render(){

        return (
            <SafeAreasGraph
                data = {this.state.scoreGraph}
            />
        );
    }




}

export default SafeAreas;