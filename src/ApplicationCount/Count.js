import "../App.css";
import React, { useState } from "react";
import "./Count.css";
import { Checkbox } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Count({ checked, setChecked }) {
  const handleCheckBox = (index) => (e) => {
    const updated = [...checked];
    updated[index] = e.target.checked;
    setChecked(updated);
  };

  function appCountSaveButton () {
    
  }
  return (
    <React.Fragment>
      <div className="applicationCount" Style="margin-top:30px;">
        Apply Count {checked.filter(Boolean).length}
      </div>
      <div
        Style="margin-top:-10px"
        id="checkBox-container"
        className="float-container"
      >
        <div className="float-child">
          <div Style="margin-top:10px; margin-right:4px">1. </div>
        </div>
        <div className="checkBoxContainer">
          <div class="float-child">
            <div>
              {checked.map((item, index) => (
                <Checkbox
                  key={index}
                  checked={item}
                  onChange={handleCheckBox(index)}
                  {...label}
                />
              ))}
            </div>
          </div>
          <Stack className="seeNoteButton" spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => appCountSaveButton()}
              Style="margin-top: 10px"
            >
              See Note
            </Button>
          </Stack>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Count;
