import React from 'react';

import {Message} from 'semantic-ui-react';
import GraphData from '../../graphData/graphData'

const dataVisuals = () => {

    return(
        <div>
            <Message color='teal'>Task 1: Display or graph 3 metrics or trends from the data set that are interesting to you</Message>
            <GraphData/>
        </div>
    );
}

export default dataVisuals;