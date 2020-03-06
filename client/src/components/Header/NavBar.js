import React from "react";
import "./NavBar.css";
import { Dropdown, Menu, Button } from 'semantic-ui-react'

const NavBar = () => {
  return (
        
    <Menu>
    
    <Dropdown item text='Menu'>
    
      <Dropdown.Menu>
        <Dropdown.Item>Dashboard Home</Dropdown.Item>

        <Dropdown.Item>Go to General Site</Dropdown.Item>

        <Dropdown.Item>User Settings</Dropdown.Item>

        <Dropdown.Item>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Menu position='right'>
      <Menu.Item>
      
        <Button inverted color='violet'>
          Log in
        </Button> 
      </Menu.Item>

      <Menu.Item>
        <Button inverted color='violet'>
          Sign Up
        </Button> 
        
      </Menu.Item>
    </Menu.Menu>
  </Menu>
  );
};

export default NavBar;
