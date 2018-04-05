//import react 
import React, {Component} from 'react';

//ui components from semantic 
import {Message, Dropdown, Button,Input, Grid, Header, Segment} from 'semantic-ui-react';

//default chart o
import {DefaultChartObject} from '../usefulFunctions/functions'

//results graph from prediction output
import PredictionOutput from './predictionOutput';
import brain from 'brain.js';

//google geocode api 
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBIxRvkjRk7SlQeqioGNNGo9WbP6BtT4SQ'
  });

//json representation of neural network
const jsonNet = require('../../assets/network2');

//create neural network based on json data above -- don't have to re-train
const net = new brain.NeuralNetwork().fromJSON(jsonNet);

class Inputs extends Component{
    
    //initial state 
    state = {
        address: '2640 Steiner Street ',
        timeHour: 6,
        timeMins: 30,
        error: false,
        timePMorAM: 'PM',
        okayToGraph: false,
        graphData: {},
        submitted: {
            subAdd: '',
            subHour: '',
            subMins: '',
            subPMorAM: 'AM'
        }
        
    }

    //use geocode api to get lat/lng coordinates 
    geocodeAddress = () =>{

        //this is the data the user submitted
        const submitted = {
            subAdd: this.state.address,
            subHour: this.state.timeHour,
            subMins: this.state.timeMins,
            subPMorAM: this.state.timePMorAM
        }
        //set state of submitted data
        this.setState({submitted: submitted});

        //if hour or time values are bad, don't proceed, display error statement
        if(this.state.timeHour < 1 || this.state.timeHour > 12){
            this.errorMessageTrue();
            this.showGraphFalse();
        }else if(this.state.timeMins < 0 || this.state.timeMins > 59){
            this.errorMessageTrue();
            this.showGraphFalse();
        }else{

            //return promise with geocode results
            //if error, don't proceed, display error message
            return new Promise((resolve,reject) => {
                googleMapsClient.geocode({
                    address: this.state.address
                  }, (err, response) => {
                    if (!err) {
                        resolve(response);
                    }else{
                        this.errorMessageTrue();
                        this.showGraphFalse();
                    }
                  })
            }).then((response)=>{
                //once we get a response from google, verify results 
                this.verifyAddress(response.json.results);
            })
        }
    }

    //verify that the address is in SF
    verifyAddress = (geocodeResult) => {

        //if len is zero reject -- error
        if(geocodeResult.length === 0){
            this.errorMessageTrue();
            this.showGraphFalse();
        }else{

            //if short name for results is not SF -- reject
            const shortName = geocodeResult[0].address_components[3].short_name;
            if(shortName !== 'SF'){
                this.errorMessageTrue();
                this.showGraphFalse();
            }else{
                this.errorMessageFalse();

                //if address and time are valid, then process geometry
                this.processResults(geocodeResult[0].geometry.location);
            }
        }
    }

    //create graph data based on dispatch type and probability
    createGraphData = (obj) =>{

        //get default chart obj
        let chartSettings = DefaultChartObject();

        //push data to chart obj
        Object.keys(obj).forEach((key, index) =>{
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(obj[key]*100);
        })

        //initialize settings, then push to state, then set show graph to true 
        chartSettings.datasets[0].label = 'Unit Type';
        this.setState({graphData: chartSettings});
        this.showGraphTrue();
    }

    //process lat,lng coordinates and time through neural network to get dispatch
    processResults = (geometry) => {
        //get hour, mins, lat, lng values
        let hour = this.state.timeHour -1;
        const lat = geometry.lat;
        const lng = geometry.lng;
        const min = this.state.timeMins;
        if(this.state.timePMorAM === 'PM'){
            hour+=12;
        }

        //run through neural network 
        const result = net.run({lat: lat/40, long: lng/-150, hour: hour/24, min: min/60});

        //create graph based on results from neural network 
        this.createGraphData(result);
    }

