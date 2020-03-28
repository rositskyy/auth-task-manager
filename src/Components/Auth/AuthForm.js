import React, { useState } from "react";

const AuthForm = ({ onSubmit }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ login, password });
      }}
      className="col s12"
    >
      <div className="input-field col s12">
        <input
          required
          type="text"
          name="user"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <label htmlFor="password">Login</label>
      </div>
      <div className="input-field col s12">
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
