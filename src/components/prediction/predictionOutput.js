//import react 
import React from 'react';

//other imports -- chartjs and semantic ui components 
import {HorizontalBar} from 'react-chartjs-2';
import  { Card, Header,Message } from 'semantic-ui-react';

const predictionGraph = (props) => {

    //truncate mins and hours so they display properly 
    let mins = Math.trunc(props.mins);
    let hrs = Math.trunc(props.hour);
    if(mins < 10){
        mins='0'+mins;
    }
    //determine subheader (address+time)
    let subheader = props.address+" at "+hrs+":"+mins+" "+props.amOrpm;

    //render a card with a horizontal bar graph, likely dispatch, and message on data analysis w/ machine learning 
    return(
        <div>
            <Card fluid raised className="graphsCard2">
            <Header textAlign="center" className="cardHeader2"
                content="Results" subheader={subheader} />
            <HorizontalBar 
                data = {props.data}
                options ={{
                    title:{
                        display: false,
                    },
                    legend: {
                        display: false,
                    }
                }}
            />
            <Message success>
                <strong>Likely dispatch</strong>: {props.dispatch} with a probability of {props.max}%
            </Message>
            
            </Card>
            <Card fluid raised className="mlCardPad">
            <Message attached="bottom" >
                <Message.Header className = "mlMessagePad">Levereging Machine Learning for Predictions</Message.Header>
                   <p> Machine learning and neural networks are powerful data science tools for predicting outcomes when given certain inputs. With the help of brain.js, I was able to train a neural network to take inputs of latitude, longitude, hour, and minute for any given call and figure out the best possible dispatch. Latitude and longitude coordinates were obtained by feeding the user inputted address into Google's Geocode API. Now, if you've messed around with some inputs above, you'll notice that the 'Results' graph doesn't vary significantly from input to input and the probability for the 'likely dispatch' isn't that high (~30-40%). What's going on here? I suspect this is happening because of two reasons. The first and primary reason I believe to be the cause of this is that the distribution of unit types dispatched to any given location stays relatively the same. Sure, there are instances where 'Engine' isn't as likely, and, with some inputs, 'Medic' is the most likely dispatch. But overall, the distribution stays the same which is why we don't see drastic variance between different locations or times. The second reason for this is likely due to the fact that there aren't a lot of data points to work with, especially for locations not in Downtown San Francisco. 10,000 points may seem like a high number, but equally important is the quality and distribution of those data points. Since most calls center around Downtown SF we can't get a good representation of dispatch types by time for other locations. </p>
                </Message>
                </Card>
        </div>
    )


}

//export component
export default predictionGraph;