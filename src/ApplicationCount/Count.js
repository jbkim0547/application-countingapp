import "../App.css";
import React, { useState } from "react";
import "./Count.css";
import { Checkbox } from "@mui/material";
import { NavItem } from "react-bootstrap";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Count({ checked, setChecked }) {
  const handleCheckBox = (index) => (e) => {
    const updated = [...checked];
    updated[index] = e.target.checked;
    setChecked(updated);
  };
  return (
    <React.Fragment>
      <div Style="margin-top:30px;">Apply Count</div>
      <div
        Style="margin-top:-10px"
        id="checkBox-container"
        className="float-container"
      >
        <div className="float-child">
          <div Style="margin-top:10px; margin-right:4px">1. </div>
        </div>
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
      </div>
    </React.Fragment>
  );
}

export default Count;
