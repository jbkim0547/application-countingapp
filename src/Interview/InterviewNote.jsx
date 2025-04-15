import "./InterviewNote.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";

const InterviewNote = () => {
  const [companyName, setCompanyName] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5065/api/duringInterviewNote")
      .then((response) => {
        setCompanyName(response.data);
        companyName(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <React.Fragment>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {companyName.map((value, index) => (
          <ListItem
            key={index}
            disableGutters
            secondaryAction={
              <IconButton edge="end" aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`Line item ${value.name}`} />
          </ListItem>
        ))}
      </List>
      <div>
        <div className="interviewNote">
          <div className="noteTitle">Interview Note</div>
          <div className="companyName">Company Name</div>

          <textarea className="noteInput" placeholder="Write a note"></textarea>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InterviewNote;
