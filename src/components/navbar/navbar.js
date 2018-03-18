import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'
import './navbar.css'

class Navbar extends Component {
  state = { 
      activeItem: 'Data Visuals',
      menuItems: ['Data Visuals', 'Predicting Dispatches','Dispatch Times', 'Heat Maps', 'Crime Correlation', 'Future Proofing']

  }

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
        <div>
      <Menu vertical fluid pointing size ='large'  >
        
        {
            this.state.menuItems.map((value, index) =>{
                return (
                    
                    <Menu.Item 
                    name={value} 
                    key={index}
                    active={activeItem === value} 
                    onClick={this.handleItemClick} 
                    >{value}
                    </Menu.Item>
                
                );
            })
        }
        
      </Menu>
      </div>
    )
  }
}

export default Navbar;