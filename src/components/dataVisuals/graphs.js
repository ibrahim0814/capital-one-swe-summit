//import react 
import React from 'react';

//other imports -- chartjs and semantic ui components
import {Bar,Doughnut} from 'react-chartjs-2';
import  { Card, Header,Message } from 'semantic-ui-react';

//functional graphs component
const graphs = (props) => {

    //set default options for graph
    let defaultOptions = {
        title:{
            display: false,
        },
        legend: {
            display: false,
        }
    };

    //create all three graphs with cards and headers from semantic ui
    //use graph components from chartjs to render specific graphs (ie. Bar, Doughnut)
    //props have been passed in by parent -- graph data
    return(
        <div>
            <Card fluid raised className="graphsCard">
                <Header textAlign="center" className="cardHeader"
                >Percentage of Call Types</Header>
                <Doughnut
                    data={props.percentByCallTypeChart}
                    options={{
                        title:{
                            display: false,
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
                <Message>
                    <p>
                    Medical incidents dominate the percentage of 911 calls recieved, covering nearly 67% of emergency phone-ins within San Francisco. A distant runner-up is alarms, followed by fires and traffic collisions. <em>Note: all call types less than 1% were grouped into the 'Other' category to reduce clutter. Calls labeled as 'No Merit' and 'Cancelled' were excluded.</em> 
                    </p>
                </Message>
            </Card>

            <Card fluid raised className="graphsCard">
                <Header textAlign="center" className="cardHeader"
                >Number of Calls by Hour</Header>
                <Bar 
                    data = {props.numCallsByHourChart}
                    options = {defaultOptions}
                />
                <Message>
                    <p>
                    The number of calls by hour follows a skewed distribution. Most calls are recieved during midday, and calls are less frequent at early hours of the morning. The number of calls for this particular SF dataset peak around noon and 4 pm. The least number of calls were recieved between 3 am and 5 am. 
                    </p>
                </Message>
            </Card>
            <Card fluid raised className="graphsCard">
                <Header textAlign="center" className="cardHeader"
                >Avg. Response Time (mins) by Call Group Type</Header>
                <Bar 
                data = {props.avgResTimeChart}
                options = {defaultOptions}
            />
                <Message>
                    <p>
                    Average response times differ drastically between the four types of call groups. The lowest avg. response time belongs to calls triggered by alarms. This makes sense as dispatches are often directly deployed after an alarm goes off. For potentially life-threatening cases, average response time is roughly 8.3 minutes. Lastly, calls labeled as 'fire' take a staggering 27 mins on avg. to arrive at the scene. <em> Note: Response time was calculated as the difference between the 'recieved_timestamp' and 'on_scene_timestamp'. I wanted to factor in the 'queue' time between when a person calls and when an operator picks up the call. </em>
                    </p>
                </Message>
            </Card>
        </div>
    );
}

//export component
export default graphs;