import React, { useState } from "react";
import moment from "moment";
import { updateTask } from "../../../store/actions/userAction";
import { connect } from "react-redux";

const Tasks = ({ onDelete, tasks, label, updateTask }) => {
  const [id, setTaskId] = useState(null);
  const [task, setTask] = useState("");

  const onEdit = () => {
    if (task !== "") {
      updateTask(id, task);
    } else {
      return false;
    }
  };

  return (
    <div className="col s6">
      <h5 style={{ textAlign: "center", color: "grey" }}>{label}</h5>
      <div className="collection">
        {tasks.map(user => (
          <li className="collection-item" key={user.id}>
            {user.task}{" "}
            {user.authorName && (
              <>
                <br />
                <small>
                  from{" "}
                  <span style={{ color: "lightcoral" }}>{user.authorName}</span>
                </small>
              </>
            )}
            <br />
            <small>{moment(user.date).fromNow()}</small>
            <i
              onClick={() => onDelete(user.id)}
              className="material-icons trashcan"
            >
              delete_forever
            </i>
            {!user.authorName && (
              <i
                onClick={() => {
                  setTaskId(id === null ? user.id : null);
                }}
                className="material-icons edit_button"
              >
                edit
              </i>
            )}
            {id === user.id && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setTaskId(null);
                  onEdit();
                }}
              >
                <>
                  <input
                    type="text"
                    onChange={e => setTask(e.target.value)}
                    defaultValue={user.task}
                  />
                  <button
                    type="submit"
                    className="waves-effect waves-light btn-small"
                  >
                    Confirm changes
                  </button>
                </>
              </form>
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { updateTask })(Tasks);
