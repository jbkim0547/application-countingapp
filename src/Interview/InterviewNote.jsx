import "./InterviewNote.css"

const InterviewNote = () => {
  return (
    <div>
      <div className="interviewNote">
        <div className="noteTitle" >Interview Note</div>
        <div className="companyName">Company Name</div>
        
        <textarea className="noteInput" placeholder="Write a note"></textarea>
      </div>
    </div>
  );
};

export default InterviewNote;
