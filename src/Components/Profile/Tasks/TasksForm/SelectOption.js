import React from "react";
import { connect } from "react-redux";
import API from "../../../../API";

const SelectOption = ({ currentUser, setReceiver, receiver }) => {
  const users = API.getAllAccounts();
  const userNames =
    users &&
    users
      .filter(item => item.id !== currentUser.id)
      .map(item => <option key={item.id}>{item.login}</option>);
  return (
    <div>
      <select
        className="browser-default input-field"
        onChange={e => {
          setReceiver(e.target.value);
        }}
        value={receiver}
      >
        <option disabled value="select">
          select user
        </option>
        {userNames}
      </select>
    </div>
  );
};
const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser
});

export default connect(mapStateToProps, null)(SelectOption);
