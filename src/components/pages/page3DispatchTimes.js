//import react 
import React from 'react';

//other imports -- semantic ui and DispatchTimes (has graph)
import {Message} from 'semantic-ui-react';
import DispatchTimes from '../timeToDispatch/timeToDispatch';

const dispatchTimes = () => {

    //render a message at the top detailing Task 2, then Dispatch times graph with info
    return(
        <div>
            <Message color='teal'>Task 3: Which areas take the longest time to dispatch to on average? How can this be reduced?</Message>
            <DispatchTimes/>
        </div>
    );
}

//export component
export default dispatchTimes;