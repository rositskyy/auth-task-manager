import React from "react";

const RegistrationForm = ({ onSubmitRegister, onChange }) => {
  return (
    <form onSubmit={onSubmitRegister} className="col s12">
      <div className="input-field col s12">
        <input required type="text" name="user" onChange={onChange} />
        <label htmlFor="password">Username</label>
      </div>
      <div className="input-field col s12">
        <input required type="password" name="password" onChange={onChange} />
        <label htmlFor="password">Password</label>
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
