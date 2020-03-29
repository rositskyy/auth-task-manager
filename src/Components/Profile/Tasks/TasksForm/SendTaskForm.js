import React, { useState } from "react";
import SelectOption from "./SelectOption";
import { v4 as uuidv4 } from "uuid";

const SendTaskForm = () => {
  const [task, setTask] = useState("");
  const [receiver, setReceiver] = useState("select");
  const onSubmit = e => {
    e.preventDefault();
    alert(`Task have been sent to ${receiver} succesful!`);
    // All users from localstorage
    const data = { id: uuidv4(), task };
    const existing = JSON.parse(localStorage.getItem("accounts"));
    // Send to user [foundUser]
    const foundUser = existing.find(item => item.login === receiver);
    foundUser.receivedTasks.push(data);
    // Update accounts info
    const ids = existing.map(e => e.id);
    const elementIndex = ids.indexOf(foundUser.id);
    if (elementIndex !== -1) {
      existing[elementIndex] = foundUser;
    }
    localStorage.setItem("accounts", JSON.stringify(existing));
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

export default SendTaskForm;
