import React from "react";
import { Button, Icon, Menu, MenuItem } from "semantic-ui-react";

const FooterComponent = () => {
  return (
    <Menu color="violet" inverted>
      <MenuItem>Gonzalo Law LLC</MenuItem>
      <Menu.Menu position="right">
        <MenuItem>
          <Button inverted>
            <Icon name="envelope" />
            ngonzalo@gonzalolaw.com
          </Button>
        </MenuItem>
        <MenuItem>
          <Button inverted>
            <Icon name="phone" />
            +1(216)527-7777
          </Button>
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

export default FooterComponent;
