import React from "react";
import "./NavBar.css";
import { Image } from "semantic-ui-react";
import logo from "../../../assets/LogoCropped.png";
import { Dropdown, Menu } from "semantic-ui-react";
import Cookies from "js-cookie";

const NavBar = () => {
  return (
    <Menu>
      <Dropdown item text="Menu">
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => {window.location = "https://www.gonzalolaw.com/"}}>Go to General Site</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {
              window.location = '/';
              Cookies.remove('jwt');
          }}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position="right">
        <Menu.Item>
          <Image className="Logo" src={logo} align="right" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
