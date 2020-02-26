import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Dropdown, Menu, Button, ButtonGroup } from 'semantic-ui-react'
import Footer from "../Footer/Footer";



const NavBar = () => {
  return (
    
    
    <Menu>
    
    <Dropdown item text='Menu'>
    
      <Dropdown.Menu>
        <Dropdown.Item>Home</Dropdown.Item>
        <Dropdown.Item>Go to Site</Dropdown.Item>
        <Dropdown.Item>User Settings</Dropdown.Item>
        <Dropdown.Item>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Menu.Item position = 'right'>
     
      <Button floated = 'left'>
        Log in
      </Button>
      <Button floated = 'right'>
        Sign Up
      </Button>

     
    </Menu.Item>
  </Menu>
            
          
    
          

  );
};

export default NavBar;
