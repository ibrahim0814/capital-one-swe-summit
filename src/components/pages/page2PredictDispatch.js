//import react 
import React from 'react';

////other imports -- semantic ui and Inputs (has layout for inputs and Graphs for results)
import {Message} from 'semantic-ui-react';
import Inputs from '../prediction/inputs';

const predictDispatch = () => {

    //render a message at the top detailing Task 2, then Inputs (w/ results)
    return(
        <div>
            <Message color='teal'>Task 2: Given an address and time, what is the most likely dispatch to be required?</Message>
            <Inputs/>
        </div>
    );
}

//export component
export default predictDispatch;