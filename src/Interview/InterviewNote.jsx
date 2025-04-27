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
  const [isCreating, setIsCreating] = useState(false);
  const [newShowInterviewNote, setNewShowInterviewNote] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newInterviewNote, setNewInterviewNote] = useState("");

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

  const interviewNoteButton = async (selectedId, e) => {
    const response = await axios.get(
      `http://localhost:5065/api/duringInterviewNote/${selectedId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (e.target.className.includes("newNote")) {
    }
    console.log(response);
    setShowIntervienNote(true);
    setNewShowInterviewNote(false);
    setDuringInterviewCompanyName(response.data.CompanyName);
    setDuringInterviewNote(response.data.InterviewNote);
  };

  const newNoteButtonClick = () => {
    setShowIntervienNote(false);
    setNewShowInterviewNote(true);
    setIsCreating(true);
    setDuringInterviewCompanyName("Company Name");
    setDuringInterviewNote("");
  };

  const newInterviewNoteButtonClick = async (e) => {
    const newInterview = {
      CompanyName: newCompanyName,
      InterviewNote: newInterviewNote,
    };
    console.log(newInterview);

    const response = await axios.post(
      "http://localhost:5065/api/duringInterviewNote",
      newInterview,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response)=>{
      console.log(response.data);
      setNewCompanyName("");
      setNewInterviewNote("");
      setNewShowInterviewNote(false);

      setCompanyName((prev) => [...prev, response.data]);

    });
  };

  const deleteNoteButtonClick = async (selectedId) =>{
    const response = await axios.delete(
      `http://localhost:5065/api/duringInterviewNote/${selectedId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    
    setCompanyName((prev) => prev.filter((item => item.Id !== selectedId)));


  }

  return (
    <React.Fragment>
      <div className="interviewNoteAllPage">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <div className="companyNameAndList">
            <div className="CompanyNoteAndName">
              
              <button className="newNote" onClick={newNoteButtonClick}>
                New Note
              </button>
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
                <div className="interviewNoteButton">-
                  <button
                    className="openInterviewNote"
                    onClick={(e) => interviewNoteButton(value.Id, e)}
                  >
                    See Note
                  </button>

                  <button onClick={(e)=>deleteNoteButtonClick(value.Id, e)} className="deleteNoteButton">Delete Note</button>
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
            </div>
          </div>
        )}

        {newShowInterviewNote && (
          <div>
            <div className="newInterviewNote">
              <input
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="interviewNoteCompanyName"
                placeholder="Company name"
              ></input>

              <textarea
                value={newInterviewNote}
                onChange={(e) => setNewInterviewNote(e.target.value)}
                className="newNoteInput"
                placeholder="Write a note"
              ></textarea>

              <button
                className="newInterviewNoteSaveButton"
                onClick={newInterviewNoteButtonClick}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default InterviewNote;
