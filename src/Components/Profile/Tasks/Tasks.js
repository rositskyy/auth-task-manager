import React, { useState } from "react";
import moment from "moment";
import EditForm from "./TasksForm/EditForm";
import IconButton from "./TasksForm/IconButton";
import AuthorSignature from "./TasksForm/AuthorSignature";

const Tasks = ({ onDelete, tasks, label }) => {
  const [id, setTaskId] = useState(null);
  return (
    <div className="col s6">
      <h5 style={{ textAlign: "center", color: "grey" }}>{label}</h5>
      <div className="collection">
        {tasks.map(user => (
          <li className="collection-item" key={user.id}>
            {user.task}{" "}
            {user.authorName && <AuthorSignature author={user.authorName} />}
            <br />
            <small>{moment(user.date).fromNow()}</small>
            <IconButton
              onClick={() => onDelete(user.id)}
              label="delete_forever"
              styleClass="trashcan"
            />
            {!user.authorName && (
              <IconButton
                onClick={() => setTaskId(id === null ? user.id : null)}
                label="edit"
                styleClass="edit_button"
              />
            )}
            {id === user.id && (
              <EditForm
                setTaskId={setTaskId}
                id={user.id}
                taskInputValue={user.task}
              />
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
