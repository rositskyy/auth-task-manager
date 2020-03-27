import React from "react";

const AddTaskForm = ({ onSubmit, onChange, inputText }) => {
  return (
    <>
      <form onSubmit={onSubmit} className="col s12">
        <div className="input-field col s12">
          <input onChange={onChange} type="text" value={inputText} />
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
