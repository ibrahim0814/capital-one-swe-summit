import React, { Component } from 'react';

import Navbar from '../components/navbar/navbar'

import { Grid, Divider, Header } from 'semantic-ui-react';

import DataVisuals from '../components/pages/dataVisuals/dataVisuals'
import PredictDispatch from '../components/pages/predictDispatch/predictDispatch'
import DispatchTimes from '../components/pages/dispatchTimes/dispatchTimes'

class App extends Component {

  state = {
    activeItem: 'Data Visuals',
    menuItems: ['Data Visuals', 'Predicting Dispatches','Dispatch Times', 'Heat Maps', 'Crime Correlation', 'Future Proofing']
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
      page = <div>Heat Maps</div>
    }else if(activeItem === 'Crime Correlation'){
      page = <div>Crime Correlation</div>
    }else if(activeItem === 'Future Proofing'){
      page = <div>Future Proofing</div>
    }

    return page
  }

  render() {

    let pageToShow = this.getPageToShow(this.state.activeItem);

    return (
      <div className="App">
        <Header size='large' >Capital One SWE Summit 2018 Submission </Header>

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
