import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import  {Card, Header,Message } from 'semantic-ui-react';

const safeAreasGraph = (props) => {

    return(
        <div>
            <Card fluid raised className="graphsCard">
                <Header textAlign="center" className="cardHeader"
                >Safest Areas in SF</Header>
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
                    For every district, a score was computed based on the type of dispatch and frequency. Weights for each dispatch were determined based on the number of potentially life-threatening cases that particular dispatch was deployed to. The aggregate of these weights for all valid data points and districts was then used for the chart above. Based on this system, Presidio is one of the safest and most calm areas in SF followed closely by Treasure Island. On the other hand, some of the least safe neighborhoods in SF are SoMa and Hayes Valley.
                </Message>
            </Card>
        </div>
    );
}

export default safeAreasGraph;