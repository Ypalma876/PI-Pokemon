import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import LP from './components/LandingPg/LandingPg.jsx';
import Nav from './components/Nav/Nav';


function App() {
  return (
      <div>
        <Routes>
          <Route exact path="/" element={<LP />} />
          <Route path='/pokemons' element={<Nav />} />
          
        </Routes>
    </div>
  );
}

export default App;
