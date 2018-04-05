//This is the script I ran to train the neural network. 
//It filters data from the csv and feeds it into the network for it to train with

//imports - brain.js, csvdata, moment for dates, and fs for writing files
const brain = require('brain.js');
const csvdata = require('./data');
const fs = require ('fs');
const moment = require('moment');

//new neural network
let network = new brain.NeuralNetwork();

//array for storing data points
let trainingArr = [];

//loop through valid data points
for(let i =0; i<csvdata.length; i++){

    //if disposition is not valid, don't include this point
    const disposition = csvdata[i].final_call_disposition;
    if(disposition !== 'No Merit' && disposition !== 'Unable to Locate' && disposition !== 'Cancelled' ){

        //get hour, mins, lat, lng values from csvdata 
        const dateSubstring = (csvdata[i].received_timestamp).substring(0,23);
        const date = moment.utc(dateSubstring);
        const lat = (csvdata[i].latitude)/40;
        const long = (csvdata[i].longitude)/-150;
        const hour = date.hour()/24;
        const min = date.minutes()/60;

        //get unit type
        const unitType = csvdata[i].unit_type;
        
        //put into an object, then push to training array 
        const obj = {
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
const json = network.toJSON();
fs.writeFileSync('network2.json',JSON.stringify(json));