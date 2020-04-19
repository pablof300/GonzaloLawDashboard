import React from "react";
import { Button, Icon, Menu, MenuItem } from "semantic-ui-react";

const FooterComponent = () => {
  return (
    <Menu color="grey" className = "gonzofooter">
      <MenuItem>Gonzalo Law LLC</MenuItem>
      <Menu.Menu position="right">
        <MenuItem>
          <Button>
            <Icon name="envelope" />
            <a href="mailto:ngonzalo@gonzalolaw.com">ngonzalo@gonzalolaw.com </a>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button>
            <Icon name="phone" />
            <a href= "tel:+1-216-527-7777">+1(216)527-7777</a>
          </Button>
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

export default FooterComponent;
