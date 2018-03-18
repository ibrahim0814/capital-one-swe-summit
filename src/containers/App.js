import React, { Component } from 'react';

import Navbar from '../components/navbar/navbar'

import { Grid, GridColumn, Divider, Header, Message } from 'semantic-ui-react';



import GraphData from '../components/graphData/graphData'

class App extends Component {


  render() {

    return (
      <div className="App">
        <Header size='large' >Capital One SWE Summit 2018 Submission </Header>
        <Divider></Divider>
        <Grid>
          <Grid.Column width = {4}>
            <Navbar />
          </Grid.Column>
          <Grid.Column width = {12}>
            <Message color='teal'>Task 1: Display or graph 3 metrics or trends from the data set that are interesting to you</Message>
            <GraphData/>
          </Grid.Column>

        </Grid>
        
        
      </div>
    );
  }
}

export default App;
