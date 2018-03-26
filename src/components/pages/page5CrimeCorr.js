//import react 
import React from 'react';

//other imports -- semantic ui and Safe areas graph
import {Message} from 'semantic-ui-react';
import SafeAreas from '../safeAreas/safeAreas';

const dispatchTimes = () => {

    //render a message at the top detailing Task 5, then safe areas graph with info
    return(
        <div>
            <Message color='teal'>Task 5 (optional): Based on the type of dispatch and the frequency of dispatch, show the most calm and safe neighborhoods in the city</Message>
            <SafeAreas/>
        </div>
    );
}

export default dispatchTimes;