import React from "react";

const Tasks = ({ onDelete, tasks, label }) => {
  return (
    <div className="col s6">
      <h5 style={{ textAlign: "center", color: "grey" }}>{label}</h5>
      <div className="collection">
        {tasks &&
          tasks.map(item => (
            <li className="collection-item" key={item.id}>
              {item.task}
              <i
                onClick={() => onDelete(item.id)}
                className="material-icons trashcan"
              >
                delete_forever
              </i>
            </li>
          ))}
      </div>
      {console.log(tasks)}
    </div>
  );
};

export default Tasks;
