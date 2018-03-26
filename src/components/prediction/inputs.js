import React, {Component} from 'react';

import {Message, Dropdown, Button,Input, Grid, Header, Segment} from 'semantic-ui-react';

import {DefaultChartObject} from '../usefulFunctions/functions'

import PredictionOutput from './predictionOutput';

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBIxRvkjRk7SlQeqioGNNGo9WbP6BtT4SQ'
  });

const jsonNet = require('../../assets/network2');
const brain = require('brain.js');
const net = new brain.NeuralNetwork().fromJSON(jsonNet);

class Inputs extends Component{
    
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

    geocodeAddress = () =>{
        let submitted = {
            subAdd: this.state.address,
            subHour: this.state.timeHour,
            subMins: this.state.timeMins,
            subPMorAM: this.state.timePMorAM
        }
        this.setState({submitted: submitted});
        if(this.state.timeHour < 1 || this.state.timeHour > 12){
            this.errorMessageTrue();
            this.showGraphFalse();
        }else if(this.state.timeMins < 0 || this.state.timeMins > 59){
            this.errorMessageTrue();
            this.showGraphFalse();
        }else{
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
                console.log(response.json.results);
                this.verifyAddress(response.json.results);
            })
        }
    }


    verifyAddress = (geocodeResult) => {
        if(geocodeResult.length === 0){
            this.errorMessageTrue();
            this.showGraphFalse();
        }else{
            let shortName = geocodeResult[0].address_components[3].short_name;
            if(shortName !== 'SF'){
                this.errorMessageTrue();
                this.showGraphFalse();
            }else{
                this.errorMessageFalse();
                this.processResults(geocodeResult[0].geometry.location);
            }
        }
    }

    createGraphData = (obj) =>{
        let chartSettings = DefaultChartObject();
        Object.keys(obj).forEach((key, index) =>{
            chartSettings.labels.push(key);
            chartSettings.datasets[0].data.push(obj[key]*100);
        })
        chartSettings.datasets[0].label = 'Unit Type';
        this.setState({graphData: chartSettings});
        this.showGraphTrue();
    }

    processResults = (geometry) => {
        let hour = this.state.timeHour -1;
        let lat = geometry.lat;
        let lng = geometry.lng;
        let min = this.state.timeMins;
        if(this.state.timePMorAM === 'PM'){
            console.log('in PM');
            hour+=12;
        }
        console.log(hour);
        let result = net.run({lat: lat/40, long: lng/-150, hour: hour/24, min: min/60});
        this.createGraphData(result);
    }

    showGraphTrue = () =>{
        this.setState({okayToGraph: true});
    }

    showGraphFalse = () =>{
        this.setState({okayToGraph: false});
    }

    errorMessageTrue = () => {
        this.setState({error: true});
    }

    errorMessageFalse = () => {
        this.setState({error: false});
    }

    updateAddress = (event) => {
        this.setState({address: event.target.value});
    }

    updateHours = (event) =>{
        this.setState({timeHour: event.target.value});
    }

    updateMins = (event) =>{
        this.setState({timeMins: event.target.value});
    }

    updatePMorAM = (event,{name, value}) =>{
        this.setState({[name]: value});

    }

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

    getChart = () => {
        let chart = <div></div>
        if(this.state.okayToGraph){
            let labels = this.state.graphData.labels;
            let data = this.state.graphData.datasets[0].data;
            let max = 0;
            let index = 0;
            for(let i =0; i<data.length; i++){
                if(data[i]>max){
                    max = data[i];
                    index = i;
                }
            }
            let dispatch = labels[index];
            max = Math.floor(max*100)/100;
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

    render(){
        let message = this.getErrorMessage();
        let chart = this.getChart();
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

export default Inputs