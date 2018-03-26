import React from 'react';

import {Message} from 'semantic-ui-react';

import SafeAreas from '../safeAreas/safeAreas';

const dispatchTimes = () => {

    return(
        <div>
            <Message color='teal'>Task 5 (optional): Based on the type of dispatch and the frequency of dispatch, show the most calm and safe neighborhoods in the city</Message>
            <SafeAreas/>
        </div>
    );
}

export default dispatchTimes;