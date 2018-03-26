import React from 'react';

import {Message} from 'semantic-ui-react';

import Inputs from '../prediction/inputs';

const predictDispatch = () => {

    return(
        <div>
            <Message color='teal'>Task 2: Given an address and time, what is the most likely dispatch to be required?</Message>
            <Inputs/>
        </div>
    );
}

export default predictDispatch;