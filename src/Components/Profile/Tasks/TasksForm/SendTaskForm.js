import React, { useState } from "react";
import SelectOption from "./SelectOption";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { sendTask } from "../../../../store/actions/userAction";

const SendTaskForm = ({ sendTask }) => {

  const [task, setTask] = useState("");
  const [receiver, setReceiver] = useState("select");
  
  const onSubmit = e => {
    e.preventDefault();
    const newTask = { id: uuidv4(), task };
    sendTask(newTask, receiver);
    alert(`Task have been sent to ${receiver} succesful!`);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="col s12 container">
        <div className="input-field col s12">
          <input
            onChange={e => setTask(e.target.value)}
            type="text"
            required
            value={task}
          />
          <label htmlFor="task">Enter text</label>
          <SelectOption setReceiver={setReceiver} receiver={receiver} />
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default connect(null, { sendTask })(SendTaskForm);
