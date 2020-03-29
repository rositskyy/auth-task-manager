import React, { useState } from "react";

const AddTaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState("");
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ task });
          setTask('')
        }}
        className="col s12"
      >
        <div className="input-field col s12">
          <input
            onChange={e => setTask(e.target.value)}
            type="text"
            value={task}
            required
          />
          <label htmlFor="text">Add task</label>
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddTaskForm;
