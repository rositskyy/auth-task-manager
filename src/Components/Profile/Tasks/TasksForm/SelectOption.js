import React from "react";

const SelectOption = ({ handleChange, selectValue }) => {
  const users = JSON.parse(localStorage.getItem("accounts"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userNames =
    users &&
    users
      .filter(item => item.id !== currentUser.id)
      .map(item => <option key={item.id}>{item.user}</option>);
  return (
    <div>
      <select
        className="browser-default"
        onChange={handleChange}
        value={selectValue}
      >
        <option disabled value="select">
          select user
        </option>
        {userNames}
      </select>
    </div>
  );
};
export default SelectOption;
