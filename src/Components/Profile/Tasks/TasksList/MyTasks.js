import React from "react";

const MyTasks = ({ onDeleteMyTask, currentUser }) => {
  return (
    <div className="col s6">
      <h5 style={{ textAlign: "center", color: "grey" }}>My tasks</h5>
        <div className="collection">
          {currentUser.tasks && currentUser.tasks.map(item => (
            <li className="collection-item" key={item.id}>
              {item.name}
              <i
                onClick={() => onDeleteMyTask(item.id)}
                className="material-icons trashcan"
              >
                delete_forever
              </i>
            </li>
          ))}
        </div>
    </div>
  );
};

export default MyTasks;
