import './App.css';
import * as React from 'react'
import Count from './ApplicationCount/Count';
import NavBar from './Navbars/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/count" element={<Count />} />
        </Routes>
      </Router>
    </React.Fragment>

  );
}

export default App;
