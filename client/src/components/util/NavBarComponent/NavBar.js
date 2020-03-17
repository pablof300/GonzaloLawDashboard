import React from "react";
import "./NavBar.css";
import {Image} from 'semantic-ui-react';
import logo from "../../../assets/LogoCropped.png";
import { Dropdown, Menu, Button } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

const NavBar = () => {

  const navigateTo = (routeName) => {
    return <Redirect to={routeName} />
  }
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
      <Image className='Logo' src={logo} align='right'/>
        
      </Menu.Item>
    </Menu.Menu>
  </Menu>
  );
};

export default NavBar;