    //show graph
    showGraphTrue = () =>{
        this.setState({okayToGraph: true});
    }

    //don't show graph
    showGraphFalse = () =>{
        this.setState({okayToGraph: false});
    }

    //show error 
    errorMessageTrue = () => {
        this.setState({error: true});
    }

    //don't show error 
    errorMessageFalse = () => {
        this.setState({error: false});
    }

    //update address 
    updateAddress = (event) => {
        this.setState({address: event.target.value});
    }

    //update hours 
    updateHours = (event) =>{
        this.setState({timeHour: event.target.value});
    }

    //update mins 
    updateMins = (event) =>{
        this.setState({timeMins: event.target.value});
    }

    //update if time is pm or am
    updatePMorAM = (event,{name, value}) =>{
        this.setState({[name]: value});

    }

    //return a message component with the error message
    getErrorMessage = () =>{
        if(this.state.error === true){
            return (<Message
                warning
                header='Looks like there might be an error!'
                list={[
                'Make sure the address that you entered is a valid, San Francisco address with a zipcode & building number',
                'Make sure you entered a valid number for Hours (1-12) and Minutes (0-59)'
                ]}
            />);
        }
        return <div></div>
    }

    //get chart component
    getChart = () => {
        let chart = <div></div>

        //check if its okay to show graph
        if(this.state.okayToGraph){

            //from the map we map, get the most likely dispatch 
            const labels = this.state.graphData.labels;
            const data = this.state.graphData.datasets[0].data;
            let max = 0;
            let index = 0;

            //iterate through, find max in probability
            for(let i =0; i<data.length; i++){
                if(data[i]>max){
                    max = data[i];
                    index = i;
                }
            }
            const dispatch = labels[index];
            max = Math.floor(max*100)/100;

            //render chart with given props
            chart = (
                <div>
                    <PredictionOutput
                        data = {this.state.graphData}
                        address = {this.state.submitted.subAdd}
                        hour = {this.state.submitted.subHour}
                        mins = {this.state.submitted.subMins}
                        amOrpm = {this.state.submitted.subPMorAM}
                        dispatch = {dispatch}
                        max = {max}
                    />
                </div>
            )
        }

        return chart;
    }

    //renders a grid with inputs for the user 
    //address is a text input, hours and mins are numeric inputs 
    //AM or PM is a dropdown from semantic
    render(){

        //initially get error message or chart, value are empty divs if we can't display them right now
        const message = this.getErrorMessage();
        const chart = this.getChart();
        return(
            <div>
                <Header as='h4' attached='top'>
                     Enter Street Address and Time
                </Header>
                <Segment attached>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width = {16}>
                            <Input fluid label ="Street Address" placeholder ="Ex: 1750 Market St." type = "text" name='Address' value ={this.state.address} onChange={this.updateAddress}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns = {4}>
                        <Grid.Column width = {5}>
                            <Input fluid label ="Hour" placeholder = {9} min={1} max = {12} type = "number" name ='Hour' value = {this.state.timeHour} onChange = {this.updateHours}/>
                        </Grid.Column>
                        <Grid.Column width = {5}>
                            <Input  fluid label ="Minutes" placeholder = {30} type = "number" name ='Minutes' min={0} max = {59} value = {this.state.timeMins} onChange = {this.updateMins}/>
                        </Grid.Column>
                        <Grid.Column width = {3}>
                            <Dropdown
                                fluid
                                onChange={this.updatePMorAM}
                                options={[
                                    {key: 1, text: 'AM', value: 'AM'},
                                    {key: 2, text: 'PM', value: 'PM'}
                                ]}
                                selection
                                defaultValue = 'PM'
                                name = 'timePMorAM'
                            />
                        </Grid.Column>
                        <Grid.Column width = {3}>
                            <Button color ="blue"fluid  content="Submit" onClick={this.geocodeAddress}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                {message}

                </Segment>
                {chart}
            </div>
        );
    }
}

//export component
export default Inputs