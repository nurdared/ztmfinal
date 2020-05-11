import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p
          className="f3 dim link black underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex" }}>
        <p
          className="f3 dim link black underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 dim link black underline pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
