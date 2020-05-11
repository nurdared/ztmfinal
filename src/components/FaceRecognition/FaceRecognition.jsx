import React, { Fragment } from "react";
import "./FaceRecognition.css";

function FaceRecognition({ imageUrl, boxes }) {
  return (
    <div className="center ma">
      <div className="absolute mt3">
        <img
          id="detectImage"
          src={imageUrl}
          className="br3"
          width="400px"
          alt=""
        />
        {boxes.map((box) => {
          const name =
            box.person.value > 0.5
              ? box.person.name
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                  .join(" ")
              : "No Name Guy";
          return (
            <Fragment key={box.person.id}>
              <div
                className="name"
                style={{
                  top: box.topRow - 30,
                  left: box.leftCol,
                }}
              >
                {name}
              </div>
              <div
                className="bounding-box"
                style={{
                  top: box.topRow,
                  left: box.leftCol,
                  bottom: box.bottomRow,
                  right: box.rightCol,
                }}
              ></div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default FaceRecognition;
