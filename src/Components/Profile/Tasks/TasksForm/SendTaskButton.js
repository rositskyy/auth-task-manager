import React from "react";
import Popup from "reactjs-popup";
import SendTaskForm from "./SendTaskForm";

const SendTaskButton = () => {
  return (
    <div className="container">
      <Popup
        trigger={<button className="btn popup_button"> Send task</button>}
        position="right top"
      >
        <div>
          <SendTaskForm />
        </div>
      </Popup>
    </div>
  );
};

export default SendTaskButton;
