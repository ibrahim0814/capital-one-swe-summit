//import react 
import React from 'react';

//other imports -- semantic ui and GraphData (has graph)
import {Message} from 'semantic-ui-react';
import GraphData from '../dataVisuals/graphData'

const dataVisuals = () => {

    //render a message at the top detailing Task 1, then GraphData
    return(
        <div>
            <Message color='teal'>Task 1: Display or graph 3 metrics or trends from the data set that are interesting to you</Message>
            <GraphData/>
        </div>
    );
}

//export component
export default dataVisuals;