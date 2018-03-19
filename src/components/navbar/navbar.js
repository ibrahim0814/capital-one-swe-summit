import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './navbar.css'

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

export default navbar;