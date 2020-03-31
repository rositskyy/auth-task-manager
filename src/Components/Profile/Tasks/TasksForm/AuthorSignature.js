import React from "react";

const AuthorSignature = ({author}) => {
  return (
    <>
      <br />
      <small>
        from <span style={{ color: "lightcoral" }}>{author}</span>
      </small>
    </>
  );
};

export default AuthorSignature;
