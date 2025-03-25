import './App.css';
import * as React from 'react'
import Count from './ApplicationCount/Count';
import NavBar from './Navbars/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from './Calendar/Calendar';
import './Calendar/Calendar.css'
import JobScript from './JobScript/JobScript';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function App() {
  React.useEffect(() => {
    document.title= "Job Helper";
  })

  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/count" element={<Count />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/jobScript" element={<JobScript />} />
        </Routes>
      </Router>
    <div>
    <br></br>
    </div>
    </React.Fragment>



  );
}

export default App;
