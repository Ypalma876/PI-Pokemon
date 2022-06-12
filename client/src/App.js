import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import LP from './components/LandingPg/LandingPg.jsx';
import Home from './components/Home.jsx';


function App() {
  return (
      <div>
        <Routes>
          <Route exact path="/" element={<LP />} />
        </Routes>
    </div>
  );
}

export default App;
