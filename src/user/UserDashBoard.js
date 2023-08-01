import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const UserDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <Base title="Profile" className="userD">
      <div className="card col-9 mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="mr-2 text-success badge">Name :</span> {name}
          </li>
          <li className="list-group-item">
            <span className="mr-2 text-success badge">Email :</span> {email}
          </li>
        </ul>
      </div>
    </Base>
  );
};

export default UserDashBoard;
