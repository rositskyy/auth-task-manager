import React from "react";
import moment from "moment";

const Tasks = ({ onDelete, tasks, label }) => {
  return (
    <div className="col s6">
      <h5 style={{ textAlign: "center", color: "grey" }}>{label}</h5>
      <div className="collection">
        {tasks &&
          tasks.map(item => (
            <li className="collection-item" key={item.id}>
              {item.task}{" "}
              {item.author && (
                <>
                  <br />
                  <small>
                    from{" "}
                    <span style={{ color: "lightcoral" }}>{item.author}</span>
                  </small>
                </>
              )}
              <br />
              <small>{moment(item.date).fromNow()}</small>
              <i
                onClick={() => onDelete(item.id)}
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

export default Tasks;
