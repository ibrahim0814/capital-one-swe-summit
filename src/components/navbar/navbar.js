//import react 
import React from 'react'

//other imports -- semantic ui components
import { Menu } from 'semantic-ui-react'

//functional navbar components
//renders a vertical menu item -- iterates through given props of menu items
const navbar = (props) => {
    return (
        <div>
            <Menu vertical fluid pointing size ='large'  >
                {
                    props.menuItems.map((value, index) =>{
                        return (
                            <Menu.Item 
                            name={value} 
                            key={index}
                            active={props.activeItem === value} 
                            onClick={() => props.changeHandler(value)} 
                            >{value}
                            </Menu.Item>
                        
                        );
                    })
                }
            </Menu>
        </div>
    );
}

//export component
export default navbar;