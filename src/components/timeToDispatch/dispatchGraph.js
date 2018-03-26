import React from 'react';

import {HorizontalBar} from 'react-chartjs-2';
import  { Card, Header,Message } from 'semantic-ui-react';

const dispatchGraph = (props) =>{
    return (
        <div>
            <Card fluid raised className="graphsCard">
                <Header textAlign="center" className="cardHeader"
                >Dispatch Times (mins) by District</Header>
                <HorizontalBar
                    data={props.data}
                    options={{
                        title:{
                            display: false,
                        },
                        legend: {
                            display: false,
                        }
                    }}
                />
                <Message>
                    Average dispatch times for Downtown SF, Nob Hill, and Russian Hill are noticibely higher than everywhere else, hovering around 4.8 minutes. This area is followed closely by North Beach and Ebarcadero North, where dispatch times are on average 4.1 minutes. Ingleside and Portrero Hill are among areas with the shortest dispatch times, with an average time of around 15 seconds per call. <em>Note: Dispatch times were calculated based on the difference between the 'entry_timestamp' and 'dispatch_timestamp' time values.</em>
                </Message>
            </Card>
            <Card fluid raised className="mlCardPad">
            <Message attached="bottom" >
                <Message.Header className = "mlMessagePad">Reducing Dispatch Times</Message.Header>
                   <p> In order to approach the problem of reducing dispatch times, we first need to understand <em>why</em> dispatch times vary so significantly. Weather, traffic, and even understaffed 911 call centers are all issues than commonly come up. However, by and large, the biggest factor that negatively impacts dispatch times is not being able to locate a caller. It is a myth that 911 operators are instantly aware of a caller's location. In fact, most 911 calls are sent via cell-phones, which often don't send precise location coordinates to the operator. In California alone, 63% of cell phones don't share location. That statistic gets even worse for suburban and rural areas. How can we fix this? By requiring cell phone companies, via legislation, to send accurate GPS coordinates when 911 is called. If implemented, more than 10,000 lives can be saved per year which would otherwise be lost due to inaccurate location information.</p>
                   
                   <p>
                    Another common problem that call centers face is long call queues. Essentially, whoever calls first gets answered. This system leaves people hanging during critical times just because they called after another person - clearly, this is impractical. 80-90 million calls per year are false positives, meaning that they are either not emergencies or they are 'butt dials'. The establishment of a robust, non-emergency call line would not only reduce long emergency queues, but could also serve as a valuble resource for people needing information regarding serious, but non-emergency situations. Something like a 311 system, which has found success in many states, should be implemented and marketed nationwide. This could drastically help reduce long queues for emergency callers.</p>
                </Message>
            </Card>
        </div>
    );
}

export default dispatchGraph;