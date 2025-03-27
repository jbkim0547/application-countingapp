import "./App.css";
import React, {useState} from "react";
import Count from "./ApplicationCount/Count";
import NavBar from "./Navbars/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import Calendar from "./Calendar/Calendar";
import "./Calendar/Calendar.css";
import JobScript from "./JobScript/JobScript";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function App() {

  const [checked, setChecked] = useState(Array(10).fill(false));
  React.useEffect(() => {
    document.title = "Job Helper";
  });

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/count" element={<Count checked={checked} setChecked={setChecked}/>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/jobScript" element={<JobScript />} />
          </Routes>
        <div>
          <br></br>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
