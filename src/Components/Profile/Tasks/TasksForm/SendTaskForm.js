import React, { useState } from "react";
import SelectOption from "./SelectOption";
import { connect } from "react-redux";
import { sendTask } from "../../../../store/actions/userAction";

const SendTaskForm = ({ sendTask, currentUser }) => {
  const [task, setTask] = useState("");
  const [receiver, setReceiver] = useState("select");

  const onSubmit = e => {
    e.preventDefault();
    if (receiver !== "select") {
      const author = currentUser.login;
      sendTask(task, receiver, author);
      alert(`Task have been sent to ${receiver} succesful!`);
      setTask("");
    } else {
      alert("You cant send tasks because you didn't select the user");
    }
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
