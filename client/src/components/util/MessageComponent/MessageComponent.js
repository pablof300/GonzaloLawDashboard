import React from "react";
import { Message, Icon } from "semantic-ui-react";
import "./MessageComponent.css";

const MessageComponent = props => {
  const getIconInfo = () => {
    if (props.type == "failure") {
      return { iconName: "times", color: "red" };
    } else {
      return { iconName: "check", color: "green" };
    }
  };

  return (
    <>
      <Message icon>
        <Icon name={"times"} color={"red"} />
        <Message.Content>
          <Message.Header className="Header">{props.title}</Message.Header>
          {props.content}
        </Message.Content>
      </Message>
    </>
  );
};

export default MessageComponent;
