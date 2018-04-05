//import react 
import React, { Component } from "react";


//other imports -- components from react google maps
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

//heat map layer from react google maps 
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

//data from csv 
import csvdata from '../../assets/data';

class HeatMapLifeThreatening extends Component {

    //set initial state -- blank data array
    state = {
        data: [],
    }

     //react lifecycle hook which allows us to control flow of data from APIs
    componentDidMount() {
    
      //for only potentially threatening calls, get lat and lng and create a maps LatLng point
      //push that point into a temp data array 
      let data = [];
      for(let i=0; i<csvdata.length; i++){

          //get lat and lng from csvdata
          const latitude = csvdata[i].latitude;
          const longitude = csvdata[i].longitude;
          
          const obj = new window.google.maps.LatLng(latitude, longitude);
          
          //filter by call type group
          if(csvdata[i].call_type_group === 'Potentially Life-Threatening'){
              data.push(obj);
          }
      }
      
       //set state with data
      this.setState({data: data});
  }

   //render a GoogleMap with props from parent (defaults)
  //below Google maps layer, add a heatmap later with the data we collected
  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}
        >
          <HeatmapLayer 
          data={this.state.data} 
          />
        </GoogleMap>
        <div>
        </div>
      </div>
    );
  }
}

//export and wrap with google map and script js 
export default withScriptjs(withGoogleMap(HeatMapLifeThreatening));
