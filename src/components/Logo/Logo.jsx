import React from "react";
import Tilt from "react-tilt";
import logoImage from "./logo.png";

const Logo = () => {
  return (
    <div ref={React.createRef()}>
      <Tilt
        style={{
          display: "flex",
          justifyContent: "flex-start",
          height: 250,
          width: 250,
        }}
        className="Tilt"
        options={{ max: 25 }}
      >
        <div className="Tilt-inner">
          <img src={logoImage} alt="" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
