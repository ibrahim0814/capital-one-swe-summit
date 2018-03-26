import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

import csvdata from '../../assets/data';

class HeatMapLifeThreatening extends Component {

    state = {
        data: [],
    }
    componentDidMount() {
    
    let data = [];
    for(let i=0; i<csvdata.length; i++){
        let latitude = csvdata[i].latitude;
        let longitude = csvdata[i].longitude;
        
        let obj = new window.google.maps.LatLng(latitude, longitude);
        if(csvdata[i].call_type_group === 'Potentially Life-Threatening'){
            data.push(obj);
        }
    }
    
    this.setState({data: data});
  }

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

export default withScriptjs(withGoogleMap(HeatMapLifeThreatening));
