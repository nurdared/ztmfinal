import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";

function ImageLinkForm({ onInputChange, onPictureSubmit }) {
  return (
    <div>
      <p className="f3">
        {"This App will detect faces in your pictures. Give it a try!"}
      </p>
      <OutlinedInput style={{ width: "450px" }} onChange={onInputChange} />
      <Button
        style={{ marginBottom: "3px" }}
        variant="contained"
        color="secondary"
        onClick={onPictureSubmit}
      >
        Detect
      </Button>
    </div>
  );
}

export default ImageLinkForm;
