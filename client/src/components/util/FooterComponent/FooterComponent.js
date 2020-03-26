import React from "react";
import { Button, Icon, Menu, MenuItem } from "semantic-ui-react";

const FooterComponent = () => {
  return (
    <Menu color="grey">
      <MenuItem>Gonzalo Law LLC</MenuItem>
      <Menu.Menu position="right">
        <MenuItem>
          <Button>
            <Icon name="envelope" />
            ngonzalo@gonzalolaw.com
          </Button>
        </MenuItem>
        <MenuItem>
          <Button>
            <Icon name="phone" />
            +1(216)527-7777
          </Button>
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

export default FooterComponent;
