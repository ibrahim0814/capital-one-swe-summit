import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

import csvdata from '../../assets/data';

class AllDataHeatMap extends Component {

    state = {
        data: []
    }
    componentDidMount() {
    
    let data = [];
    for(let i=0; i<csvdata.length; i++){
        let latitude = csvdata[i].latitude;
        let longitude = csvdata[i].longitude;
        let obj = new window.google.maps.LatLng(latitude, longitude);
        data.push(obj);

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
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(AllDataHeatMap));
