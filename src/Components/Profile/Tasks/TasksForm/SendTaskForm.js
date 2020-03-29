import React, { useState } from "react";
import SelectOption from "./SelectOption";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { sendTask } from "../../../../store/actions/userAction";

const SendTaskForm = ({ sendTask, currentUser }) => {
  const [task, setTask] = useState("");
  const [receiver, setReceiver] = useState("select");

  const onSubmit = e => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      task,
      author: currentUser.login,
      date: new Date()
    };
    sendTask(newTask, receiver);
    alert(`Task have been sent to ${receiver} succesful!`);
    setTask("");
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

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser
});

export default connect(mapStateToProps, { sendTask })(SendTaskForm);
