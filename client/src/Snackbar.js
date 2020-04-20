import React, { useState, useEffect } from "react";
import {
  Icon,
  TransitionablePortal,
  Segment,
  Transition,
  Card,
} from "semantic-ui-react";
import "./Snackbar.css";

function Snackbar(props) {
  function closeSnackbar() {
    props.setSnackBar({
      enable: false,
      message: props.snackbar.message,
      type: props.snackbar.type,
      color: props.snackbar.color,
    });
  }

  if (props.snackbar.enable) {
    setTimeout(() => {
      closeSnackbar();
    }, 4000);
  }

  /**
   * style={{
            left: "35%",
            position: "fixed",
            top: "80%",
            zIndex: 1000,
          }}
   */

  return (
    <div className="snackbar">
      <Transition
        visible={props.snackbar.enable}
        closeOnDocumentClick={false}
        animation="fly up"
        duration={400}
      >
        <Segment raised inverted color={props.snackbar.color}>
          <Icon style={{ marginRight: 35 }} name={props.snackbar.type} />
          {props.snackbar.message}
          <Icon
            style={{ marginLeft: 35 }}
            name="close"
            onClick={closeSnackbar}
          />
        </Segment>
      </Transition>
    </div>
  );
}

export default Snackbar;
