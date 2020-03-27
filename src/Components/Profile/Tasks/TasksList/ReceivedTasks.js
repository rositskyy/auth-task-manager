import React from "react";

const ReceivedTasks = ({ onDeleteReceivedTask, currentUser }) => {
  return (
    <div className="col s6">
      <h5 style={{ textAlign: "center", color: "grey" }}>Received Tasks</h5>
      <div className="collection">
        {currentUser.receivedTasks &&
          currentUser.receivedTasks.map(item => (
            <li className="collection-item" key={item.id}>
              {item.task}
              <i
                onClick={() => onDeleteReceivedTask(item.id)}
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

export default ReceivedTasks;
