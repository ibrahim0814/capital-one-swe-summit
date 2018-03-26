import React from 'react';

import {Message} from 'semantic-ui-react';

import DispatchTimes from '../timeToDispatch/timeToDispatch';

const dispatchTimes = () => {

    return(
        <div>
            <Message color='teal'>Task 3: Which areas take the longest time to dispatch to on average? How can this be reduced?</Message>
            <DispatchTimes/>
        </div>
    );
}

export default dispatchTimes;