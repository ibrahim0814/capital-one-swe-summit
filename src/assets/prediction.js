//This is the script I ran to train the neural network. 
//It filters data from the csv and feeds it into the network for it to train with

//imports - brain.js, csvdata, moment for dates, and fs for writing files
import brain from 'brain.js';
import csvdata from './data';
import fs from 'fs';
import moment from 'moment';

//new neural network
const network = new brain.NeuralNetwork();

//array for storing data points
let trainingArr = [];

//loop through valid data points
for(let i =0; i<csvdata.length; i++){

    //if disposition is not valid, don't include this point
    let disposition = csvdata[i].final_call_disposition;
    if(disposition !== 'No Merit' && disposition !== 'Unable to Locate' && disposition !== 'Cancelled' ){

        //get hour, mins, lat, lng values from csvdata 
        let dateSubstring = (csvdata[i].received_timestamp).substring(0,23);
        let date = moment.utc(dateSubstring);
        let lat = (csvdata[i].latitude)/40;
        let long = (csvdata[i].longitude)/-150;
        let hour = date.hour()/24;
        let min = date.minutes()/60;

        //get unit type
        let unitType = csvdata[i].unit_type;
        
        //put into an object, then push to training array 
        let obj = {
            input: {lat: lat, long: long, hour: hour, min: min},
            output: {[unitType]: 1}
        }
        trainingArr.push(obj);
    }
}

//train the neural network 
network.train(trainingArr,{
    log: true,
});

//export network into a json so that we can use it anywhere
let json = network.toJSON();
fs.writeFileSync('network2.json',JSON.stringify(json));