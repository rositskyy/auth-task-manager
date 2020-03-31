import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTask } from "../../../../store/actions/userAction";

const EditForm = ({ setTaskId, updateTask, id, taskInputValue }) => {
  const [task, setTask] = useState("");

  const onEdit = () => {
    if (task !== "") {
      updateTask(id, task);
    } else {
      return false;
    }
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setTaskId(null);
        onEdit();
      }}
    >
      <input
        type="text"
        onChange={e => setTask(e.target.value)}
        defaultValue={taskInputValue}
      />
      <button type="submit" className="waves-effect waves-light btn-small">
        Confirm changes
      </button>
    </form>
  );
};

export default connect(null, { updateTask })(EditForm);
