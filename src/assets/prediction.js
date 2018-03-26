const brain = require('brain.js');
const csvdata = require('./data');
const fs = require('fs');

const network = new brain.NeuralNetwork();

let trainingArr = [];

for(let i =0; i<csvdata.length; i++){

    let disposition = csvdata[i].final_call_disposition;
    if(disposition !== 'No Merit' && disposition !== 'Unable to Locate' && disposition !== 'Cancelled' ){
        let date = new Date(csvdata[i].received_timestamp);
        let lat = (csvdata[i].latitude)/40;
        let long = (csvdata[i].longitude)/-150;
        let hour = date.getHours()/24;
        let min = date.getMinutes()/60;
        let unitType = csvdata[i].unit_type;
        
        let obj = {
            input: {lat: lat, long: long, hour: hour, min: min},
            output: {[unitType]: 1}
        }
        trainingArr.push(obj);
    }
}

network.train(trainingArr,{
    log: true,
});
let json = network.toJSON();
fs.writeFileSync('network2.json',JSON.stringify(json));