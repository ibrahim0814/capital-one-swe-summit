import React from 'react';

import {Header,Card,Message} from 'semantic-ui-react';

import HeatMapAll from '../heatmaps/heatmapAllData';
import HeatMapLT from '../heatmaps/heatmapLifeThreat';

const heatmapContainer = () => {

    return(
        <div>
            <Message color='teal'>Task 4 (optional):  Add heat maps that show dispatch frequency, urgency over the city.</Message>
            <Card fluid  className = "mapCard">
            <Header textAlign="center" className ="mapCardHeader">Dispatch Frequency for All Calls </Header>
            <HeatMapAll
                center = {{lat:37.7578602, lng: -122.4384694}}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1mTgj63K6iq8JvHFNg5qT5VHh0VqusRY&v=3.exp&libraries=geometry,drawing,places,visualization"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                zoom = {11.5}
            />
            <Message>
                Dispatches are most common in Downtown San Francisco and SoMa. Most emergencies occur there, which makes sense due to the large population density and significant infrastructure  development that is concentrated within those areas. Meanwhile, areas like Presidio and Treasure Island are relatively calmer.  
            </Message>
            </Card>
            <Card fluid  className = "mapCard">
            <Header textAlign="center" className ="mapCardHeader">Dispatch Frequency for Potentially Life-Threatening Calls</Header>
            <HeatMapLT
                center = {{lat:37.7578602, lng: -122.4384694}}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1mTgj63K6iq8JvHFNg5qT5VHh0VqusRY&v=3.exp&libraries=geometry,drawing,places,visualization"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                zoom = {11.5}
            />
            <Message>
                We can see a similar distribution of points if only potentially life-threatening calls are shown on the heat map. The Downtown SF and SoMa areas are still hotspots. However, these areas are more concentrated, with frequency dissipating quickly as we move outwards.
            </Message>
            </Card>
        </div>
    );
}


export default heatmapContainer;