import "../App.css";
import React, { useState } from "react";
import "./Count.css";
import { Checkbox } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Count({ checked, setChecked }) {
  const handleCheckBox = (index) => (e) => {
    const updated = [...checked];
    updated[index] = e.target.checked;
    setChecked(updated);
  };

  const appCountSaveButton = async () => {
    const count = {
      Count: checked.filter(Boolean).length,
      Date: new Date()
    };
    const response = await axios.post(
      "http://localhost:5065/api/applicationCount",
      count,
      { headers: { "Content-Type": "application/json"} }
    ).then(
      console.log(checked.filter(Boolean).length + " " + "Application count saved"),
      setChecked(new Array(checked.length).fill(false))
      
    );
  };
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
              Save
            </Button>
          </Stack>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Count;
