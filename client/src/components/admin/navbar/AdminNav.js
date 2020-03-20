import React from "react";
import { Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import logo from "../../../assets/LogoCropped.png";

// TODO: Update <Search> usage after its will be implemented

const AdminNav = () => (
  <div>
    <Menu attached="top">
      <Dropdown item icon="bars" simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="dropdown" />
            <span className="text">Create New...</span>

            <Dropdown.Menu>
              <Dropdown.Item>Case</Dropdown.Item>
              <Dropdown.Item>Client</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>Edit Permissions</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="Test">
        <Image className="Logo" src={logo} align="right" />
      </div>
    </Menu>
  </div>
);

export default AdminNav;
