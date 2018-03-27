//import react 
import React from 'react';

//other imports -- semantic ui and chartjs components
import {HorizontalBar} from 'react-chartjs-2';
import  { Card, Header,Message } from 'semantic-ui-react';

const dispatchGraph = (props) =>{

    //renders a raised card with a horizontal bar chart that displays avg response times by district and a message underneath about lowering dispatch times
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
                    The average dispatch time across all SF districts was 1.3 minutes for all valid calls. Times for Portola/Visitacion Valley, Presidio, and Treasure Island are noticeably higher than everywhere else, hovering around 2.5 minutes. Mission Bay and Pacific Heights are among areas with the shortest dispatch times, with an average time of around 50-55 seconds per call. <em>Note: Dispatch times were calculated based on the difference between the 'entry_timestamp' and 'dispatch_timestamp' time values. In addition, avg. time for the St. Francis Wood district was omitted from this graph because it was an extreme outlier at around 28 mins. It skewed the graph such that nuances between other districts couldn't be seen well.</em>
                </Message>
            </Card>
            <Card fluid raised className="mlCardPad">
            <Message attached="bottom" >
                <Message.Header className = "mlMessagePad">Reducing Dispatch Times</Message.Header>
                   <p> In order to approach the problem of reducing dispatch times, we first need to understand <em>why</em> dispatch times vary so significantly. Weather, traffic, and even understaffed 911 call centers are all issues than commonly come up. However, by and large, the biggest factor that negatively impacts dispatch times is not being able to locate a caller. It is a myth that 911 operators are instantly aware of a caller's location. In fact, most 911 calls are sent via cell-phones, which often don't send precise location coordinates to the operator. In California alone, 63% of cell phones don't share location. That statistic gets even worse for suburban and rural areas. How can we fix this? By requiring cell phone companies, via legislation, to send accurate GPS coordinates when 911 is called. If implemented, more than 10,000 lives can be saved per year which would otherwise be lost due to inaccurate location information.</p>
                   
                   <p>
                    Another common problem that call centers face is long call queues. Essentially, whoever calls first gets answered. This system leaves people hanging during critical times just because they called after another person - clearly, this is impractical. 80-90 million calls per year are false positives, meaning that they are either not emergencies or they are 'butt dials'. The establishment of a robust, non-emergency call line would not only reduce long emergency queues, but could also serve as a valuable  resource for people needing information regarding serious, but non-emergency situations. Something like a 311 system, which has found success in many states, should be implemented and marketed nationwide. This could drastically help reduce long queues for emergency callers.</p>
                </Message>
            </Card>
        </div>
    );
}

//export component
export default dispatchGraph;