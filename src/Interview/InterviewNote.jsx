import "./InterviewNote.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

const InterviewNote = () => {
  const [companyName, setCompanyName] = useState([]);
  const [showInterviewNote, setShowIntervienNote] = useState(false);
  const [duringInterviewCompanyName, setDuringInterviewCompanyName] =
    useState("");
  const [duringInterviewNote, setDuringInterviewNote] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5065/api/duringInterviewNote")
      .then((response) => {
        setCompanyName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const interviewNoteButton = async (selectedId) => {
    const response = await axios.get(
      `http://localhost:5065/api/duringInterviewNote/${selectedId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    setShowIntervienNote(true);
    setDuringInterviewCompanyName(response.data.CompanyName);
    setDuringInterviewNote(response.data.InterviewNote);
  };

  return (
    <React.Fragment>
      <div className="interviewNoteAllPage">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <div className="companyNameAndList">
            <div className="CompanyNoteAndName">
            <div> Company Name </div>
            <button className="newNote">New Note</button>
            </div>
            {companyName.map((value, index) => (
              <ListItem
                key={index}
                disableGutters
                secondaryAction={
                  <IconButton edge="end" aria-label="comment"></IconButton>
                }
              >
                <ListItemText primary={`${value.CompanyName}`} />
                <div className="interviewNoteButton">
                  <button onClick={() => interviewNoteButton(value.Id)}>
                    See Note
                  </button>
                </div>
              </ListItem>
            ))}
          </div>
          
        </List>
        {showInterviewNote && (
          <div>
            <div className="interviewNote">
              <div className="noteTitle">{duringInterviewCompanyName}</div>
              <div className="companyName">{duringInterviewNote}</div>

              <textarea
                className="noteInput"
                placeholder="Write a note"
              ></textarea>
            </div>
          </div>
        )}

        
      </div>
    </React.Fragment>
  );
};

export default InterviewNote;
