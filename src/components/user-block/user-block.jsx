import React from "react";
import {Link} from "react-router-dom";

const UserBlock = () => {
  return (
    <div className="user-block">
      {/* <div className="user-block__avatar">
        <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div> */}
      <Link to="/login" className="user-block__link">Sign in</Link>
    </div>
  );
};

export default UserBlock;