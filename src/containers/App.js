import React, { Component } from 'react';

import Navbar from '../components/navbar/navbar'

import { Grid, Divider, Header } from 'semantic-ui-react';

import DataVisuals from '../components/pages/page1DataVisuals'
import PredictDispatch from '../components/pages/page2PredictDispatch'
import DispatchTimes from '../components/pages/page3DispatchTimes'
import HeatMaps from '../components/pages/page4Heatmaps'
import CrimeCorrelation from '../components/pages/page5CrimeCorr'

class App extends Component {

  state = {
    activeItem: 'Data Visuals',
    menuItems: ['Data Visuals', 'Predicting Dispatches','Dispatch Times', 'Heat Maps', 'Crime Correlation']
  }

  handleItemClick = (value) => {
      this.setState({ activeItem: value });
  }

  getPageToShow(activeItem){
    let page = <div></div>

    if(activeItem === 'Data Visuals'){
      page = <DataVisuals/>
    }else if(activeItem === 'Predicting Dispatches'){
      page = <PredictDispatch/>
    }else if(activeItem === 'Dispatch Times'){
      page = <DispatchTimes/>
    }else if(activeItem === 'Heat Maps'){
      page = <HeatMaps/>
    }else if(activeItem === 'Crime Correlation'){
      page = <CrimeCorrelation/>
    }
    return page
  }

  render() {

    let pageToShow = this.getPageToShow(this.state.activeItem);

    return (
      <div className="App">
        <Header size='large'>
          Capital One 2018 Summit Submission - Ibrahim Ali
        </Header>

        <Divider></Divider>

        <Grid>

          <Grid.Column width = {4}>
            <Navbar 
              menuItems = {this.state.menuItems}
              activeItem = {this.state.activeItem}
              changeHandler = {this.handleItemClick}
            />
          </Grid.Column>

          <Grid.Column width = {12}>
            {pageToShow}
          </Grid.Column>

        </Grid>
      </div>
    );
  }
}

export default App;
