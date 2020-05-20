import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ onLoginChange, isSignedIn, user }) => {
  if (isSignedIn) {
    return (
      <nav>
        <ul style={{ display: "flex", listStyleType: "none" }}>
          <li>
            <Link className="f3 dim black underline pa3 pointer" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="f3 dim black underline pa3 pointer"
              to={`profile/${user.id}`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="f3 dim black underline pa3 pointer"
              to="/"
              onClick={onLoginChange}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul style={{ display: "flex", listStyleType: "none" }}>
          <li>
            <Link className="f3 dim black underline pa3 pointer" to="/">
              Sign In
            </Link>
          </li>
          <li>
            <Link className="f3 dim black underline pa3 pointer" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navigation;
