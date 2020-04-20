import React from "react";
import { Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import logo from "../../../assets/LogoCropped.png";
import "../Admin.css"
import Cookies from "js-cookie";

// TODO: Update <Search> usage after its will be implemented

const AdminNav = () => (
  <div>
    <Menu attached="top">
      <Dropdown className="menuBars" item icon="bars" simple>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => {window.location = "https://www.gonzalolaw.com/"}}>Go to General Site</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {
            window.location = '/adminlogin';
            Cookies.remove('jwt');
          }}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="Test">
        <Image className="Logo" src={logo} align="right" />
      </div>
    </Menu>
  </div>
);

export default AdminNav;
